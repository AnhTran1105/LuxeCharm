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
  const { name, quantity, price, metal, inStock } = req.body;
  const newProduct = new Product({ name, quantity, price, metal, inStock });
  try {
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
