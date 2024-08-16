import { validationResult } from "express-validator";
import Product from "../models/product.model.js";

export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find().sort("-lastUpdated");
    res.json(products);
  } catch (error) {
    next(error);
  }
};

export const createProduct = async (req, res, next) => {
  try {
    const backgroundImage = await cloudinary.v2.uploader.upload(
      req.files.backgroundImage[0].path,
      {
        folder: "products/backgrounds",
      }
    );
    const hoverImage = await cloudinary.v2.uploader.upload(
      req.files.hoverImage[0].path,
      {
        folder: "products/hovers",
      }
    );
    const imageUrls = await Promise.all(
      req.files.images.map(async (file) => {
        const result = await cloudinary.v2.uploader.upload(file.path, {
          folder: "products/images",
        });
        return result.secure_url;
      })
    );

    const newProduct = new Product({
      name: req.body.name,
      quantity: req.body.quantity,
      price: req.body.price,
      metal: req.body.metal,
      inStock: req.body.inStock,
      backgroundImage: backgroundImage.secure_url,
      hoverImage: hoverImage.secure_url,
      imageUrls,
    });

    await newProduct.save();
    res.status(201).json("Product created successfully!");
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
