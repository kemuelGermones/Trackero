import { Request, Response } from "express";
import User from "../models/user";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const secret: string = process.env.SECRET || "mySecret";

// Show all users

export const showUsers = async (req: Request, res: Response) => {
  const users = await User.find();
  res
    .status(200)
    .send({ status: 200, message: "Fetched users", payload: users });
};

// Registers the User

export const registerUser = async (req: Request, res: Response) => {
  const { email, username, password, role } = req.body;
  const foundUser = await User.findOne({ email });
  if (foundUser) {
    res.status(400).json({ status: 400, message: "User exists already" });
  } else {
    const newUser = new User({ email, username, role });
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    newUser.password = hash;
    await newUser.save();
    const payload = { id: newUser._id, username: newUser.username };
    jwt.sign(payload, secret, { expiresIn: 3600 }, (err, token) => {
      res.status(200).json({
        status: 200,
        message: "Successfully created an account",
        payload: {
          _id: newUser._id,
          email: newUser.email,
          username: newUser.username,
          role: newUser.role,
          expiresIn: 3600,
          token: "Bearer " + token,
        },
      });
    });
  }
};

// Login the User

export const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const foundUser = await User.findOne({ email });
  if (!foundUser) {
    res.status(400).json({ status: 400, message: "User doesn't exists" });
  } else {
    const result = await bcrypt.compare(password, foundUser.password);
    if (!result) {
      res.status(400).json({ status: 400, message: "Incorrect password" });
    } else {
      const payload = { id: foundUser._id, username: foundUser.username };
      jwt.sign(payload, secret, { expiresIn: 3600 }, (err, token) => {
        res.status(200).json({
          status: 200,
          message: "Welcome back",
          payload: {
            _id: foundUser._id,
            email: foundUser.email,
            username: foundUser.username,
            role: foundUser.role,
            expiresIn: 3600,
            token: "Bearer " + token,
          },
        });
      });
    }
  }
};

// Update User Username

export const updateUserUsername = async (req: Request, res: Response) => {
  const { userId } = req.params;
  await User.findByIdAndUpdate(userId, {
    $set: { username: req.body.username },
  });
  res.status(200).json({
    status: 200,
    message: "Updated user's username",
  });
};

// Update User Password

export const updateUserPassword = async (req: Request, res: Response) => {
  const { userId } = req.params;
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(req.body.password, salt);
  await User.findByIdAndUpdate(userId, { $set: { password: hash } });
  res.status(200).json({ status: 200, message: "Updated user's password" });
};

// Update User Role

export const updateUserRole = async (req: Request, res: Response) => {
  const { userId } = req.params;
  await User.findByIdAndUpdate(userId, { $set: { role: req.body.role } });
  res.status(200).json({ status: 200, message: "Updated user's role" });
};
