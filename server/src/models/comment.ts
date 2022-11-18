import { Schema, model } from "mongoose";

const commentSchema = new Schema({
  comment: { type: String, required: true },
  comments: [{ type: Schema.Types.ObjectId, ref: "Comment" }],
});

const Comment = model("Comment", commentSchema);

export default Comment;
