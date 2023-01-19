import { Router } from "express";
import wrapAsync from "../utils/wrapAsync";
import { updateMembers } from "../controllers/projectMember";
import { isValidMembers } from "../middleware";
import passport from "passport";

const router = Router({ mergeParams: true });

router.patch(
  "/",
  passport.authenticate("jwt", { session: false }),
  isValidMembers,
  wrapAsync(updateMembers)
);

export default router;
