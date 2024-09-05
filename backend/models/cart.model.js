import mongoose from "mongoose";

const cartItemSchema = new mongoose.Schema(
  {
    product: {
      id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true,
      },
      name: {
        type: String,
        required: true,
      },
      category: {
        type: String,
        required: true,
      },
      price: {
        type: Number,
        required: true,
      },
      // ...
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
      enum: [
        "Gold",
        "Gold Vermeil",
        "Mixed Metal",
        "Rose Gold",
        "Silver",
        "Sterling Silver",
      ],
    },
  },
  { timestamps: true }
);

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

cartSchema.pre("save", function (next) {
  const cart = this;
  let total = 0;

  for (const item of cart.items) {
    total += item.product.price * item.quantity;
  }

  cart.totalPrice = total;
  next();
});

const Cart = mongoose.model("Cart", cartSchema);
export default Cart;
