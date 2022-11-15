import { Router } from "express";
import { validateProject } from "../middleware";
import wrapAsync from "../utils/wrapAsync";
import {
  showProjects,
  createProject,
  showIndividualProject,
  editProject,
  deleteProject,
} from "../controllers/project";

const router = Router();

// Create project

router.post("/", validateProject, wrapAsync(createProject));

// Show projects

router.get("/", wrapAsync(showProjects));

// Show individual project

router.get("/:id", wrapAsync(showIndividualProject));

// Edit project

router.put("/:id", validateProject, wrapAsync(editProject));

// Delete project

router.delete("/:id", wrapAsync(deleteProject));

export default router;
