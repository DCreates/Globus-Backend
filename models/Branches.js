import mongoose from "mongoose";

const branchSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    subtitle: String,
    place: String,

    img: String,
    owner: String,
    ownerImg: String,

    description: String,

    whyChoose: [String],
    services: [String],
    highlights: [String],

    timing: {
      days: String,
      hours: String,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Branch", branchSchema);