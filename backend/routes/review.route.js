import express from "express";
import {
  getReviewsByProductId,
  postReview,
} from "../controllers/review.controller.js";

const router = express.Router();

router.get("/reviews/:productId", getReviewsByProductId);
router.post("/reviews/:productId", postReview);

export default router;
