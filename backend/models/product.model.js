import mongoose from "mongoose";

const careInstructionSchema = new mongoose.Schema({
  type: {
    type: String,
    trim: true,
    required: true,
  },
  content: {
    type: String,
    trim: true,
    required: true,
  },
});

const dimensionSchema = new mongoose.Schema({
  key: {
    type: String,
    trim: true,
    required: true,
  },
  value: {
    type: String,
    trim: true,
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
  imageUrls: [
    {
      type: String,
      required: true,
    },
  ],
  material: {
    type: String,
    required: true,
    trim: true,
  },
});

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
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
      trim: true,
    },
    price: {
      type: Number,
      required: true,
      default: 0,
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
    metals: {
      type: [metalSchema],
      validate: {
        validator: function (metals) {
          return metals.length > 0;
        },
        message: "At least one metal must be specified",
      },
    },
    careInstructions: [careInstructionSchema],
    dimensions: [dimensionSchema],
    rating: {
      avgRating: {
        type: Number,
        min: 0,
        max: 5,
        default: 0,
      },
      count: {
        type: Number,
        default: 0,
      },
    },
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);

export default Product;
