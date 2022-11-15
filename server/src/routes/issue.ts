import { Router } from "express";
import { createIssue, editIssue, deleteIssue } from "../controllers/issue";
import { validateIssue } from "../middleware";
import wrapAsync from "../utils/wrapAsync";

const router = Router({ mergeParams: true });

// Create issue

router.post("/", validateIssue, wrapAsync(createIssue));

// Edit issue

router.put("/:issueId", validateIssue, wrapAsync(editIssue));

// Delete issue

router.delete("/:issueId", wrapAsync(deleteIssue));

export default router;