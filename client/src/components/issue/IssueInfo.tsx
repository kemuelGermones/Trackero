import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store";
import {
  Card,
  CardTitle,
  CardDescription,
  CardButtons,
} from "../styles/UI/Card";
import Button from "../styles/UI/Button";
import IssueForm from "./IssueForm";
import TextLight from "../styles/utils/TextLight";
import { deleteIssue } from "../../store/issue-action";
import { IIssue, IModifiedIssue } from "../../types/interface";
import { instanceOfIModifiedIssue } from "../../types/type-guard";

interface IIssueInfo {
  projectId: string;
  issue: IIssue | IModifiedIssue;
}

function IssueInfo({ projectId, issue }: IIssueInfo) {
  const [showEditIssueForm, setShowEditIssueForm] = useState(false);
  const dispatch = useAppDispatch();
  const accessToken = useAppSelector((state) => state.user.accessToken);

  const showEditIssueFormHandler = () => {
    setShowEditIssueForm(true);
    document.body.style.overflow = "hidden";
  };

  const hideEditIssueFormHandler = () => {
    setShowEditIssueForm(false);
    document.body.style.overflow = "unset";
  };

  const deleteIssueHandler = (projId: string, issueId: string) => {
    if (!!accessToken) {
      dispatch(deleteIssue(projId, issueId, accessToken));
    }
  };

  return (
    <>
      {showEditIssueForm ? (
        <IssueForm
          type="edit"
          hideForm={hideEditIssueFormHandler}
          projectId={projectId}
          initialValue={issue}
        />
      ) : null}
      <Card style={{ marginBottom: "1rem" }}>
        <CardTitle>{issue.title}</CardTitle>
        <CardDescription>{issue.description}</CardDescription>
        {instanceOfIModifiedIssue(issue) && !!issue.projectName ? (
          <CardDescription>
            <TextLight>Project: </TextLight>
            {issue.projectName}
          </CardDescription>
        ) : null}
        <CardDescription>
          <TextLight>Status: </TextLight>
          {issue.status}
        </CardDescription>
        <CardDescription>
          <TextLight>Importance: </TextLight>
          {issue.importance}
        </CardDescription>
        <CardDescription>
          <TextLight>Due Date: </TextLight>
          {new Date(issue.dueDate).toDateString()}
        </CardDescription>
        <CardButtons>
          <Button onClick={showEditIssueFormHandler}>Edit</Button>
          <Button onClick={deleteIssueHandler.bind(null, projectId, issue._id)}>
            Delete
          </Button>
        </CardButtons>
      </Card>
    </>
  );
}

export default IssueInfo;
