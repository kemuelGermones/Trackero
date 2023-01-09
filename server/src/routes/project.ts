import { Router } from "express";
import { validateProject } from "../middleware";
import wrapAsync from "../utils/wrapAsync";
import {
  showProjects,
  createProject,
  editProject,
  deleteProject,
} from "../controllers/project";

const router = Router();

// Create project

router.post("/", validateProject, wrapAsync(createProject));

// Show projects

router.get("/", wrapAsync(showProjects));

// Edit project

router.put("/:projectId", validateProject, wrapAsync(editProject));

// Delete project

router.delete("/:projectId", wrapAsync(deleteProject));

export default router;
