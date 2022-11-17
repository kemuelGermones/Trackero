import { Router } from "express";
import wrapAsync from "../utils/wrapAsync";
import { createComment, deleteComment } from "../controllers/issueComment";
import { validateComment } from "../middleware";

const router = Router({ mergeParams: true });

router.post("/", validateComment, wrapAsync(createComment));

router.delete("/:commentId", wrapAsync(deleteComment));

export default router;