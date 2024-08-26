import express from "express";
import { addToCart, syncCart } from "../controllers/cart.controller.js";

const router = express.Router();

router.post("/", addToCart);
router.post("/sync", syncCart);

export default router;
