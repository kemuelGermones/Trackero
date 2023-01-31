import { Router } from "express";
import wrapAsync from "../utils/wrapAsync";
import {
  registerUser,
  loginUser,
  showUsers,
  updateUserUsername,
  updateUserPassword,
  updateUserRole,
} from "../controllers/user";
import {
  isValidPassword,
  isValidUsername,
  isValidRole,
  isAdmin,
  isAdminAndActualUser,
} from "../middleware";
import passport from "passport";

const router = Router({ mergeParams: true });

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

// Update user username

router.patch(
  "/users/:userId/username",
  passport.authenticate("jwt", { session: false }),
  isAdminAndActualUser,
  isValidUsername,
  wrapAsync(updateUserUsername)
);

// Update user password

router.patch(
  "/users/:userId/password",
  passport.authenticate("jwt", { session: false }),
  isAdminAndActualUser,
  isValidPassword,
  wrapAsync(updateUserPassword)
);

// Update user role

router.patch(
  "/users/:userId/role",
  passport.authenticate("jwt", { session: false }),
  isAdmin,
  isValidRole,
  wrapAsync(updateUserRole)
);

export default router;
