import express from "express";
import {
  addToCart,
  getCart,
  removeFromCart,
  updateCartItemQuantity,
} from "../controllers/cart.controller.js";
import { verifyUser } from "../middlewares/auth.js";

const router = express.Router();

router.get("/", verifyUser, getCart);
router.post("/", verifyUser, addToCart);
router.delete("/:metalVariantId", verifyUser, removeFromCart);
router.put("/quantity", verifyUser, updateCartItemQuantity);

export default router;
