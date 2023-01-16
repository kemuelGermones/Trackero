import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store";
import {
  Card,
  CardTitle,
  CardDescription,
  CardButtons,
} from "../styles/UI/Card";
import Button from "../styles/UI/Button";
import ProjectForm from "./ProjectForm";
import { deleteProject } from "../../store/project-action";
import { IProject } from "../../types/interface";

interface IProjectInfo {
  data: IProject;
}

function ProjectInfo({ data }: IProjectInfo) {
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
    if (!!accessToken) {
      const deleteStatus = await dispatch(deleteProject(data._id, accessToken));
      if (deleteStatus === 200) {
        navigate("/projects");
      }
    }
  };

  return (
    <>
      {showProjectForm ? (
        <ProjectForm
          type="edit"
          initialTitle={data.title}
          initialDescription={data.description}
          hideForm={hideProjectFormHandler}
          projectId={data._id}
        />
      ) : null}
      <Card style={{ marginBottom: "1rem" }}>
        <CardTitle>{data.title}</CardTitle>
        <CardDescription>{data.description}</CardDescription>
        <CardButtons>
          <Button onClick={showProjectFormHandler}>Edit</Button>
          <Button onClick={deleteProjectRequest}>Delete</Button>
        </CardButtons>
      </Card>
    </>
  );
}

export default ProjectInfo;
