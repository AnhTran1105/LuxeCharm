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
  type: {
    type: String,
    required: true,
    enum: ["gold", "goldVermeil", "silver", "sterlingSilver"],
  },
  quantity: {
    type: Number,
    required: true,
    default: 0,
  },
  status: {
    type: String,
    enum: ["inStock", "outOfStock", "lowStock"],
  },
  images: {
    primary: {
      type: String,
      required: true,
    },
    secondary: {
      type: String,
      required: true,
    },
    others: [
      {
        type: String,
        required: true,
      },
    ],
  },
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
      enum: ["bracelets", "charms", "earrings", "necklaces", "rings"],
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
    soldCount: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

productSchema.pre("save", function (next) {
  this.metals.forEach((metal) => {
    if (metal.quantity > 10) {
      metal.status = "inStock";
    } else if (metal.quantity > 0) {
      metal.status = "lowStock";
    } else {
      metal.status = "outOfStock";
    }
  });
  next();
});

productSchema.pre("findOneAndUpdate", function (next) {
  this.metals.forEach((metal) => {
    if (metal.quantity > 10) {
      metal.status = "inStock";
    } else if (metal.quantity > 0) {
      metal.status = "lowStock";
    } else {
      metal.status = "outOfStock";
    }
  });
  next();
});

productSchema.statics.findSimilarProducts = async function (
  productId,
  limit = 5
) {
  const product = await this.findById(productId);

  if (!product) {
    throw new Error("Product not found");
  }

  return this.find({
    _id: { $ne: product._id },
    category: product.category,
  })
    .limit(limit)
    .select("name category price images");
};

const Product = mongoose.model("Product", productSchema);

export default Product;
