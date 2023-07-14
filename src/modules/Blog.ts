import mongoose, { Schema, Types } from "mongoose";

const BlogSchema = new Schema(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    postedBy: { type: Types.ObjectId, required: false },
    createdAt: { type: Date, required: true },
  },
  {
    versionKey: false,
    autoIndex: true,
  }
);

export default mongoose.model("Blog", BlogSchema);
