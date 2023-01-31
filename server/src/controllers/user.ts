import { Request, Response } from "express";
import User from "../models/user";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const secret = "mySecret";

// Registers The User

export const registerUser = async (req: Request, res: Response) => {
  const { email, username, password, role } = req.body;
  const findUser = await User.findOne({ email });
  if (findUser) {
    res.status(400).json({ status: 400, message: "User exists already" });
  } else {
    const newUser = new User({ email, username, role });
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    newUser.password = hash;
    await newUser.save();

    const findUser = await User.findOne({ email });
    if (findUser) {
      const payload = { id: findUser._id, username: findUser.username };
      jwt.sign(payload, secret, { expiresIn: 3600 }, (err, token) => {
        res.status(200).json({
          id: findUser._id,
          role: findUser.role,
          expiresIn: 3600,
          token: "Bearer " + token,
        });
      });
    }
  }
};

// Login The User

export const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const findUser = await User.findOne({ email });
  if (!findUser) {
    res.status(400).json({ status: 400, message: "User doesn't exists" });
  } else {
    const result = await bcrypt.compare(password, findUser.password);
    if (!result) {
      res.status(400).json({ status: 400, message: "Incorrect password" });
    } else {
      const payload = { id: findUser._id, username: findUser.username };
      jwt.sign(payload, secret, { expiresIn: 3600 }, (err, token) => {
        res.status(200).json({
          id: findUser._id,
          role: findUser.role,
          expiresIn: 3600,
          token: "Bearer " + token,
        });
      });
    }
  }
};

// Show All Users

export const showUsers = async (req: Request, res: Response) => {
  const users = await User.find().select("_id username role email");
  res.status(200).send(users);
};

// Update User Username

export const updateUserUsername = async (req: Request, res: Response) => {
  const { userId } = req.params;
  const user = await User.findById(userId);
  user!.username = req.body.username;
  await user!.save();
  res
    .status(200)
    .json({ status: 200, message: "Successfully updated user's username" });
};

// Update User Password

export const updateUserPassword = async (req: Request, res: Response) => {
  const { userId } = req.params;
  const { password } = req.body;
  const user = await User.findById(userId);
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);
  user!.password = hash;
  await user!.save();
  res
    .status(200)
    .json({ status: 200, message: "Successfully updated user's password" });
};

// Update User Role

export const updateUserRole = async (req: Request, res: Response) => {
  const { userId } = req.params;
  const user = await User.findById(userId);
  user!.role = req.body.role;
  await user!.save();
  res
    .status(200)
    .json({ status: 200, message: "Successfully updated user's role" });
};
