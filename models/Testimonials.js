import mongoose from "mongoose";

const testimonialSchema = new mongoose.Schema({
  name: String,
  role: String,
  company: String,
  image: String,
  quote: String,
  rating: Number,
}, { timestamps: true });

export default mongoose.model("Testimonial", testimonialSchema);