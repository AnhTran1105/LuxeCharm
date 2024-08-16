import express from "express";
import {
  getAllProducts,
  createProduct,
  getProductById,
} from "../controllers/product.controller.js";
import { param } from "express-validator";

const router = express.Router();

router.get(
  "/products/:id",
  [param("id").notEmpty().withMessage("Product ID is required")],
  getProductById
);
router.get("/products", getAllProducts);
router.post("/products", createProduct);

export default router;
