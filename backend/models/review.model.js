import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    rating: {
      type: Number,
      required: true,
    },
    content: {
      type: String,
      required: true,
      trim: true,
    },
    likes: {
      type: Number,
      default: 0,
    },
    dislikes: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

reviewSchema.post("save", async function () {
  const Review = mongoose.model("Review");
  const Product = mongoose.model("Product");

  try {
    const reviews = await Review.find({ productId: this.productId });

    const count = reviews.length;

    const averageRating =
      reviews.reduce((sum, review) => sum + review.rating, 0) / count;

    await Product.findByIdAndUpdate(
      this.productId,
      {
        $set: {
          "rating.avgRating": averageRating,
          "rating.count": count,
        },
      },
      { new: true }
    );
  } catch (error) {
    console.error("Error updating product rating:", error);
  }
});

const Review = mongoose.model("Review", reviewSchema);
export default Review;
