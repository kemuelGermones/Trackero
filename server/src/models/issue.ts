import { Schema, model } from "mongoose";
import Comment from "./comment";

const issueSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  importance: { type: String, required: true, enum: ["High", "Mid", "Low"] },
  status: { type: String, required: true, enum: ["Pending", "Done", "In Progress"] },
  dueDate: { type: Date, required: true },
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
