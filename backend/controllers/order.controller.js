import Stripe from "stripe";
import Cart from "../models/cart.model.js";
import Order from "../models/order.model.js";
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
      cartItems: cart.items,
    });

    await order.save();

    const lineItems = cart.items.map((item) => ({
      price_data: {
        currency: "usd",
        product_data: {
          name: item.product.name,
          images: [item.product.imageUrl],
          description: item.metal,
        },
        unit_amount: item.product.price * 100,
      },
      quantity: item.quantity,
    }));

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      success_url: `${process.env.CLIENT_URL}/verify?success=true&orderId=${order._id}`,
      cancel_url: `${process.env.CLIENT_URL}/verify?success=false&orderId=${order._id}`,
      shipping_options: [{ shipping_rate: "shr_1Pwyhr05rrXwoRm13RgF8iqz" }],
    });

    res.json(session);
  } catch (error) {
    next(error);
  }
};

export const verifyOrder = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { orderId, success } = req.body;

    if (success) {
      await Order.findOneAndUpdate(
        { userId, status: "pending" },
        { status: "paid" }
      );
      await Cart.findOneAndUpdate({ userId }, { $set: { items: [] } });
      res.json({ success: false, message: "Paid" });
    } else {
      await Order.findByIdAndDelete(orderId);
      res.json({ success: false, message: "Not paid" });
    }
  } catch (error) {
    next(error);
  }
};
