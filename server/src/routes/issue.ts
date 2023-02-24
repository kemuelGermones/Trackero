import { Router } from "express";
import wrapAsync from "../utils/wrapAsync";
import { createIssueComment, deleteIssueComment } from "../controllers/issue";
import { validateComment } from "../middleware/validate";
import { isAdminOrCommentAuthor } from "../middleware/role";
import passport from "passport";

const router = Router({ mergeParams: true });

// Create Issue Comment

router.post(
  "/:issueId/comments",
  passport.authenticate("jwt", { session: false }),
  validateComment,
  wrapAsync(createIssueComment)
);

// Delete Issue Comment

router.delete(
  "/:issueId/comments/:commentId",
  passport.authenticate("jwt", { session: false }),
  wrapAsync(isAdminOrCommentAuthor),
  wrapAsync(deleteIssueComment)
);

export default router;
