import { Schema, model } from "mongoose";

const issueSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    importance: { type: String, required: true }
});

export default model("Issue", issueSchema);