import { Schema, model } from "mongoose";
import Issue from "./issue";

const projectSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  issues: [
    {
      type: Schema.Types.ObjectId,
      ref: "Issue",
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
  }
});

export default model("Project", projectSchema);
