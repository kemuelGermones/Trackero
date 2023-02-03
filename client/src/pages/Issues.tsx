import { useEffect, useState } from "react";
import { useAppSelector } from "../store";
import listAllIssues from "../lib/listAllIssues";
import foundProjectId from "../lib/foundProjectId";

import {
  PageDashboardLayout,
  FirstSection,
  SecondSection,
} from "../components/styles/layout/PageDashboardLayout";
import Instruction from "../components/instruction/Instruction";
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
          return foundIssue ? foundIssue : null;
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
    <PageDashboardLayout $templateColumns="1.5fr 1fr">
      <FirstSection>
        {allIssues ? (
          <>
            <IssueGraph issuesData={allIssues} />
            <Instruction>
              To view the issue details in the table, locate the row containing
              it and click on the corresponding cell with your mouse cursor.
            </Instruction>
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
    </PageDashboardLayout>
  );
}

export default Issues;
