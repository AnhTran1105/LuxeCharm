import express from "express";
import {
  getAllProducts,
  createProduct,
  getProductById,
  deleteProducts,
  updateProduct,
} from "../controllers/product.controller.js";
import { verifyAdmin } from "../middlewares/auth.js";
import { param } from "express-validator";
import upload from "../middlewares/multer.js";

const router = express.Router();

router.get(
  "/products/:id",
  [param("id").notEmpty().withMessage("Product ID is required")],
  getProductById
);
router.get("/products", getAllProducts);

router.post(
  "/products",
  verifyAdmin,
  upload.fields([{ name: "imageUrls", maxCount: 5 }]),
  createProduct
);

router.delete("/products", verifyAdmin, deleteProducts);
router.put(
  "/products/:id",
  verifyAdmin,
  upload.fields([{ name: "imageUrls", maxCount: 5 }]),
  updateProduct
);

export default router;
