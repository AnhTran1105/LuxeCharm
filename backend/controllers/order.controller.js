import Stripe from "stripe";
import Cart from "../models/cart.model.js";
import Order from "../models/order.model.js";
import Product from "../models/product.model.js";
import dotenv from "dotenv";

dotenv.config();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const placeOrder = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { address, phoneNumber, notes, firstName, lastName } = req.body;

    const cart = await Cart.findOne({ userId });

    if (!cart) {
      return res.status(404).json({ error: "Cart not found" });
    }

    const order = new Order({
      userId,
      address,
      phoneNumber,
      firstName,
      lastName,
      notes,
      total: cart.totalPrice,
      cartItems: cart.items,
    });

    await order.save();

    const lineItems = cart.items.map((item) => ({
      price_data: {
        currency: "usd",
        product_data: {
          name: item.name,
          images: [item.imageUrl],
          description: item.metal,
        },
        unit_amount: (item.salePrice || item.price) * 100,
      },
      quantity: item.quantity,
    }));

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      success_url: `${process.env.CLIENT_URL}/checkout/verify?success=true&orderId=${order._id}`,
      cancel_url: `${process.env.CLIENT_URL}/checkout/verify?success=false&orderId=${order._id}`,
      shipping_options: [{ shipping_rate: "shr_1Px3sN05rrXwoRm1sw910yXz" }],
    });

    res.json(session);
  } catch (error) {
    next(error);
  }
};

export const getOrderById = async (req, res, next) => {
  try {
    const orderId = req.params.orderId;

    const order = await Order.findById(orderId);

    if (!order) {
      res.status(404).json({ message: "Order not found" });
    }

    res.json(order);
  } catch (error) {
    next(error);
  }
};

export const verifyOrder = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { orderId, success } = req.body;

    if (success) {
      const order = await Order.findOneAndUpdate(
        { userId, status: "Pending" },
        { status: "Paid" }
      );

      if (!order) {
        return res.status(404).json({
          success: false,
          message: "Order not found or already processed",
        });
      }

      for (let item of order.cartItems) {
        await Product.findOneAndUpdate(
          { _id: item.productId, "metals.metal": item.metal },
          { $inc: { "metals.$.quantity": -item.quantity } }
        );
      }

      const cart = await Cart.findOneAndUpdate(
        { userId },
        { $set: { items: [] } },
        { new: true }
      );

      if (cart) {
        cart.totalPrice = 0;
        await cart.save();
      }

      res.json({ success: true, message: "Paid" });
    } else {
      await Order.findByIdAndDelete(orderId);
      res.json({ success: false, message: "Not paid" });
    }
  } catch (error) {
    next(error);
  }
};

export const getOrdersByUserId = async (req, res, next) => {
  try {
    const userId = req.user.id;

    const orders = await Order.find({ userId });

    if (!orders) {
      res.status(404).json({ message: "Order not found" });
    }

    res.json(orders);
  } catch (error) {
    next(error);
  }
};
