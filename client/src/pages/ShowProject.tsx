import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAppSelector } from "../store/index";
import {
  Dashboard,
  ProjectSection,
  IssueSection,
} from "../components/styles/layout/Dashboard";
import IssueInfo from "../components/issue/IssueInfo";
import IssueTable from "../components/issue/IssueTable";
import ProjectInfo from "../components/project/ProjectInfo";
import ProjectComment from "../components/project/ProjectComment";
import { instanceOfIProject, isArrayOfIProject } from "../types/type-guard";
import { IIssue, IProject } from "../types/interface";
import IssueComment from "../components/issue/IssueComment";

type TProjectState = IProject | null;
type TIssueIdState = string | null;
type TIssueState = IIssue | null;

function ShowProject() {
  const { id } = useParams();
  const navigate = useNavigate();
  const projects = useAppSelector((state) => state.project.data);
  const [project, setProject] = useState<TProjectState>(null);
  const [currentIssueId, setCurrentIssueId] = useState<TIssueIdState>(null);
  const [currentIssue, setCurrentIssue] = useState<TIssueState>(null);

  useEffect(() => {
    if (isArrayOfIProject(projects)) {
      const foundProject = projects.find((project) => project._id === id);
      if (instanceOfIProject(foundProject)) {
        setProject(foundProject);
      } else {
        navigate("*");
      }
    }
  }, [projects]);

  useEffect(() => {
    if (!!project && !!currentIssueId) {
      const foundIssue = project.issues.find(
        (issue) => issue._id === currentIssueId
      );
      if (!!foundIssue) setCurrentIssue(foundIssue);
    }
  }, [currentIssueId, project]);

  const setCurrentIssueIdHandler = (id: string) => {
    setCurrentIssueId(id);
  };

  const setCurrentIssueIdToNullHandler = () => {
    setCurrentIssueId(null);
  };

  return (
    <>
      <Dashboard>
        <ProjectSection>
          {instanceOfIProject(project) ? (
            <>
              <ProjectInfo data={project} />
              <ProjectComment
                projectId={project._id}
                comments={project.comments}
              />
            </>
          ) : null}
        </ProjectSection>
        <IssueSection>
          {instanceOfIProject(project) ? (
            <>
              <IssueTable
                projectId={project._id}
                issues={project.issues}
                setCurrentIssueId={setCurrentIssueIdHandler}
              />
              {!!currentIssue && !!currentIssueId ? (
                <>
                  <IssueInfo
                    projectId={project._id}
                    issue={currentIssue}
                    setCurrentIssueId={setCurrentIssueIdToNullHandler}
                  />
                  <IssueComment
                    projectId={project._id}
                    issueId={currentIssue._id}
                    comments={currentIssue.comments}
                  />
                </>
              ) : null}
            </>
          ) : null}
        </IssueSection>
      </Dashboard>
    </>
  );
}

export default ShowProject;
