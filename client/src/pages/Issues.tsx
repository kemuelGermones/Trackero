import { useCallback, useEffect, useMemo, useState } from "react";

import Instruction from "../components/instruction/Instruction";
import IssueComment from "../components/issue/IssueComment";
import IssueGraph from "../components/issue/IssueGraph";
import IssueInfo from "../components/issue/IssueInfo";
import IssueTable from "../components/issue/IssueTable";
import { PageDashboardLayout } from "../components/styles/layout/PageDashboardLayout";
import foundProject from "../lib/foundProject";
import listAllIssues from "../lib/listAllIssues";
import { useAppSelector } from "../store";
import { IIssue, IProject } from "../types/interface";

type TCurrentIssueState = IIssue | null;
type TCurrentProjectIssueId = IProject | null;

function Issues() {
  const projects = useAppSelector((state) => state.project.projectsData);
  const [currentIssue, setCurrentIssue] = useState<TCurrentIssueState>(null);
  const [currentProject, setCurrentProject] =
    useState<TCurrentProjectIssueId>(null);

  const allIssues = useMemo(() => {
    if (projects) {
      return listAllIssues(projects);
    }
    return null;
  }, [projects]);

  useEffect(() => {
    if (allIssues && currentIssue) {
      setCurrentIssue((state) => {
        if (state) {
          const foundIssue = allIssues.find((issue) => issue._id === state._id);
          return foundIssue ? foundIssue : null;
        }
        return state;
      });
    }
  }, [allIssues]);

  useEffect(() => {
    if (currentIssue && projects) {
      setCurrentProject(foundProject(projects, currentIssue._id));
    }
  }, [currentIssue]);

  const setCurrentIssueHandler = useCallback((issue: IIssue) => {
    setCurrentIssue(issue);
  }, []);

  return (
    <PageDashboardLayout $templateColumns="1.5fr 1fr">
      <div>
        {allIssues ? (
          <>
            <IssueGraph issuesData={allIssues} />
            <Instruction>
              To view the issue details in the table, locate the row containing
              it and click on the corresponding cell with your mouse cursor.
            </Instruction>
            <IssueTable
              issuesData={allIssues}
              setCurrentIssue={setCurrentIssueHandler}
              issuesPerTable={10}
            />
          </>
        ) : null}
      </div>
      <div>
        {currentIssue && currentProject ? (
          <>
            <IssueInfo
              projectId={currentProject._id}
              projectAssignees={currentProject.assignees}
              projectTitle={currentProject.title}
              issueData={currentIssue}
            />
            <IssueComment
              issueId={currentIssue._id}
              issueComments={currentIssue.comments}
            />
          </>
        ) : null}
      </div>
    </PageDashboardLayout>
  );
}

export default Issues;
