import { useState } from "react";
import { useAppDispatch } from "../../store";
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
import { IIssue } from "../../types/interface";

interface IIssueInfo {
  projectId: string;
  issue: IIssue;
  setCurrentIssueId: () => void;
}

function IssueInfo({ projectId, issue, setCurrentIssueId }: IIssueInfo) {
  const [showEditIssueForm, setShowEditIssueForm] = useState(false);
  const dispatch = useAppDispatch();

  const showEditIssueFormHandler = () => {
    setShowEditIssueForm(true);
    document.body.style.overflow = "hidden";
  };

  const hideEditIssueFormHandler = () => {
    setShowEditIssueForm(false);
    document.body.style.overflow = "unset";
  };

  const deleteIssueHandler = (projId: string, issueId: string) => {
    dispatch(deleteIssue(projId, issueId));
    setCurrentIssueId();
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
          {issue.dueDate.split("T")[0]}
        </CardDescription>
        <CardButtons>
          <Button onClick={showEditIssueFormHandler}>Edit</Button>
          <Button
            onClick={deleteIssueHandler.bind(null, projectId, issue._id)}
          >
            Delete
          </Button>
        </CardButtons>
      </Card>
    </>
  );
}

export default IssueInfo;
