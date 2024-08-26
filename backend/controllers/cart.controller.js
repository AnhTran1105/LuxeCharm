import Product from "../models/product.model.js";
import Cart from "../models/cart.model.js";

export const addToCart = async (req, res, next) => {
  try {
    const { productId, quantity } = req.body;
    const userId = req.user.id;

    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ message: "Product not found!" });
    }

    let cart = await Cart.findOne({ user: userId });

    if (!cart) {
      cart = new Cart({
        user: userId,
        items: [],
        totalPrice: 0,
      });
    }

    const itemIndex = cart.items.findIndex(
      (item) => item.product.toString() === productId
    );

    if (itemIndex > -1) {
      cart.items[itemIndex].quantity += quantity;
    } else {
      cart.items.push({
        product: productId,
        quantity,
        price: product.price,
      });
    }

    cart.totalPrice += product.price * quantity;
    await cart.save();

    res.status(200).json({ message: "Product added to cart", cart });
  } catch (error) {
    next(error);
  }
};

export const syncCart = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const cartItems = req.body.cartItems;

    let cart = await Cart.findOne({ user: userId });

    if (!cart) {
      cart = new Cart({ user: userId, items: [] });
    }

    cartItems.forEach((item) => {
      const existingItem = cart.items.find(
        (cartItem) => cartItem.product.toString() === item.productId
      );

      if (existingItem) {
        existingItem.quantity += item.quantity;
      } else {
        cart.items.push({
          product: item.productId,
          quantity: item.quantity,
          price: item.price,
        });
      }
    });

    await cart.save();
    res.status(200).json({ message: "Cart synchronized successfully!" });
  } catch (error) {
    next(error);
  }
};
