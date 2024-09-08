import express from "express";
import { placeOrder } from "../controllers/order.controller.js";
import { verifyUser } from "../middlewares/auth.js";

const router = express.Router();

router.post("/", verifyUser, placeOrder);

export default router;
