import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAppSelector } from "../store/index";

import {
  PageDashboardLayout,
  FirstSection,
  SecondSection,
} from "../components/styles/layout/PageDashboardLayout";
import Instruction from "../components/instruction/Instruction";
import ProjectInfo from "../components/project/ProjectInfo";
import ProjectComment from "../components/project/ProjectComment";
import IssueInfo from "../components/issue/IssueInfo";
import IssueComment from "../components/issue/IssueComment";
import IssueGraph from "../components/issue/IssueGraph";
import IssueTable from "../components/issue/IssueTable";

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

  return (
    <>
      <PageDashboardLayout $templateColumns="1fr 1.5fr">
        <FirstSection>
          {project ? (
            <>
              <ProjectInfo projectData={project} />
              <ProjectComment projectData={project} />
            </>
          ) : null}
        </FirstSection>
        <SecondSection>
          {project ? (
            <>
              <IssueGraph issuesData={project.issues} />
              <Instruction>
                To view the issue details in the table, locate the row
                containing it and click on the corresponding cell with your
                mouse cursor.
              </Instruction>
              <IssueTable
                projectId={project._id}
                issuesData={project.issues}
                setCurrentIssue={setCurrentIssue}
                issuesPerTable={5}
              />
              {currentIssue ? (
                <>
                  <IssueInfo projectId={project._id} issueData={currentIssue} />
                  <IssueComment
                    projectId={project._id}
                    issueData={currentIssue}
                  />
                </>
              ) : null}
            </>
          ) : null}
        </SecondSection>
      </PageDashboardLayout>
    </>
  );
}

export default ShowProject;
