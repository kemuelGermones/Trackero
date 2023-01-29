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
  isAdminAndCommentAuthor,
  isAdminAndIssueAuthor,
  isAdminAndIssueAuthorAndAssignedUser
} from "../middleware";
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
  isAdmin,
  validateProject,
  wrapAsync(createProject)
);

// Edit project

router.put(
  "/:projectId",
  passport.authenticate("jwt", { session: false }),
  isAdmin,
  validateProject,
  wrapAsync(editProject)
);

// Delete project

router.delete(
  "/:projectId",
  passport.authenticate("jwt", { session: false }),
  isAdmin,
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
  isAdminAndCommentAuthor,
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
  isAdminAndIssueAuthor,
  validateIssue,
  wrapAsync(editIssue)
);

// Delete project issue

router.delete(
  "/:projectId/issues/:issueId",
  passport.authenticate("jwt", { session: false }),
  isAdminAndIssueAuthor,
  wrapAsync(deleteIssue)
);

// Update project issue status

router.patch(
  "/:projectId/issues/:issueId/status",
  passport.authenticate("jwt", { session: false }),
  isAdminAndIssueAuthorAndAssignedUser,
  isValidStatus,
  wrapAsync(updateIssueStatus)
);

// Update project issue assigned to

router.patch(
  "/:projectId/issues/:issueId/assignedTo",
  passport.authenticate("jwt", { session: false }),
  isAdminAndIssueAuthor,
  isValidUsers,
  wrapAsync(updateIssueAssignedTo)
);

export default router;
