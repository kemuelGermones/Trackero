import { Router } from "express";
import wrapAsync from "../utils/wrapAsync";
import { createComment, deleteComment } from "../controllers/projectComment";
import { validateComment } from "../middleware";
import passport from "passport";

const router = Router({ mergeParams: true });

router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  validateComment,
  wrapAsync(createComment)
);

router.delete(
  "/:commentId",
  passport.authenticate("jwt", { session: false }),
  wrapAsync(deleteComment)
);

export default router;
