import mongoose from "mongoose";

const serviceSchema = new mongoose.Schema({
  title: String,
  description: String,
  image: String,
  tag: String,
}, { timestamps: true });

export default mongoose.model("Service", serviceSchema);