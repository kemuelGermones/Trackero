import { Router } from "express";
import wrapAsync from "../utils/wrapAsync";
import { createComment, deleteComment } from "../controllers/projectComment";
import { validateComment, isCommentAuthor, isValidAuthor } from "../middleware";
import passport from "passport";

const router = Router({ mergeParams: true });

router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  isValidAuthor,
  validateComment,
  wrapAsync(createComment)
);

router.delete(
  "/:commentId/users/:userId",
  passport.authenticate("jwt", { session: false }),
  isCommentAuthor,
  wrapAsync(deleteComment)
);

export default router;
