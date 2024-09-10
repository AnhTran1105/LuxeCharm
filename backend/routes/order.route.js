import express from "express";
import {
  getOrderById,
  placeOrder,
  verifyOrder,
  getOrdersByUserId,
} from "../controllers/order.controller.js";
import { verifyUser } from "../middlewares/auth.js";

const router = express.Router();

router.post("/", verifyUser, placeOrder);
router.post("/verify-order", verifyUser, verifyOrder);
router.get("/:orderId", verifyUser, getOrderById);
router.get("/", verifyUser, getOrdersByUserId);

export default router;
