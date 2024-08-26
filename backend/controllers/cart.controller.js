import Product from "../models/product.model.js";
import Cart from "../models/cart.model.js";

export const getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.user.id }).populate(
      "items.productId"
    );
    if (!cart) return res.status(404).json({ message: "Cart not found" });
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const addToCart = async (req, res, next) => {
  const { productId, quantity } = req.body;

  try {
    const userId = req.user.id;

    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ message: "Product not found!" });
    }

    let cart = await Cart.findOne({ userId: userId });

    if (!cart) {
      cart = new Cart({
        userId: userId,
        items: [
          {
            product: productId,
            quantity: quantity,
            price: product.price,
          },
        ],
        totalPrice: product.price * quantity,
      });
    } else {
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
    }

    await cart.save();

    res.status(200).json({ message: "Product added to cart", cart });
  } catch (error) {
    next(error);
  }
};

export const removeFromCart = async (req, res, next) => {
  const { productId } = req.params;
  try {
    const cart = await Cart.findOne({ userId: req.user.id });

    if (cart) {
      cart.items = cart.items.filter(
        (item) => item.productId.toString() !== productId
      );
      await cart.save();
      res.status(200).json({ message: "Product removed from cart" });
    } else {
      res.status(404).json({ message: "Cart not found" });
    }
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
