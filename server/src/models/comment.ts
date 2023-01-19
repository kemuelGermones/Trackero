import { Schema, model } from "mongoose";

const commentSchema = new Schema({
  comment: { type: String, required: true },
  author: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

const Comment = model("Comment", commentSchema);

export default Comment;
