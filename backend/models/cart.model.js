import mongoose from "mongoose";
import Product from "./product.model.js";

const cartItemSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    min: 1,
    default: 1,
  },
  metalVariantId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  priceAtPurchase: {
    type: Number,
    required: true,
  },
  salePriceAtPurchase: {
    type: Number,
    default: null,
  },
});

const cartSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    unique: true,
  },
  items: [cartItemSchema],
  totalPrice: {
    type: Number,
    required: true,
    default: 0,
  },
});

cartSchema.pre("save", async function (next) {
  const cart = this;
  let total = 0;

  for (const item of cart.items) {
    const product = await Product.findById(item.productId);

    if (!product) {
      throw new Error(`Product with ID ${item.productId} not found.`);
    }

    const metalVariant = product.metalVariants.id(item.metalVariantId);

    if (!metalVariant || metalVariant.quantity < item.quantity) {
      throw new Error(
        `Insufficient stock for ${product.name} in the selected metal variant.`
      );
    }

    total += (item.salePriceAtPurchase || item.priceAtPurchase) * item.quantity;
  }

  cart.totalPrice = total;
  next();
});

const Cart = mongoose.model("Cart", cartSchema);
export default Cart;
