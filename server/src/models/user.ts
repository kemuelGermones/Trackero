import { Schema, model } from "mongoose";

const userSchema = new Schema({
  email: { type: String, required: true },
  username: { type: String, required: true },
  password: { type: String, required: true },
  role: { type: String, required: true, enum: ["Administrator", "Developer"] },
});

// Extends the find method to auto select certain fields

userSchema.pre("find", function (next) {
  this.select("_id username role email");
  next();
});

export default model("User", userSchema);
