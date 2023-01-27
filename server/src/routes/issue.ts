import { Router } from "express";
import wrapAsync from "../utils/wrapAsync";
import { createComment, deleteComment, } from "../controllers/issue";
import { validateComment, isCommentAuthor } from "../middleware";
import passport from "passport";

const router = Router({ mergeParams: true });

// Create issue comment

router.post(
  "/:issueId/comments",
  passport.authenticate("jwt", { session: false }),
  validateComment,
  wrapAsync(createComment)
);

// Delete issue comment

router.delete(
  "/:issueId/comments/:commentId",
  passport.authenticate("jwt", { session: false }),
  isCommentAuthor,
  wrapAsync(deleteComment)
);

export default router;
