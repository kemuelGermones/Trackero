import { Fragment } from "react";

import useValidation from "../../hooks/useValidation";
import { useAppDispatch, useAppSelector } from "../../store";
import { addIssueComment, deleteIssueComment } from "../../store/issue-action";
import { IComment } from "../../types/interface";
import { Button, TrashButton } from "../styles/UI/Button";
import {
  Card,
  CardBody,
  CardDescription,
  CardDivider,
  CardFooter,
  CardHeader,
} from "../styles/UI/Card";
import { Form, Label, TextArea } from "../styles/UI/Form";
import TextLight from "../styles/utils/TextLight";

interface IIssueComment {
  issueId: string;
  issueComments: IComment[];
}

function IssueComment({ issueId, issueComments }: IIssueComment) {
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
      dispatch(addIssueComment({ comment }, issueId, accessToken));
      commentReset("");
    }
  };

  const deleteIssueCommentHandler = (commentId: string) => {
    if (accessToken) {
      dispatch(deleteIssueComment(issueId, commentId, accessToken));
    }
  };

  return (
    <Card style={{ marginBottom: "1rem" }}>
      <Label>Leave a Comment</Label>
      <Form onSubmit={onSubmitComment}>
        <TextArea
          placeholder="Leave a Comment"
          onChange={onChangeCommentHandler}
          $isInvalid={commentError}
          value={comment}
        />
        <CardFooter $templateColumns="1fr">
          <Button>Submit</Button>
        </CardFooter>
      </Form>
      <Label>{issueComments.length === 0 ? "No Comments" : "Comments"}</Label>
      {issueComments.map((comment) => (
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
                onClick={deleteIssueCommentHandler.bind(null, comment._id)}
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
