import { Fragment } from "react";
import { useAppDispatch, useAppSelector } from "../../store";
import { addIssueComment, deleteIssueComment } from "../../store/issue-action";
import useValidation from "../../hooks/useValidation";

import {
  Card,
  CardBody,
  CardDescription,
  CardDivider,
  CardHeader,
} from "../styles/UI/Card";
import { Form, TextArea, Label } from "../styles/UI/Form";
import { Button, TrashButton } from "../styles/UI/Button";

import { IIssue } from "../../types/interface";
import TextLight from "../styles/utils/TextLight";

interface IIssueComment {
  projectId: string;
  issueData: IIssue;
}

function IssueComment({ projectId, issueData }: IIssueComment) {
  const dispatch = useAppDispatch();
  const { accessToken, userId, userRole } = useAppSelector(
    (state) => state.user
  );

  const {
    value: comment,
    valueError: commentError,
    onChangeValueHandler: commentChange,
    onResetValueHandler: commentReset,
    validateValue: validateComment,
  } = useValidation((str) => str.trim().length > 0, "");

  const onChangeCommentHandler = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    commentChange(event.target.value);
  };

  const onSubmitComment = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const commentIsValid = validateComment();
    if (commentIsValid && accessToken) {
      dispatch(addIssueComment({ comment }, issueData._id, accessToken));
      commentReset();
    }
  };

  const deleteIssueCommentHandler = (issueId: string, commentId: string) => {
    if (accessToken) {
      dispatch(deleteIssueComment(projectId, issueId, commentId, accessToken));
    }
  };

  return (
    <Card style={{ marginBottom: "1rem" }}>
      <Label>Leave a Comment</Label>
      <Form onSubmit={onSubmitComment}>
        <TextArea
          placeholder="Leave a comment"
          onChange={onChangeCommentHandler}
          $isInvalid={commentError}
          value={comment}
        />
        <Button>Submit</Button>
      </Form>
      <Label>
        {issueData.comments.length === 0 ? "No comments" : "Comments"}
      </Label>
      {issueData.comments.map((comment) => (
        <Fragment key={comment._id}>
          <CardBody>
            <CardDescription $hasLimit={false}>
              {comment.comment}
            </CardDescription>
          </CardBody>
          <CardHeader>
            <CardDescription $hasLimit={false}>
              <TextLight>Posted by: </TextLight> {comment.author.username}
            </CardDescription>
            {comment.author._id === userId || userRole === "Administrator" ? (
              <TrashButton
                onClick={deleteIssueCommentHandler.bind(
                  null,
                  issueData._id,
                  comment._id
                )}
              />
            ) : null}
          </CardHeader>
          <CardDivider />
        </Fragment>
      ))}
    </Card>
  );
}

export default IssueComment;
