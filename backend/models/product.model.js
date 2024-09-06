import mongoose from "mongoose";

const dimensionSchema = new mongoose.Schema({
  key: {
    type: String,
    required: true,
    trim: true,
  },
  value: {
    type: String,
    required: true,
    trim: true,
  },
});

const instructionSchema = new mongoose.Schema({
  key: {
    type: String,
    required: true,
    trim: true,
  },
  value: {
    type: String,
    required: true,
    trim: true,
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
    metals: {
      type: [metalSchema],
      validate: {
        validator: function (metals) {
          return metals.length > 0;
        },
        message: "At least one metal must be specified",
      },
    },
    materials: {
      type: Map,
      of: String,
      validate: {
        validator: function (materials) {
          return this.metals.length === materials.size;
        },
        message: "Number of materials must match number of metals",
      },
    },
    dimensions: [dimensionSchema],
    instructions: [instructionSchema],
    rating: {
      type: Number,
      min: 0,
      max: 5,
      default: 0,
    },
  },
  { timestamps: true }
);

productSchema.pre("save", function (next) {
  const metalTypes = this.metals.map((metal) => metal.metal);
  const materialKeys = Array.from(this.materials.keys());

  const missingMaterials = metalTypes.filter(
    (type) => !materialKeys.includes(type)
  );
  const extraMaterials = materialKeys.filter(
    (key) => !metalTypes.includes(key)
  );

  if (missingMaterials.length > 0 || extraMaterials.length > 0) {
    next(new Error("Materials must exactly match the metal types"));
  } else {
    next();
  }
});

const Product = mongoose.model("Product", productSchema);

export default Product;
