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
  validatePassword,
  validateUsername,
  validateRole,
} from "../middleware/validate";
import {
  isAdmin,
  isAdminOrActualUser,
  isNotActualUser,
} from "../middleware/role";
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

router.post("/register", wrapAsync(registerUser));

// Login the User

router.post("/login", wrapAsync(loginUser));

// Update User's Username

router.patch(
  "/:userId/username",
  passport.authenticate("jwt", { session: false }),
  wrapAsync(isAdminOrActualUser),
  validateUsername,
  wrapAsync(updateUserUsername)
);

// Update User's Password

router.patch(
  "/:userId/password",
  passport.authenticate("jwt", { session: false }),
  wrapAsync(isAdminOrActualUser),
  validatePassword,
  wrapAsync(updateUserPassword)
);

// Update User's Role

router.patch(
  "/:userId/role",
  passport.authenticate("jwt", { session: false }),
  isAdmin,
  wrapAsync(isNotActualUser),
  validateRole,
  wrapAsync(updateUserRole)
);

export default router;
