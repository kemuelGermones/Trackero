import { Schema, model } from "mongoose";
import Comment from "./comment";

const issueSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  importance: { type: String, required: true },
  comments: [
    {
      type: Schema.Types.ObjectId,
      ref: "Comment",
    },
  ],
});

issueSchema.post("findOneAndDelete", async function (doc) {
  if (doc) {
    await Comment.deleteMany({
      _id: {
        $in: doc.comments,
      },
    });
  }
});

export default model("Issue", issueSchema);
