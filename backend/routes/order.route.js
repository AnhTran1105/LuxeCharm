import express from "express";
import {
  getOrderById,
  placeOrder,
  verifyOrder,
} from "../controllers/order.controller.js";
import { verifyUser } from "../middlewares/auth.js";

const router = express.Router();

router.post("/", verifyUser, placeOrder);
router.post("/verify-order", verifyUser, verifyOrder);
router.get("/:orderId", verifyUser, getOrderById);

export default router;
