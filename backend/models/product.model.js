import mongoose from "mongoose";

const productSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    quantity: {
      type: Number,
      required: true,
      default: 0,
    },
    price: {
      type: Number,
      required: true,
      default: 0,
    },
    metal: {
      type: String,
      required: true,
      enum: [
        "Gold",
        "GoldVermeil",
        "MixedMetal",
        "RoseGold",
        "Silver",
        "SterlingSilver",
      ],
      default: "Gold",
    },
    inStock: {
      type: Boolean,
      required: true,
      default: true,
    },
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);

export default Product;
