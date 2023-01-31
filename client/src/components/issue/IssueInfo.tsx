import { useState } from "react";
import { BsPen, BsPlusLg } from "react-icons/bs";
import { useAppDispatch, useAppSelector } from "../../store";
import { deleteIssue } from "../../store/issue-action";

import {
  Card,
  CardTitle,
  CardDescription,
  CardFooter,
  CardHeader,
  CardBody,
} from "../styles/UI/Card";
import { Button, SmallButton } from "../styles/UI/Button";
import IssueForm from "./IssueForm";
import TextLight from "../styles/utils/TextLight";
import IssueStatusForm from "./IssueStatusForm";
import IssueAssignForm from "./IssueAssignForm";

import { IIssue } from "../../types/interface";

interface IIssueInfo {
  projectId: string;
  issueData: IIssue;
}

function IssueInfo({ projectId, issueData }: IIssueInfo) {
  const [showEditIssueForm, setShowEditIssueForm] = useState(false);
  const [showStatusForm, setShowStatusForm] = useState(false);
  const [showAssignForm, setShowAssignForm] = useState(false);
  const dispatch = useAppDispatch();
  const { accessToken, userId, userRole } = useAppSelector(
    (state) => state.user
  );
  const userList = useAppSelector((state) => state.userList.usersData);

  const showEditIssueFormHandler = () => {
    setShowEditIssueForm(true);
    document.body.style.overflow = "hidden";
  };

  const hideEditIssueFormHandler = () => {
    setShowEditIssueForm(false);
    document.body.style.overflow = "unset";
  };

  const showStatusIssueFormHandler = () => {
    setShowStatusForm(true);
    document.body.style.overflow = "hidden";
  };

  const hideStatusIssueFormHandler = () => {
    setShowStatusForm(false);
    document.body.style.overflow = "unset";
  };

  const showAssignIssueFormHandler = () => {
    setShowAssignForm(true);
    document.body.style.overflow = "hidden";
  };

  const hideAssignIssueFormHandler = () => {
    setShowAssignForm(false);
    document.body.style.overflow = "unset";
  };

  const deleteIssueHandler = (projId: string, issueId: string) => {
    if (accessToken) {
      dispatch(deleteIssue(projId, issueId, accessToken));
    }
  };

  return (
    <>
      {showEditIssueForm ? (
        <IssueForm
          hideForm={hideEditIssueFormHandler}
          projectId={projectId}
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
      {showAssignForm && userList ? (
        <IssueAssignForm
          hideForm={hideAssignIssueFormHandler}
          users={userList}
          initialAssignedUsers={issueData.assignedTo}
          projectId={projectId}
          issueId={issueData._id}
        />
      ) : null}
      <Card style={{ marginBottom: "1rem" }}>
        <CardHeader>
          <CardTitle>{issueData.title}</CardTitle>
          <div style={{ display: "flex" }}>
            {issueData.author._id === userId || userRole === "Administrator" ? (
              <SmallButton onClick={showAssignIssueFormHandler}>
                <BsPlusLg />
              </SmallButton>
            ) : null}
            {issueData.author._id === userId ||
            userRole === "Administrator" ||
            issueData.assignedTo.findIndex(
              (assignedUser) => assignedUser._id === userId
            ) > -1 ? (
              <SmallButton onClick={showStatusIssueFormHandler}>
                <BsPen />
              </SmallButton>
            ) : null}
          </div>
        </CardHeader>
        <CardBody>
          <CardDescription $hasLimit={false}>
            {issueData.description}
          </CardDescription>
        </CardBody>
        <CardBody>
          <CardDescription $hasLimit={false}>
            <TextLight>Author: </TextLight>
            {issueData.author.username}
          </CardDescription>
        </CardBody>
        <CardBody>
          <CardDescription $hasLimit={false}>
            <TextLight>Assigned to: </TextLight>
            {issueData.assignedTo.length !== 0
              ? issueData.assignedTo.map((user) => user.username).join(", ")
              : "No one"}
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
          <CardFooter>
            <Button onClick={showEditIssueFormHandler}>Edit</Button>
            <Button
              onClick={deleteIssueHandler.bind(null, projectId, issueData._id)}
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
