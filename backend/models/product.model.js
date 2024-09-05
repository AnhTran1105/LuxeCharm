import mongoose from "mongoose";

const dimensionSchema = new mongoose.Schema({
  key: {
    type: String,
    required: true,
  },
  value: {
    type: String,
    required: true,
  },
});

const metalSchema = new mongoose.Schema({
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
  quantity: {
    type: Number,
    required: true,
    default: 0,
  },
});

const productSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    category: {
      type: String,
      required: true,
      enum: [
        "Anklets",
        "Body Chains",
        "Bracelets",
        "Charms",
        "Earrings",
        "Gift Bundles",
        "Mystery",
        "Necklaces",
        "Rings",
      ],
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
      default: 0,
    },
    metals: [metalSchema],
    materials: {
      type: String,
      required: true,
    },
    dimensions: [dimensionSchema],
    rating: {
      type: Number,
      min: 0,
      max: 5,
      default: 0,
    },
    imageUrls: [
      {
        type: String,
        required: true,
      },
    ],
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);

export default Product;
