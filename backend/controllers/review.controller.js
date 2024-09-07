import { validationResult } from "express-validator";
import Review from "../models/review.model.js";

export const getReviewsByProductId = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const productId = req.params.productId;

  try {
    const reviews = await Review.findById(productId).sort("likes");
    res.json(reviews);
  } catch (error) {
    next(error);
  }
};

export const postReview = async (req, res, next) => {
  console.log(req.body);
  try {
    const { user, rating, content, title } = req.body;
    const { productId } = req.params;
    const newReview = new Review({
      user,
      rating,
      productId,
      content,
      title,
    });
    await newReview.save();
    res.status(200).json({ message: "Review posted successfully!" });
  } catch (error) {
    next(error);
  }
};

export const updateReview = async (req, res, next) => {
  try {
    const reviewId = req.params._id;
    const review = await Review.findById(reviewId);

    if (!review) {
      return res.status(404).json({ message: "Review not found" });
    }
  } catch (error) {
    next(error);
  }
};
