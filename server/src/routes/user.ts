import { Router } from "express";
import wrapAsync from "../utils/wrapAsync";
import { registerUser, loginUser, showUsers } from "../controllers/user";
import passport from "passport";

const router = Router();

// Registers the user

router.post("/register", wrapAsync(registerUser));

// Login the user

router.post("/login", wrapAsync(loginUser));

// Show users

router.get(
  "/users",
  passport.authenticate("jwt", { session: false }),
  wrapAsync(showUsers)
);

export default router;
