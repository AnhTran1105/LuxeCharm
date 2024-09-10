import Product from "../models/product.model.js";
import Cart from "../models/cart.model.js";

export const getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.user.id });

    if (!cart) return res.status(404).json({ message: "Cart not found" });

    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const addToCart = async (req, res, next) => {
  const cartItem = req.body;

  try {
    const userId = req.user.id;

    let cart = await Cart.findOne({ userId: userId });

    const itemIndex = cart.items.findIndex(
      (item) =>
        item.productId.toString() === cartItem.productId &&
        item.metal === cartItem.metal
    );

    if (itemIndex > -1) {
      cart.items[itemIndex].quantity += cartItem.quantity;
    } else {
      cart.items.push(cartItem);
    }

    await cart.save();

    res.status(200).json({ message: "Product added to cart", cart });
  } catch (error) {
    next(error);
  }
};

export const removeFromCart = async (req, res, next) => {
  const { id } = req.params;

  try {
    const cart = await Cart.findOne({ userId: req.user.id });

    if (cart) {
      cart.items = cart.items.filter((item) => item._id.toString() !== id);
      await cart.save();
      res.status(200).json({ message: "Product removed from cart" });
    } else {
      res.status(404).json({ message: "Cart not found" });
    }
  } catch (error) {
    next(error);
  }
};

export const updateCartItemQuantity = async (req, res, next) => {
  const { cartItemId, quantity } = req.body;

  try {
    const userId = req.user.id;

    let cart = await Cart.findOne({ userId: userId });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found!" });
    }

    const itemIndex = cart.items.findIndex(
      (item) => item._id.toString() === cartItemId
    );

    if (itemIndex === -1) {
      return res.status(404).json({ message: "Product not found in cart!" });
    }

    cart.items[itemIndex].quantity = quantity;

    await cart.save();

    res.status(200).json({ message: "Quantity updated", cart });
  } catch (error) {
    next(error);
  }
};
