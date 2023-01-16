import { Router } from "express";
import { validateProject } from "../middleware";
import wrapAsync from "../utils/wrapAsync";
import {
  showProjects,
  createProject,
  editProject,
  deleteProject,
} from "../controllers/project";
import passport from "passport";

const router = Router();

// Create project

router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  validateProject,
  wrapAsync(createProject)
);

// Show projects

router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  wrapAsync(showProjects)
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

export default router;
