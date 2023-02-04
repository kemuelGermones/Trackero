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
});

// Extends the findOneAndDelete method to
// also delete existing comment/s and issue in a project

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

// Extends the find method to auto populate certain fields

projectSchema.pre("find", function (next) {
  this.populate({
    path: "issues",
    populate: [
      {
        path: "comments",
        populate: { path: "author", select: "username _id role email" },
      },
      {
        path: "author",
        select: "username _id role email",
      },
      {
        path: "assignedTo",
        select: "username _id role email",
      },
    ],
  }).populate({
    path: "comments",
    populate: { path: "author", select: "username _id role email" },
  });
  next();
});

export default model("Project", projectSchema);
