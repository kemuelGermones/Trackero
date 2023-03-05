import { Router } from "express";
import passport from "passport";
import wrapAsync from "../utils/wrapAsync";
import {
  validateProject,
  validateComment,
  validateIssue,
  validateIssueStatus,
  validateProjectAssignees,
  validateIssueAssignedTo,
  validateAssigneesHasIssues,
} from "../middleware/validation";
import {
  isAdmin,
  isAdminOrCommentAuthor,
  isAdminOrIssueAuthor,
  isAdminOrIssueAuthorOrAssignedUser,
  isAdminOrProjectAssignee,
} from "../middleware/authorization";
import {
  showProjects,
  createProject,
  editProject,
  deleteProject,
  createProjectComment,
  deleteProjectComment,
} from "../controllers/project";
import {
  createIssue,
  editIssue,
  deleteIssue,
  updateIssueStatus,
} from "../controllers/issue";

const router = Router({ mergeParams: true });

// Show Projects

router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  wrapAsync(showProjects)
);

// Create Project

router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  isAdmin,
  validateProject,
  wrapAsync(validateProjectAssignees),
  wrapAsync(createProject)
);

// Edit Project

router.put(
  "/:projectId",
  passport.authenticate("jwt", { session: false }),
  isAdmin,
  validateProject,
  wrapAsync(validateProjectAssignees),
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
  wrapAsync(createProjectComment)
);

// Delete Project Comment

router.delete(
  "/:projectId/comments/:commentId",
  passport.authenticate("jwt", { session: false }),
  wrapAsync(isAdminOrCommentAuthor),
  wrapAsync(deleteProjectComment)
);

// Create Project Issue

router.post(
  "/:projectId/issues",
  passport.authenticate("jwt", { session: false }),
  wrapAsync(isAdminOrProjectAssignee),
  validateIssue,
  wrapAsync(validateIssueAssignedTo),
  wrapAsync(createIssue)
);

// Edit Project Issue

router.put(
  "/:projectId/issues/:issueId",
  passport.authenticate("jwt", { session: false }),
  wrapAsync(isAdminOrIssueAuthor),
  validateIssue,
  wrapAsync(validateIssueAssignedTo),
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
  validateIssueStatus,
  wrapAsync(updateIssueStatus)
);

export default router;
