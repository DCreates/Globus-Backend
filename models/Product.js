import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    img: String,
    ownerImg: String,
    title: {
      type: String,
      required: true,
    },
    benefits: {
      type: [String],
      default: [],
    },
    price: {
      type: Number,
      required: true,
    },
    featured: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform: (_, ret) => {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
      },
    },
  }
);

const Product = mongoose.model("Product", productSchema);

export default Product;