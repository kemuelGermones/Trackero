import { Router } from "express";
import wrapAsync from "../utils/wrapAsync";
import { createComment, deleteComment, } from "../controllers/issue";
import { validateComment, isAdminOrCommentAuthor } from "../middleware";
import passport from "passport";

const router = Router({ mergeParams: true });

// Create Issue Comment

router.post(
  "/:issueId/comments",
  passport.authenticate("jwt", { session: false }),
  validateComment,
  wrapAsync(createComment)
);

// Delete Issue Comment

router.delete(
  "/:issueId/comments/:commentId",
  passport.authenticate("jwt", { session: false }),
  isAdminOrCommentAuthor,
  wrapAsync(deleteComment)
);

export default router;
