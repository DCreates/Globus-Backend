import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    img: String,
    ownerImg: String,
    title: {
      type: String,
      required: true,
    },
    benefits: [String],
    price: {
      type: Number,
      required: true,
    },
    featured: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Product", productSchema);