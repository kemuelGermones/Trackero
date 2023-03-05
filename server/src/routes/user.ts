import { Router } from "express";
import wrapAsync from "../utils/wrapAsync";
import {
  showUsers,
  registerUser,
  loginUser,
  updateUserUsername,
  updateUserPassword,
  updateUserRole,
} from "../controllers/user";
import {
  validateUserRegister,
  validateUserLogin,
  validateUserPassword,
  validateUserUsername,
  validateUserRole,
} from "../middleware/validation";
import {
  isAdmin,
  isAdminOrActualUser,
  isNotActualUser,
} from "../middleware/authorization";
import passport from "passport";

const router = Router({ mergeParams: true });

// Show Users

router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  isAdmin,
  wrapAsync(showUsers)
);

// Registers the User

router.post("/register", validateUserRegister, wrapAsync(registerUser));

// Login the User

router.post("/login", validateUserLogin, wrapAsync(loginUser));

// Update User's Username

router.patch(
  "/:userId/username",
  passport.authenticate("jwt", { session: false }),
  wrapAsync(isAdminOrActualUser),
  validateUserUsername,
  wrapAsync(updateUserUsername)
);

// Update User's Password

router.patch(
  "/:userId/password",
  passport.authenticate("jwt", { session: false }),
  wrapAsync(isAdminOrActualUser),
  validateUserPassword,
  wrapAsync(updateUserPassword)
);

// Update User's Role

router.patch(
  "/:userId/role",
  passport.authenticate("jwt", { session: false }),
  isAdmin,
  wrapAsync(isNotActualUser),
  validateUserRole,
  wrapAsync(updateUserRole)
);

export default router;
