import { useEffect, useState } from "react";
import { useAppSelector } from "../store";
import { listAllIssues, foundProjectId } from "../lib/lib";

import {
  Dashboard,
  FirstSection,
  SecondSection,
} from "../components/styles/layout/Dashboard";
import IssueGraph from "../components/issue/IssueGraph";
import IssueTable from "../components/issue/IssueTable";
import IssueInfo from "../components/issue/IssueInfo";
import IssueComment from "../components/issue/IssueComment";

import { IIssue } from "../types/interface";

type TIssueState = IIssue[] | null;
type TCurrentIssueState = IIssue | null;
type TCurrentProjectIssueId = string | null;

function Issues() {
  const projects = useAppSelector((state) => state.project.projectsData);
  const [allIssues, setAllIssues] = useState<TIssueState>(null);
  const [currentIssue, setCurrentIssue] = useState<TCurrentIssueState>(null);
  const [currentProjectIssueId, setCurrentProjectIssueId] =
    useState<TCurrentProjectIssueId>(null);

  useEffect(() => {
    if (projects) {
      setAllIssues(listAllIssues(projects));
    }
  }, [projects]);

  useEffect(() => {
    if (allIssues && currentIssue) {
      setCurrentIssue((state) => {
        if (state) {
          const foundIssue = allIssues.find((issue) => issue._id === state._id);
          return foundIssue ? foundIssue : state;
        }
        return state;
      });
    }
  }, [allIssues]);

  useEffect(() => {
    if (currentIssue && projects) {
      setCurrentProjectIssueId(foundProjectId(projects, currentIssue._id));
    }
  }, [currentIssue]);

  return (
    <Dashboard $templateColumns="1.5fr 1fr">
      <FirstSection>
        {allIssues ? (
          <>
            <IssueGraph issuesData={allIssues} />
            <IssueTable
              issuesData={allIssues}
              setCurrentIssue={setCurrentIssue}
              issuesPerTable={10}
            />
          </>
        ) : null}
      </FirstSection>
      <SecondSection>
        {currentIssue && currentProjectIssueId ? (
          <>
            <IssueInfo
              projectId={currentProjectIssueId}
              issueData={currentIssue}
            />
            <IssueComment
              projectId={currentProjectIssueId}
              issueData={currentIssue}
            />
          </>
        ) : null}
      </SecondSection>
    </Dashboard>
  );
}

export default Issues;
