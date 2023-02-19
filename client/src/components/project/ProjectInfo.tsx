import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "../../store";
import { deleteProject } from "../../store/project-action";
import { IProject } from "../../types/interface";
import IssueForm from "../issue/IssueForm";
import { Button, SmallButton } from "../styles/UI/Button";
import {
  Card,
  CardBody,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../styles/UI/Card";
import ProjectForm from "./ProjectForm";

interface IProjectInfo {
  projectData: IProject;
}

function ProjectInfo({ projectData }: IProjectInfo) {
  const [showProjectForm, setShowProjectForm] = useState(false);
  const [showIssueForm, setShowIssueForm] = useState(false);
  const { userRole, userId } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const showProjectFormHandler = () => {
    setShowProjectForm(true);
  };

  const hideProjectFormHandler = () => {
    setShowProjectForm(false);
  };

  const showIssueFormHandler = () => {
    setShowIssueForm(true);
  };

  const hideIssueForm = () => {
    setShowIssueForm(false);
  };

  const deleteProjectRequest = async () => {
    const deleteStatus = await dispatch(deleteProject(projectData._id));
    if (deleteStatus === 200) {
      navigate("/projects");
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
      {showIssueForm ? (
        <IssueForm
          hideForm={hideIssueForm}
          projectId={projectData._id}
          projectAssignees={projectData.assignees}
        />
      ) : null}
      <Card $marginBottom={true}>
        <CardHeader>
          <CardTitle>{projectData.title}</CardTitle>
          {userRole === "Administrator" ||
          projectData.assignees.find((user) => user._id === userId) ? (
            <SmallButton onClick={showIssueFormHandler}>Add Issue</SmallButton>
          ) : null}
        </CardHeader>
        <CardBody>
          <CardDescription $hasLimit={false}>
            {projectData.description}
          </CardDescription>
        </CardBody>
        {userRole === "Administrator" ? (
          <CardFooter $templateColumns="1fr 1fr">
            <Button onClick={showProjectFormHandler}>Edit</Button>
            <Button onClick={deleteProjectRequest}>Delete</Button>
          </CardFooter>
        ) : null}
      </Card>
    </>
  );
}

export default ProjectInfo;
