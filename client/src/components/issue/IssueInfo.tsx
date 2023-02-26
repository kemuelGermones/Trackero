import { useState } from "react";

import { useAppDispatch, useAppSelector } from "../../store";
import { deleteIssueRequest } from "../../store/issue-action";
import { IIssue, IUser } from "../../types/interface";
import { Button, SmallButton } from "../styles/UI/Button";
import {
  Card,
  CardBody,
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

  const deleteIssueRequestHandler = (issueId: string) => {
    dispatch(deleteIssueRequest(projectId, issueId));
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
      <Card $margin={projectTitle ? "0 0 1rem 0" : "1rem 0"}>
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
        <CardBody>{issueData.description}</CardBody>
        {projectTitle ? (
          <CardBody>
            <TextLight>Project: </TextLight>
            {projectTitle}
          </CardBody>
        ) : null}
        <CardBody>
          <TextLight>Author: </TextLight>
          {issueData.author.username}
        </CardBody>
        <CardBody>
          <TextLight>Assigned to: </TextLight>
          {issueData.assignedTo.username}
        </CardBody>
        <CardBody>
          <TextLight>Status: </TextLight>
          {issueData.status}
        </CardBody>
        <CardBody>
          <TextLight>Importance: </TextLight>
          {issueData.importance}
        </CardBody>
        <CardBody>
          <TextLight>Due Date: </TextLight>
          {new Date(issueData.dueDate).toDateString()}
        </CardBody>
        {issueData.author._id === userId || userRole === "Administrator" ? (
          <CardFooter $templateColumns="1fr 1fr">
            <Button onClick={showEditIssueFormHandler}>Edit</Button>
            <Button
              onClick={deleteIssueRequestHandler.bind(null, issueData._id)}
            >
              Delete
            </Button>
          </CardFooter>
        ) : null}
      </Card>
    </>
  );
}

export default IssueInfo;
