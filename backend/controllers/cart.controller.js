import Product from "../models/product.model.js";
import Cart from "../models/cart.model.js";

export const getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.user.id });

    if (!cart) return res.status(404).json({ message: "Cart not found" });

    cart.items = cart.items.sort((a, b) => {
      return new Date(b.createdAt) - new Date(a.createdAt);
    });

    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const addToCart = async (req, res, next) => {
  const { product, metal } = req.body;

  try {
    const userId = req.user.id;

    let cart = await Cart.findOne({ userId: userId });

    const itemIndex = cart.items.findIndex(
      (item) => item.product._id.toString() === product._id
    );

    if (itemIndex > -1) {
      cart.items[itemIndex].quantity += 1;
    } else {
      cart.items.push({
        product,
        quantity: 1,
        metal,
      });
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
      const deletedItem = cart.items.find((item) => item.id === id);

      const deletedProductId = deletedItem.product.toString();

      const deletedProduct = await Product.findOne({
        _id: deletedProductId,
      });

      cart.items = cart.items.filter((item) => item._id.toString() !== id);
      cart.totalPrice -= deletedProduct.price * deletedItem.quantity;

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

export const updateCartItemQuantity = async (req, res, next) => {
  const { productId, quantity, price } = req.body;

  try {
    const userId = req.user.id;

    let cart = await Cart.findOne({ userId: userId });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found!" });
    }

    const itemIndex = cart.items.findIndex(
      (item) => item.product.toString() === productId
    );

    if (itemIndex === -1) {
      return res.status(404).json({ message: "Product not found in cart!" });
    }

    cart.totalPrice += price * (quantity - cart.items[itemIndex].quantity);

    cart.items[itemIndex].quantity = quantity;

    await cart.save();

    res.status(200).json({ message: "Quantity updated", cart });
  } catch (error) {
    next(error);
  }
};
