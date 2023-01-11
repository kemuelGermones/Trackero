import { Request, Response } from "express";
import User from "../models/user";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const secret = "mySecret";

// Registers the user

export const registerUser = async (req: Request, res: Response) => {
  const { email, username, password, role } = req.body;
  const findUser = await User.findOne({ email });
  if (findUser) {
    res.status(400).json({ status: "400", message: "User exists already" });
  } else {
    const newUser = new User({ email, username, role });
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    newUser.password = hash;
    await newUser.save();
    res
      .status(200)
      .json({ status: "200", message: "Successfully created an account" });
  }
};

// Login the user

export const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const findUser = await User.findOne({ email });
  if (!findUser) {
    res.status(400).json({ status: "400", message: "User doesn't exists" });
  } else {
    const result = await bcrypt.compare(password, findUser.password);
    if (!result) {
      res.status(400).json({ status: "400", message: "Incorrect password" });
    } else {
      const payload = { id: findUser._id, username: findUser.username };
      jwt.sign(payload, secret, { expiresIn: 3600 }, (err, token) => {
        res.json({
          success: true,
          expiresIn: 3600,
          token: "Bearer " + token,
        });
      });
    }
  }
};
