import { Router } from "express";
import wrapAsync from "../utils/wrapAsync";
import {
  registerUser,
  loginUser,
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

// Update User's Username

router.patch(
  "/:userId/username",
  passport.authenticate("jwt", { session: false }),
  isAdminOrActualUser,
  isValidUsername,
  wrapAsync(updateUserUsername)
);

// Update User's Password

router.patch(
  "/:userId/password",
  passport.authenticate("jwt", { session: false }),
  isAdminOrActualUser,
  isValidPassword,
  wrapAsync(updateUserPassword)
);

// Update User's Role

router.patch(
  "/:userId/role",
  passport.authenticate("jwt", { session: false }),
  isAdminAndNotActualUser,
  isValidRole,
  wrapAsync(updateUserRole)
);

export default router;
