import { useState } from "react";

import { useAppDispatch, useAppSelector } from "../../store";
import { deleteIssue } from "../../store/issue-action";
import { IIssue, IUser } from "../../types/interface";
import { Button, SmallButton } from "../styles/UI/Button";
import {
  Card,
  CardBody,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../styles/UI/Card";
import TextLight from "../styles/utils/TextLight";
import IssueForm from "./IssueForm";
import IssueStatusForm from "./IssueStatusForm";

interface IIssueInfo {
  projectId: string;
  projectAssignees: IUser[];
  projectTitle?: string;
  issueData: IIssue;
}

function IssueInfo({
  projectId,
  projectAssignees,
  projectTitle,
  issueData,
}: IIssueInfo) {
  const [showEditIssueForm, setShowEditIssueForm] = useState(false);
  const [showStatusForm, setShowStatusForm] = useState(false);
  const dispatch = useAppDispatch();
  const { userId, userRole } = useAppSelector((state) => state.user);

  const showEditIssueFormHandler = () => {
    setShowEditIssueForm(true);
  };

  const hideEditIssueFormHandler = () => {
    setShowEditIssueForm(false);
  };

  const showStatusIssueFormHandler = () => {
    setShowStatusForm(true);
  };

  const hideStatusIssueFormHandler = () => {
    setShowStatusForm(false);
  };

  const deleteIssueHandler = (issueId: string) => {
    dispatch(deleteIssue(projectId, issueId));
  };

  return (
    <>
      {showEditIssueForm ? (
        <IssueForm
          projectId={projectId}
          projectAssignees={projectAssignees}
          hideForm={hideEditIssueFormHandler}
          initialValues={issueData}
        />
      ) : null}
      {showStatusForm ? (
        <IssueStatusForm
          hideForm={hideStatusIssueFormHandler}
          projectId={projectId}
          issueId={issueData._id}
          issueStatus={issueData.status}
        />
      ) : null}
      <Card style={{ marginBottom: "1rem" }}>
        <CardHeader>
          <CardTitle>{issueData.title}</CardTitle>
          {issueData.author._id === userId ||
          userRole === "Administrator" ||
          issueData.assignedTo._id === userId ? (
            <SmallButton onClick={showStatusIssueFormHandler}>
              Update Status
            </SmallButton>
          ) : null}
        </CardHeader>
        <CardBody>
          <CardDescription $hasLimit={false}>
            {issueData.description}
          </CardDescription>
        </CardBody>
        {projectTitle ? (
          <CardBody>
            <CardDescription $hasLimit={false}>
              <TextLight>Project: </TextLight>
              {projectTitle}
            </CardDescription>
          </CardBody>
        ) : null}
        <CardBody>
          <CardDescription $hasLimit={false}>
            <TextLight>Author: </TextLight>
            {issueData.author.username}
          </CardDescription>
        </CardBody>
        <CardBody>
          <CardDescription $hasLimit={false}>
            <TextLight>Assigned to: </TextLight>
            {issueData.assignedTo.username}
          </CardDescription>
        </CardBody>
        <CardBody>
          <CardDescription $hasLimit={false}>
            <TextLight>Status: </TextLight>
            {issueData.status}
          </CardDescription>
        </CardBody>
        <CardBody>
          <CardDescription $hasLimit={false}>
            <TextLight>Importance: </TextLight>
            {issueData.importance}
          </CardDescription>
        </CardBody>
        <CardBody>
          <CardDescription $hasLimit={false}>
            <TextLight>Due Date: </TextLight>
            {new Date(issueData.dueDate).toDateString()}
          </CardDescription>
        </CardBody>
        {issueData.author._id === userId || userRole === "Administrator" ? (
          <CardFooter $templateColumns="1fr 1fr">
            <Button onClick={showEditIssueFormHandler}>Edit</Button>
            <Button onClick={deleteIssueHandler.bind(null, issueData._id)}>
              Delete
            </Button>
          </CardFooter>
        ) : null}
      </Card>
    </>
  );
}

export default IssueInfo;
