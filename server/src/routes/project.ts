import { Router } from "express";
import passport from "passport";
import wrapAsync from "../utils/wrapAsync";
import {
  validateProject,
  validateComment,
  validateIssue,
  validateStatus,
  validateAssignees,
  validateProjectAssignee,
  validateAssigneesHasIssues,
} from "../middleware/validate";
import {
  isAdmin,
  isAdminOrCommentAuthor,
  isAdminOrIssueAuthor,
  isAdminOrIssueAuthorOrAssignedUser,
} from "../middleware/role";
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
} from "../controllers/project";

const router = Router({ mergeParams: true });

// Create Project

router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  isAdmin,
  validateProject,
  wrapAsync(validateAssignees),
  wrapAsync(createProject)
);

// Edit Project

router.put(
  "/:projectId",
  passport.authenticate("jwt", { session: false }),
  isAdmin,
  validateProject,
  wrapAsync(validateAssignees),
  wrapAsync(validateAssigneesHasIssues),
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
  wrapAsync(isAdminOrCommentAuthor),
  wrapAsync(deleteComment)
);

// Create Project Issue

router.post(
  "/:projectId/issues",
  passport.authenticate("jwt", { session: false }),
  validateIssue,
  wrapAsync(validateProjectAssignee),
  wrapAsync(createIssue)
);

// Edit Project Issue

router.put(
  "/:projectId/issues/:issueId",
  passport.authenticate("jwt", { session: false }),
  wrapAsync(isAdminOrIssueAuthor),
  validateIssue,
  wrapAsync(validateProjectAssignee),
  wrapAsync(editIssue)
);

// Delete Project Issue

router.delete(
  "/:projectId/issues/:issueId",
  passport.authenticate("jwt", { session: false }),
  wrapAsync(isAdminOrIssueAuthor),
  wrapAsync(deleteIssue)
);

// Update Project Issue Status

router.patch(
  "/:projectId/issues/:issueId/status",
  passport.authenticate("jwt", { session: false }),
  wrapAsync(isAdminOrIssueAuthorOrAssignedUser),
  validateStatus,
  wrapAsync(updateIssueStatus)
);

export default router;
