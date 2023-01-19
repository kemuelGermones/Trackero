import { Router } from "express";
import { createIssue, editIssue, deleteIssue } from "../controllers/issue";
import { validateIssue } from "../middleware";
import wrapAsync from "../utils/wrapAsync";
import passport from "passport";

const router = Router({ mergeParams: true });

// Create issue

router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  validateIssue,
  wrapAsync(createIssue)
);

// Edit issue

router.put(
  "/:issueId",
  passport.authenticate("jwt", { session: false }),
  validateIssue,
  wrapAsync(editIssue)
);

// Delete issue

router.delete(
  "/:issueId",
  passport.authenticate("jwt", { session: false }),
  wrapAsync(deleteIssue)
);

export default router;
