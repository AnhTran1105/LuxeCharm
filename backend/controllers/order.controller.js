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
      success_url: `${process.env.CLIENT_URL}/checkout/success`,
      cancel_url: `${process.env.CLIENT_URL}/checkout`,
      shipping_options: [{ shipping_rate: "shr_1Pwyhr05rrXwoRm13RgF8iqz" }],
    });

    res.json(session);
  } catch (error) {
    next(error);
  }
};
