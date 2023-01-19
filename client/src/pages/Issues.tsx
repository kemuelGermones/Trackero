import { useEffect, useState } from "react";
import { useAppSelector } from "../store";
import {
  Dashboard,
  FirstSection,
  SecondSection,
} from "../components/styles/layout/Dashboard";
import IssueGraph from "../components/issue/IssueGraph";
import IssueTable from "../components/issue/IssueTable";
import IssueInfo from "../components/issue/IssueInfo";
import IssueComment from "../components/issue/IssueComment";
import modifyIssueList from "../lib/modifyIssueList";
import { IModifiedIssue } from "../types/interface";

type TModifiedIssueState = IModifiedIssue[] | null;
type TCurrentModifiedIssueState = IModifiedIssue | null;

function Issues() {
  const projects = useAppSelector((state) => state.project.projectsData);
  const [modifiedIssues, setModifiedIssues] =
    useState<TModifiedIssueState>(null);
  const [currentModifiedIssue, setCurrentModifiedIssue] =
    useState<TCurrentModifiedIssueState>(null);

  useEffect(() => {
    if (!!projects) {
      setModifiedIssues(modifyIssueList(projects));
    }
  }, [projects]);

  useEffect(() => {
    if (!!currentModifiedIssue && !!modifiedIssues) {
      setCurrentModifiedIssue((state) => {
        if (!!state) {
          const foundModifiedIssue = modifiedIssues.find(
            (issue) => issue._id === state._id
          );
          return !!foundModifiedIssue ? foundModifiedIssue : null;
        }
        return state;
      });
    }
  }, [modifiedIssues]);

  return (
    <Dashboard $templateColumns="1.5fr 1fr">
      <FirstSection>
        {!!modifiedIssues ? (
          <>
            <IssueGraph issues={modifiedIssues} />
            <IssueTable
              issuesData={modifiedIssues}
              setCurrentModifiedIssue={setCurrentModifiedIssue}
              issuesPerTable={10}
            />
          </>
        ) : null}
      </FirstSection>
      <SecondSection>
        {!!currentModifiedIssue ? (
          <>
            <IssueInfo
              projectId={currentModifiedIssue.projectId}
              issue={currentModifiedIssue}
            />
            <IssueComment
              projectId={currentModifiedIssue.projectId}
              issueId={currentModifiedIssue._id}
              comments={currentModifiedIssue.comments}
            />
          </>
        ) : null}
      </SecondSection>
    </Dashboard>
  );
}

export default Issues;
