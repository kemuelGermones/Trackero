import { useState } from "react";
import { useNavigate } from "react-router-dom";

import ProjectForm from "../components/project/ProjectForm";
import { PlusButton } from "../components/styles/UI/Button";
import {
  Card,
  CardBody,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/styles/UI/Card";
import ProjectsPageLayout from "../components/styles/layout/ProjectsPageLayout";
import { useAppSelector } from "../store";

function Projects() {
  const [showProjectForm, setShowProjectForm] = useState(false);
  const navigate = useNavigate();
  const projects = useAppSelector((state) => state.project.projectsData);
  const userRole = useAppSelector((state) => state.user.userRole);

  const showProjectFormHandler = () => {
    setShowProjectForm(true);
  };

  const hideProjectFormHandler = () => {
    setShowProjectForm(false);
  };

  return projects ? (
    <>
      {showProjectForm ? (
        <ProjectForm hideForm={hideProjectFormHandler} />
      ) : null}
      <ProjectsPageLayout>
        {userRole === "Administrator" && projects ? (
          <Card $center={true} $height="15rem" onClick={showProjectFormHandler}>
            <PlusButton />
            <CardTitle>Add Project</CardTitle>
          </Card>
        ) : null}
        {projects.map((project) => (
          <Card
            key={project._id}
            $height="15rem"
            onClick={() => navigate(`/projects/${project._id}`)}
          >
            <CardHeader>
              <CardTitle>{project.title}</CardTitle>
            </CardHeader>
            <CardBody>
              <CardDescription>
                {project.description}
              </CardDescription>
            </CardBody>
          </Card>
        ))}
      </ProjectsPageLayout>
    </>
  ) : null;
}

export default Projects;
