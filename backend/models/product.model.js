const mongoose = require("mongoose");

const variationSchema = mongoose.Schema({
  metal: {
    type: String,
    enum: [
      "Gold",
      "Gold Vermeil",
      "Mixed Metal",
      "Rose Gold",
      "Silver",
      "Sterling Silver",
    ],
    required: true,
  },
  size: {
    type: String,
    required: function () {
      return this.category === "Rings";
    },
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
    variations: [variationSchema],
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

module.exports = mongoose.model("Product", productSchema);
