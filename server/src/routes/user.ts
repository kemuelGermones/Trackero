import { Router } from "express";
import wrapAsync from "../utils/wrapAsync";
import { registerUser, loginUser } from "../controllers/user";
import { validateUser } from "../middleware";
// import passport from "passport";

const router = Router();

// Registers the user

router.post("/register", validateUser, wrapAsync(registerUser));

// Login the user

router.post("/login", wrapAsync(loginUser));

export default router;