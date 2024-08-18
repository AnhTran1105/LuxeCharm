import mongoose from "mongoose";

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
    metals: {
      type: [String],
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
    quantities: [
      {
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
      },
    ],
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
    backgroundImage: {
      type: String,
      required: true,
    },
    hoverImage: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);

export default Product;
