import mongoose from "mongoose";

const counterSchema = new mongoose.Schema({
  name: { type: String, required: true },
  seq: { type: Number, default: 0 },
});

const Counter = mongoose.model("Counter", counterSchema);

const cartItemSchema = new mongoose.Schema({
  product: {
    _id: {
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
    imageUrl: {
      type: String,
      required: true,
    },
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
});

const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    cartItems: [cartItemSchema],
    notes: {
      type: String,
      trim: true,
    },
    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, required: true, trim: true },
    address: { type: String, required: true, trim: true },
    phoneNumber: { type: String, required: true },
    status: { type: String, default: "pending" },
    orderNumber: { type: Number, unique: true },
  },
  {
    timestamps: true,
  }
);

orderSchema.pre("save", async function (next) {
  const order = this;

  if (order.orderNumber) {
    return next();
  }

  try {
    const counter = await Counter.findOneAndUpdate(
      { name: "order" },
      { $inc: { seq: 1 } },
      { new: true, upsert: true }
    );

    order.orderNumber = counter.seq;
    next();
  } catch (error) {
    next(error);
  }
});

const Order = mongoose.model("Order", orderSchema);

export default Order;
