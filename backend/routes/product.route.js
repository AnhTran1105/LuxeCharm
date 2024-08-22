import express from "express";
import {
  getAllProducts,
  createProduct,
  getProductById,
  deleteProducts,
  updateProduct,
} from "../controllers/product.controller.js";
import { param } from "express-validator";
import upload from "../middleware/multer.js";

const router = express.Router();

router.get(
  "/products/:id",
  [param("id").notEmpty().withMessage("Product ID is required")],
  getProductById
);
router.get("/products", getAllProducts);
router.post(
  "/products",
  upload.fields([
    { name: "backgroundImage", maxCount: 1 },
    { name: "hoverImage", maxCount: 1 },
    { name: "imageUrls", maxCount: 3 },
  ]),
  createProduct
);

router.delete("/products", deleteProducts);
router.put(
  "/products/:id",
  upload.fields([
    { name: "backgroundImage", maxCount: 1 },
    { name: "hoverImage", maxCount: 1 },
    { name: "imageUrls", maxCount: 3 },
  ]),
  updateProduct
);

export default router;
