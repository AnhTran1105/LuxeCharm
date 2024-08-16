import express from "express";
import {
  getAllProducts,
  createProduct,
} from "../controllers/product.controller.js";

const router = express.Router();

router.get("/products", getAllProducts);
router.post("/products", createProduct);

export default router;
