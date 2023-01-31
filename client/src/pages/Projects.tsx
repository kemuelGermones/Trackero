import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../store";

import ProjectsPageLayout from "../components/styles/layout/ProjectsPageLayout";
import ProjectForm from "../components/project/ProjectForm";
import {
  Card,
  CardTitle,
  CardHeader,
  CardDescription,
  CardBody,
} from "../components/styles/UI/Card";
import { PlusButton } from "../components/styles/UI/Button";

function Projects() {
  const [showProjectForm, setShowProjectForm] = useState(false);
  const navigate = useNavigate();
  const projects = useAppSelector((state) => state.project.projectsData);
  const userRole = useAppSelector((state) => state.user.userRole);

  const showProjectFormHandler = () => {
    setShowProjectForm(true);
    document.body.style.overflow = "hidden";
  };

  const hideProjectFormHandler = () => {
    setShowProjectForm(false);
    document.body.style.overflow = "unset";
  };

  return (
    <>
      {showProjectForm ? (
        <ProjectForm hideForm={hideProjectFormHandler} />
      ) : null}
      <ProjectsPageLayout>
        {userRole === "Administrator" ? (
          <Card
            $center={true}
            onClick={showProjectFormHandler}
            style={{ height: "15rem" }}
          >
            <PlusButton />
            <CardTitle>Add Project</CardTitle>
          </Card>
        ) : null}
        {projects
          ? projects.map((project) => (
              <Card
                key={project._id}
                onClick={() => navigate(`/projects/${project._id}`)}
                style={{ height: "15rem" }}
              >
                <CardHeader>
                  <CardTitle>{project.title}</CardTitle>
                </CardHeader>
                <CardBody>
                  <CardDescription $hasLimit={true}>
                    {project.description}
                  </CardDescription>
                </CardBody>
              </Card>
            ))
          : null}
      </ProjectsPageLayout>
    </>
  );
}

export default Projects;
