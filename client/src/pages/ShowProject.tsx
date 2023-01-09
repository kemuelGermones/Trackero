import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAppSelector } from "../store/index";
import {
  Dashboard,
  FirstSection,
  SecondSection,
} from "../components/styles/layout/Dashboard";
import IssueInfo from "../components/issue/IssueInfo";
import IssueTable from "../components/issue/IssueTable";
import ProjectInfo from "../components/project/ProjectInfo";
import ProjectComment from "../components/project/ProjectComment";
import { instanceOfIProject, isArrayOfIProject } from "../types/type-guard";
import { IIssue, IProject } from "../types/interface";
import IssueComment from "../components/issue/IssueComment";
import IssueGraph from "../components/issue/IssueGraph";

type TProjectState = IProject | null;
type TIssueState = IIssue | null;

function ShowProject() {
  const { id } = useParams();
  const navigate = useNavigate();
  const projects = useAppSelector((state) => state.project.data);
  const [project, setProject] = useState<TProjectState>(null);
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
    if (!!currentIssue && !!project) {
      setCurrentIssue((state) => {
        if (!!state) {
          const foundIssue = project.issues.find(
            (issue) => issue._id === state._id
          );
          return !!foundIssue ? foundIssue : null;
        }
        return state;
      });
    }
  }, [project]);

  return (
    <>
      <Dashboard $templateColumns="1fr 1.5fr">
        <FirstSection>
          {instanceOfIProject(project) ? (
            <>
              <ProjectInfo data={project} />
              <ProjectComment
                projectId={project._id}
                comments={project.comments}
              />
            </>
          ) : null}
        </FirstSection>
        <SecondSection>
          {instanceOfIProject(project) ? (
            <>
              <IssueGraph issues={project.issues} />
              <IssueTable
                projectId={project._id}
                issuesData={project.issues}
                setCurrentIssue={setCurrentIssue}
                issuesPerTable={5}
              />
              {!!currentIssue ? (
                <>
                  <IssueInfo projectId={project._id} issue={currentIssue} />
                  <IssueComment
                    projectId={project._id}
                    issueId={currentIssue._id}
                    comments={currentIssue.comments}
                  />
                </>
              ) : null}
            </>
          ) : null}
        </SecondSection>
      </Dashboard>
    </>
  );
}

export default ShowProject;
