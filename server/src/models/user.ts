import { Schema, model } from "mongoose";

const userSchema = new Schema({
  email: { type: String, required: true },
  username: { type: String, required: true },
  password: { type: String, required: true },
  role: { type: String, required: true, enum: ["Administrator", "Developer"] },
});

export default model("User", userSchema);
