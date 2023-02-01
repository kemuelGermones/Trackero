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
  isAdminOrActualUser,
  isAdminAndNotActualUser
} from "../middleware";
import passport from "passport";

const router = Router({ mergeParams: true });

// Registers the User

router.post("/register", wrapAsync(registerUser));

// Login the User

router.post("/login", wrapAsync(loginUser));

// Show Users

router.get(
  "/users",
  passport.authenticate("jwt", { session: false }),
  wrapAsync(showUsers)
);

// Update User's Username

router.patch(
  "/users/:userId/username",
  passport.authenticate("jwt", { session: false }),
  isAdminOrActualUser,
  isValidUsername,
  wrapAsync(updateUserUsername)
);

// Update User's Password

router.patch(
  "/users/:userId/password",
  passport.authenticate("jwt", { session: false }),
  isAdminOrActualUser,
  isValidPassword,
  wrapAsync(updateUserPassword)
);

// Update User's Role

router.patch(
  "/users/:userId/role",
  passport.authenticate("jwt", { session: false }),
  isAdminAndNotActualUser,
  isValidRole,
  wrapAsync(updateUserRole)
);

export default router;
