import { Router } from "express";
import wrapAsync from "../utils/wrapAsync";
import { registerUser, loginUser, refreshUser } from "../controllers/user";
import { validateNewUser, validateOldUser } from "../middleware";
import passport from "passport";

const router = Router();

// Registers the user

router.post("/register", validateNewUser, wrapAsync(registerUser));

// Login the user

router.post("/login", validateOldUser, wrapAsync(loginUser));

// Refresh the user

router.post("/refresh", passport.authenticate("jwt", { session: false }), wrapAsync(refreshUser));

export default router;