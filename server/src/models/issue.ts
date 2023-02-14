import { Schema, model } from "mongoose";
import Comment from "./comment";

const issueSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  importance: { type: String, required: true, enum: ["High", "Mid", "Low"] },
  dueDate: { type: Date, required: true },
  assignedTo: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  status: {
    type: String,
    enum: ["Pending", "Done", "In Progress"],
    default: "Pending",
  },
  comments: [
    {
      type: Schema.Types.ObjectId,
      ref: "Comment",
    },
  ],
});

// Extends the findOneAndDelete method to
// also delete existing comment/s in a issue

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
