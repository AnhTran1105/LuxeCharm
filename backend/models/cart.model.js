import mongoose from "mongoose";

const cartItemSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  salePrice: {
    type: Number,
    default: null,
    validate: {
      validator: function (value) {
        return value == null || value < this.price;
      },
      message: "Sale price must be lower than the original price",
    },
  },
  imageUrl: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    min: 1,
    default: 1,
  },
  metal: {
    type: String,
    required: true,
    enum: ["gold", "goldVermeil", "silver", "sterlingSilver"],
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
    total += (item.salePrice || item.price) * item.quantity;
  }

  cart.totalPrice = total;
  next();
});

const Cart = mongoose.model("Cart", cartSchema);
export default Cart;
