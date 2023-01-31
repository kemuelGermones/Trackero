import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store";
import { deleteProject } from "../../store/project-action";

import {
  Card,
  CardTitle,
  CardDescription,
  CardFooter,
  CardHeader,
  CardBody,
} from "../styles/UI/Card";
import { Button } from "../styles/UI/Button";
import ProjectForm from "./ProjectForm";

import { IProject } from "../../types/interface";

interface IProjectInfo {
  projectData: IProject;
}

function ProjectInfo({ projectData }: IProjectInfo) {
  const [showProjectForm, setShowProjectForm] = useState(false);
  const { accessToken, userRole } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const showProjectFormHandler = () => {
    document.body.style.overflow = "hidden";
    setShowProjectForm(true);
  };

  const hideProjectFormHandler = () => {
    setShowProjectForm(false);
    document.body.style.overflow = "unset";
  };

  const deleteProjectRequest = async () => {
    if (accessToken) {
      const deleteStatus = await dispatch(
        deleteProject(projectData._id, accessToken)
      );
      if (deleteStatus === 200) {
        navigate("/projects");
      }
    }
  };

  return (
    <>
      {showProjectForm ? (
        <ProjectForm
          initialValues={projectData}
          hideForm={hideProjectFormHandler}
        />
      ) : null}
      <Card $marginBottom={true}>
        <CardHeader>
          <CardTitle>{projectData.title}</CardTitle>
        </CardHeader>
        <CardBody>
          <CardDescription $hasLimit={false}>
            {projectData.description}
          </CardDescription>
        </CardBody>
        {userRole === "Administrator" ? (
          <CardFooter>
            <Button onClick={showProjectFormHandler}>Edit</Button>
            <Button onClick={deleteProjectRequest}>Delete</Button>
          </CardFooter>
        ) : null}
      </Card>
    </>
  );
}

export default ProjectInfo;
