import express from "express";
import {
  getReviewsByProductId,
  postReview,
} from "../controllers/review.controller.js";
import { verifyUser } from "../middlewares/auth.js";

const router = express.Router();

router.get("/reviews/:productId", getReviewsByProductId);
router.post("/reviews/:productId", verifyUser, postReview);

export default router;
