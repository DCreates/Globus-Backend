import mongoose from "mongoose";

const testimonialSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    role: String,
    company: String,
    image: String,
    quote: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      default: 5,
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

const Testimonial = mongoose.model("Testimonial", testimonialSchema);

export default Testimonial;