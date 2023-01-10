import { Router } from "express";
import { createIssue, editIssue, deleteIssue } from "../controllers/issue";
import { validateNewIssue, validateEditIssue } from "../middleware";
import wrapAsync from "../utils/wrapAsync";

const router = Router({ mergeParams: true });

// Create issue

router.post("/", validateNewIssue, wrapAsync(createIssue));

// Edit issue

router.put("/:issueId", validateEditIssue, wrapAsync(editIssue));

// Delete issue

router.delete("/:issueId", wrapAsync(deleteIssue));

export default router;