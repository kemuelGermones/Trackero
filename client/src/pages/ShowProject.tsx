import { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import Instruction from "../components/instruction/Instruction";
import IssueComment from "../components/issue/IssueComment";
import IssueGraph from "../components/issue/IssueGraph";
import IssueInfo from "../components/issue/IssueInfo";
import IssueTable from "../components/issue/IssueTable";
import ProjectComment from "../components/project/ProjectComment";
import ProjectInfo from "../components/project/ProjectInfo";
import { PageDashboardLayout } from "../components/styles/layout/PageDashboardLayout";
import { useAppSelector } from "../store/index";
import { IIssue, IProject } from "../types/interface";

type TProjectState = IProject | null;
type TIssueState = IIssue | null;

function ShowProject() {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const projects = useAppSelector((state) => state.project.projectsData);
  const [project, setProject] = useState<TProjectState>(null);
  const [currentIssue, setCurrentIssue] = useState<TIssueState>(null);

  useEffect(() => {
    if (projects) {
      const foundProject = projects.find(
        (project) => project._id === projectId
      );
      if (foundProject) {
        setProject(foundProject);
      } else {
        navigate("/error");
      }
    }
  }, [projects]);

  useEffect(() => {
    if (project && currentIssue) {
      setCurrentIssue((state) => {
        if (state) {
          const foundIssue = project.issues.find(
            (issue) => issue._id === state._id
          );
          return foundIssue ? foundIssue : null;
        }
        return state;
      });
    }
  }, [project]);

  const setCurrentIssueHandler = useCallback((issue: IIssue) => {
    setCurrentIssue(issue);
  }, []);

  return (
    <>
      <PageDashboardLayout $templateColumns="1fr 1.5fr">
        <div>
          {project ? (
            <>
              <ProjectInfo projectData={project} />
              <ProjectComment
                projectId={project._id}
                projectComments={project.comments}
              />
            </>
          ) : null}
        </div>
        <div>
          {project ? (
            <>
              <IssueGraph issuesData={project.issues} />
              <Instruction>
                To view the issue details in the table, locate the row
                containing it and click on the corresponding cell with your
                mouse cursor.
              </Instruction>
              <IssueTable
                issuesData={project.issues}
                setCurrentIssue={setCurrentIssueHandler}
                issuesPerTable={5}
              />
              {currentIssue ? (
                <>
                  <IssueInfo
                    projectId={project._id}
                    projectAssignees={project.assignees}
                    issueData={currentIssue}
                  />
                  <IssueComment
                    issueId={currentIssue._id}
                    issueComments={currentIssue.comments}
                  />
                </>
              ) : null}
            </>
          ) : null}
        </div>
      </PageDashboardLayout>
    </>
  );
}

export default ShowProject;
