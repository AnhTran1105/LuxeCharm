import express from "express";
import {
  getAllProducts,
  createProduct,
  getProductById,
  deleteProducts,
  updateProduct,
  searchProducts,
  getFilteredProducts,
} from "../controllers/product.controller.js";
import { verifyAdmin } from "../middlewares/auth.js";
import { param } from "express-validator";
import upload from "../middlewares/multer.js";

const router = express.Router();

router.get("/products/search", searchProducts);

router.get("/products/filtered", getFilteredProducts);

router.get(
  "/products/:id",
  [param("id").notEmpty().withMessage("Product ID is required")],
  getProductById
);
router.get("/products", getAllProducts);

const metalFields = Array.from({ length: 10 }, (_, index) => [
  { name: `metalVariants.${index}.images.primary`, maxCount: 1 },
  { name: `metalVariants.${index}.images.secondary`, maxCount: 1 },
  { name: `metalVariants.${index}.images.others`, maxCount: 5 },
]).flat();

router.post(
  "/products",
  verifyAdmin,
  upload.fields(metalFields),
  createProduct
);

router.delete("/products", verifyAdmin, deleteProducts);
router.put(
  "/products/:id",
  verifyAdmin,
  upload.fields(metalFields),
  updateProduct
);

export default router;
