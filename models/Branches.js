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
    whyChoose: {
      type: [String],
      default: [],
    },
    services: {
      type: [String],
      default: [],
    },
    highlights: {
      type: [String],
      default: [],
    },
    timing: {
      days: { type: String, default: "" },
      hours: { type: String, default: "" },
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

const Branch = mongoose.model("Branch", branchSchema);

export default Branch;