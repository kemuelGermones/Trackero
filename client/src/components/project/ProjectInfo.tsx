import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store";
import { deleteProject } from "../../store/project-action";

import {
  Card,
  CardTitle,
  CardDescription,
  CardButtons,
  CardHeader,
} from "../styles/UI/Card";
import Button from "../styles/UI/Button";
import ProjectForm from "./ProjectForm";

import { IProject } from "../../types/interface";

interface IProjectInfo {
  projectData: IProject;
}

function ProjectInfo({ projectData }: IProjectInfo) {
  const [showProjectForm, setShowProjectForm] = useState(false);
  const accessToken = useAppSelector((state) => state.user.accessToken);
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
      const deleteStatus = await dispatch(deleteProject(projectData._id, accessToken));
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
      <Card style={{ marginBottom: "1rem" }}>
        <CardHeader>
          <CardTitle>{projectData.title}</CardTitle>
        </CardHeader>
        <CardDescription $hasLimit={false}>{projectData.description}</CardDescription>
        <CardButtons>
          <Button onClick={showProjectFormHandler}>Edit</Button>
          <Button onClick={deleteProjectRequest}>Delete</Button>
        </CardButtons>
      </Card>
    </>
  );
}

export default ProjectInfo;
