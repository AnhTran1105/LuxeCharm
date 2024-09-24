import Stripe from "stripe";
import Cart from "../models/cart.model.js";
import Order from "../models/order.model.js";
import Product from "../models/product.model.js";
import dotenv from "dotenv";
import { metalTypes } from "../constants.js";

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

    const lineItems = await Promise.all(
      cart.items.map(async (item) => {
        const product = await Product.findOne({ _id: item.productId });

        const metalVariant = product.metalVariants.find(
          (variant) => variant._id.toString() === item.metalVariantId.toString()
        );

        return {
          price_data: {
            currency: "usd",
            product_data: {
              name: product.name,
              images: [metalVariant.images.primary],
              description: metalTypes[metalVariant.metalType],
            },
            unit_amount:
              (item.salePriceAtPurchase || item.priceAtPurchase) * 100,
          },
          quantity: item.quantity,
        };
      })
    );

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
        { status: "Paid" },
        { new: true }
      );

      if (!order) {
        return res.status(404).json({
          success: false,
          message: "Order not found or already processed!",
        });
      }

      for (let item of order.cartItems) {
        const updatedProduct = await Product.findOneAndUpdate(
          { _id: item.productId, "metalVariants._id": item.metalVariantId },
          {
            $inc: {
              "metalVariants.$.quantity": -item.quantity,
              "metalVariants.$.soldCount": item.quantity,
            },
          },
          { new: true }
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

    if (!orders || orders.length === 0) {
      return res.status(404).json({ message: "Orders not found" });
    }

    const ordersWithProductDetails = await Promise.all(
      orders.map(async (order) => {
        const detailedCartItems = await Promise.all(
          order.cartItems.map(async (item) => {
            const product = await Product.findById(item.productId);
            const metalVariant = product.metalVariants.find(
              (variant) =>
                variant._id.toString() === item.metalVariantId.toString()
            );

            return {
              productId: item.productId,
              name: product.name,
              metalType: metalVariant.metalType,
              imageUrl: metalVariant.images.primary,
              quantity: item.quantity,
              priceAtPurchase: item.priceAtPurchase,
              salePriceAtPurchase: item.salePriceAtPurchase,
            };
          })
        );

        return {
          ...order.toObject(),
          cartItems: detailedCartItems,
        };
      })
    );

    res.json(ordersWithProductDetails);
  } catch (error) {
    next(error);
  }
};
