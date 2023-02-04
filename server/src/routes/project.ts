import { Router } from "express";
import passport from "passport";
import wrapAsync from "../utils/wrapAsync";
import {
  validateProject,
  validateComment,
  validateIssue,
  isValidUsers,
  isValidStatus,
  isAdmin,
  isAdminOrCommentAuthor,
  isAdminOrIssueAuthor,
  isAdminOrIssueAuthorOrAssignedUser
} from "../middleware";
import {
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

const router = Router({ mergeParams: true });

// Create Project

router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  isAdmin,
  validateProject,
  wrapAsync(createProject)
);

// Edit Project

router.put(
  "/:projectId",
  passport.authenticate("jwt", { session: false }),
  isAdmin,
  validateProject,
  wrapAsync(editProject)
);

// Delete Project

router.delete(
  "/:projectId",
  passport.authenticate("jwt", { session: false }),
  isAdmin,
  wrapAsync(deleteProject)
);

// Create Project Comment

router.post(
  "/:projectId/comments",
  passport.authenticate("jwt", { session: false }),
  validateComment,
  wrapAsync(createComment)
);

// Delete Project Comment

router.delete(
  "/:projectId/comments/:commentId",
  passport.authenticate("jwt", { session: false }),
  isAdminOrCommentAuthor,
  wrapAsync(deleteComment)
);

// Create Project Issue

router.post(
  "/:projectId/issues",
  passport.authenticate("jwt", { session: false }),
  validateIssue,
  wrapAsync(createIssue)
);

// Edit Project Issue

router.put(
  "/:projectId/issues/:issueId",
  passport.authenticate("jwt", { session: false }),
  isAdminOrIssueAuthor,
  validateIssue,
  wrapAsync(editIssue)
);

// Delete Project Issue

router.delete(
  "/:projectId/issues/:issueId",
  passport.authenticate("jwt", { session: false }),
  isAdminOrIssueAuthor,
  wrapAsync(deleteIssue)
);

// Update Project Issue Status

router.patch(
  "/:projectId/issues/:issueId/status",
  passport.authenticate("jwt", { session: false }),
  isAdminOrIssueAuthorOrAssignedUser,
  isValidStatus,
  wrapAsync(updateIssueStatus)
);

// Update Project Issue Assigned To

router.patch(
  "/:projectId/issues/:issueId/assignedTo",
  passport.authenticate("jwt", { session: false }),
  isAdminOrIssueAuthor,
  isValidUsers,
  wrapAsync(updateIssueAssignedTo)
);

export default router;
