import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, required: true, trim: true },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    phoneNumber: { type: String },
    address: { type: String, trim: true },
    cartId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Cart",
    },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  if (this.isNew) {
    const Cart = mongoose.model("Cart");
    const newCart = new Cart({ userId: this._id });
    await newCart.save();
    this.cartId = newCart._id;
  }
  next();
});

const User = mongoose.model("User", userSchema);

export default User;
