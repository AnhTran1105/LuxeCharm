import { validationResult } from "express-validator";
import Product from "../models/product.model.js";
import cloudinary from "cloudinary";

export const getAllProducts = async (req, res, next) => {
  try {
    const products = await Product.find().sort("-createdAt");
    res.json(products);
  } catch (error) {
    next(error);
  }
};

export const createProduct = async (req, res, next) => {
  try {
    const metals = [];

    for (const key in req.body) {
      const match = key.match(/metals\.(\d+)\.(\w+)/);
      if (match) {
        const index = match[1];
        const field = match[2];

        if (!metals[index]) {
          metals[index] = {
            metal: "",
            quantity: 0,
            material: "",
          };
        }

        metals[index][field] = req.body[key];
      }
    }

    const dimensions = JSON.parse(req.body.dimensions);
    const instructions = JSON.parse(req.body.instructions);

    for (let i = 0; i < metals.length; i++) {
      const metal = metals[i];
      if (req.files[`metals.${i}.images`]) {
        const imageUrls = await Promise.all(
          req.files[`metals.${i}.images`].map(async (file) => {
            const result = await cloudinary.v2.uploader.upload(file.path, {
              folder: "products/images",
            });
            return result.secure_url;
          })
        );
        metal.imageUrls = imageUrls;
      }
    }

    const newProduct = new Product({
      name: req.body.name,
      category: req.body.category,
      description: req.body.description,
      price: req.body.price,
      salePrice: req.body.salePrice,
      metals: metals,
      dimensions: dimensions,
      instructions: instructions,
    });

    await newProduct.save();
    res.status(201).json({ message: "Product created successfully!" });
  } catch (error) {
    next(error);
  }
};

export const getProductById = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const id = req.params.id.toString();
  try {
    const product = await Product.findById(id);
    res.json(product);
  } catch (error) {
    next(error);
  }
};

export const deleteProducts = async (req, res, next) => {
  const { productIds } = req.body;

  if (!Array.isArray(productIds) || productIds.length === 0) {
    return res.status(400).json({ message: "Invalid productIds array." });
  }

  try {
    const result = await Product.deleteMany({ _id: { $in: productIds } });

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: "No products found to delete." });
    }

    return res.status(200).json({
      message: `${result.deletedCount} product(s) successfully deleted.`,
    });
  } catch (error) {
    next(error);
  }
};

export const updateProduct = async (req, res, next) => {
  try {
    const productId = req.params.id;
    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    if (
      req.body.imagesToDelete &&
      Array.isArray(JSON.parse(req.body.imagesToDelete))
    ) {
      const imagesToDelete = JSON.parse(req.body.imagesToDelete);
      for (const imageUrl of imagesToDelete) {
        await cloudinary.v2.uploader.destroy(imageUrl);
        product.imageUrls = product.imageUrls.filter((url) => url !== imageUrl);
      }
    }

    if (req.files && req.files.imageUrls) {
      const newImageUrls = await Promise.all(
        req.files.imageUrls.map(async (file) => {
          const result = await cloudinary.v2.uploader.upload(file.path, {
            folder: "products/images",
          });
          return result.secure_url;
        })
      );
      product.imageUrls.push(...newImageUrls);
    }

    product.name = req.body.name || product.name;
    product.category = req.body.category || product.category;
    product.description = req.body.description || product.description;
    product.price = req.body.price || product.price;
    product.metals = JSON.parse(req.body.metals) || product.metals;
    product.dimensions = JSON.parse(req.body.dimensions) || product.dimensions;

    await product.save();
    res.status(200).json({ message: "Product updated successfully!" });
  } catch (error) {
    next(error);
  }
};
