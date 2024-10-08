import Cart from "../models/cart.model.js";

export const getCart = async (req, res, next) => {
  try {
    const cart = await Cart.findOne({ userId: req.user.id });

    if (!cart) return res.status(404).json({ message: "Cart not found!" });

    res.status(200).json(cart);
  } catch (error) {
    next(error);
  }
};

export const addToCart = async (req, res, next) => {
  const {
    productId,
    quantity,
    metalVariantId,
    priceAtPurchase,
    salePriceAtPurchase,
  } = req.body;

  try {
    const userId = req.user.id;

    let cart = await Cart.findOne({ userId: userId });

    const itemIndex = cart.items.findIndex(
      (item) =>
        item.productId.toString() === productId &&
        item.metalVariantId.toString() === metalVariantId
    );

    if (itemIndex > -1) {
      cart.items[itemIndex].quantity += quantity;
    } else {
      cart.items.push({
        productId,
        quantity,
        metalVariantId,
        priceAtPurchase,
        salePriceAtPurchase,
      });
    }

    await cart.save();

    res.status(200).json({ message: "Item added to cart!", cart });
  } catch (error) {
    next(error);
  }
};

export const removeFromCart = async (req, res, next) => {
  const { metalVariantId } = req.params;

  try {
    const cart = await Cart.findOne({ userId: req.user.id });

    if (cart) {
      cart.items = cart.items.filter(
        (item) => item.metalVariantId.toString() !== metalVariantId
      );
      await cart.save();
      res.status(200).json({ message: "Product removed from cart!" });
    } else {
      res.status(404).json({ message: "Cart not found!" });
    }
  } catch (error) {
    next(error);
  }
};

export const updateCartItemQuantity = async (req, res, next) => {
  const { metalVariantId, quantity } = req.body;

  try {
    const userId = req.user.id;

    let cart = await Cart.findOne({ userId: userId });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found!" });
    }

    const itemIndex = cart.items.findIndex(
      (item) => item.metalVariantId.toString() === metalVariantId
    );

    if (itemIndex === -1) {
      return res.status(404).json({ message: "Item not found in cart!" });
    }

    cart.items[itemIndex].quantity = quantity;

    await cart.save();

    res.status(200).json({ message: "Quantity updated!", cart });
  } catch (error) {
    next(error);
  }
};
