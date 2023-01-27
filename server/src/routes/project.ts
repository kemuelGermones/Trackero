import { Router } from "express";
import {
  validateProject,
  validateComment,
  isCommentAuthor,
  validateIssue,
  isIssueAuthor,
  isValidUsers,
  isValidStatus,
} from "../middleware";
import wrapAsync from "../utils/wrapAsync";
import {
  showProjects,
  createProject,
  editProject,
  deleteProject,
  createComment,
  deleteComment,
  createIssue,
  editIssue,
  deleteIssue,
  updateIssueStatus,
  updateIssueAssignedTo,
} from "../controllers/project";
import passport from "passport";

const router = Router({ mergeParams: true });

// Show projects

router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  wrapAsync(showProjects)
);

// Create project

router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  validateProject,
  wrapAsync(createProject)
);

// Edit project

router.put(
  "/:projectId",
  passport.authenticate("jwt", { session: false }),
  validateProject,
  wrapAsync(editProject)
);

// Delete project

router.delete(
  "/:projectId",
  passport.authenticate("jwt", { session: false }),
  wrapAsync(deleteProject)
);

// Create project comment

router.post(
  "/:projectId/comments",
  passport.authenticate("jwt", { session: false }),
  validateComment,
  wrapAsync(createComment)
);

// Delete project comment

router.delete(
  "/:projectId/comments/:commentId",
  passport.authenticate("jwt", { session: false }),
  isCommentAuthor,
  wrapAsync(deleteComment)
);

// Create project issue

router.post(
  "/:projectId/issues",
  passport.authenticate("jwt", { session: false }),
  validateIssue,
  wrapAsync(createIssue)
);

// Edit project issue

router.put(
  "/:projectId/issues/:issueId",
  passport.authenticate("jwt", { session: false }),
  isIssueAuthor,
  validateIssue,
  wrapAsync(editIssue)
);

// Delete project issue

router.delete(
  "/:projectId/issues/:issueId",
  passport.authenticate("jwt", { session: false }),
  isIssueAuthor,
  wrapAsync(deleteIssue)
);

// Update project issue status

router.patch(
  "/:projectId/issues/:issueId/status",
  passport.authenticate("jwt", { session: false }),
  isIssueAuthor,
  isValidStatus,
  wrapAsync(updateIssueStatus)
);

// Update project issue assigned to

router.patch(
  "/:projectId/issues/:issueId/assignedTo",
  passport.authenticate("jwt", { session: false }),
  isValidUsers,
  wrapAsync(updateIssueAssignedTo)
);

export default router;
