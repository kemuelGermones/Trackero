import { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import Info from "../components/info/Info";
import IssueComment from "../components/issue/IssueComment";
import IssueGraph from "../components/issue/IssueGraph";
import IssueInfo from "../components/issue/IssueInfo";
import IssueTable from "../components/issue/IssueTable";
import ProjectComment from "../components/project/ProjectComment";
import ProjectInfo from "../components/project/ProjectInfo";
import { PageDashboardLayout } from "../components/styles/layout/PageDashboardLayout";
import { useAppSelector } from "../store/index";
import { IIssue } from "../types/interface";

type TIssueState = IIssue | null;

function ShowProject() {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const [currentIssue, setCurrentIssue] = useState<TIssueState>(null);
  const projects = useAppSelector((state) => state.project.projectsData);

  const project = useMemo(() => {
    if (projects) {
      return projects.find((project) => project._id === projectId);
    }
  }, [projects]);

  useEffect(() => {
    if (projects && !project) navigate("/error");
  }, [project]);

  useEffect(() => {
    if (project && currentIssue) {
      setCurrentIssue((state) => {
        const foundIssue = project.issues.find(
          (issue) => issue._id === state!._id
        );
        return foundIssue ? foundIssue : null;
      });
    }
  }, [project]);

  const setCurrentIssueHandler = useCallback((issue: IIssue) => {
    setCurrentIssue(issue);
  }, []);

  return project ? (
    <PageDashboardLayout $templateColumns="1fr 1.5fr">
      <div>
        <ProjectInfo projectData={project} />
        <ProjectComment
          projectId={project._id}
          projectComments={project.comments}
        />
      </div>
      <div>
        <IssueGraph issuesData={project.issues} />
        <Info>
          To view the issue details in the table, locate the row containing it
          and click on the corresponding cell with your mouse cursor.
        </Info>
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
              projectId={project._id}
              issueId={currentIssue._id}
              issueComments={currentIssue.comments}
            />
          </>
        ) : null}
      </div>
    </PageDashboardLayout>
  ) : null;
}

export default ShowProject;
