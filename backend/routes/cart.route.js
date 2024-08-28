import express from "express";
import {
  addToCart,
  getCart,
  removeFromCart,
  syncCart,
  updateCartItemQuantity,
} from "../controllers/cart.controller.js";
import { verifyUser } from "../middlewares/auth.js";

const router = express.Router();

router.get("/", verifyUser, getCart);
router.post("/", verifyUser, addToCart);
router.delete("/:productId", verifyUser, removeFromCart);
router.post("/sync", verifyUser, syncCart);
router.put("/quantity", verifyUser, updateCartItemQuantity);

export default router;
