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

  return (
    <>
      {showProjectForm ? (
        <ProjectForm hideForm={hideProjectFormHandler} />
      ) : null}
      <ProjectsPageLayout>
        {userRole === "Administrator" && projects ? (
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
