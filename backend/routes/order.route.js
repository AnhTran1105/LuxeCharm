import express from "express";
import { placeOrder, verifyOrder } from "../controllers/order.controller.js";
import { verifyUser } from "../middlewares/auth.js";

const router = express.Router();

router.post("/", verifyUser, placeOrder);
router.post("/verify-order", verifyUser, verifyOrder);

export default router;
