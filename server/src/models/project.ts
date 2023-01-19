import { Schema, model } from "mongoose";
import Issue from "./issue";
import Comment from "./comment";

const projectSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  issues: [
    {
      type: Schema.Types.ObjectId,
      ref: "Issue",
    },
  ],
  comments: [
    {
      type: Schema.Types.ObjectId,
      ref: "Comment",
    },
  ],
  members: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  ],
});

projectSchema.post("findOneAndDelete", async function (doc) {
  if (doc) {
    await Issue.deleteMany({
      _id: {
        $in: doc.issues,
      },
    });
    await Comment.deleteMany({
      _id: {
        $in: doc.comments,
      },
    });
  }
});

export default model("Project", projectSchema);
