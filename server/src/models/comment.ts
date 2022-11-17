import { Schema, model } from "mongoose";

const commentSchema = new Schema({
  comment: { type: String, required: true },
});

export default model("Comment", commentSchema);
