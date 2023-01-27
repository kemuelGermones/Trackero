import { Fragment } from "react";
import { useAppDispatch, useAppSelector } from "../../store";
import { addIssueComment, deleteIssueComment } from "../../store/issue-action";
import useValidation from "../../hooks/useValidation";

import { Card, CardDescription, CardDivider } from "../styles/UI/Card";
import {
  CommentAuthor,
  CommentFooter,
  CommentDeleteButton,
} from "../styles/layout/CommentLayout";
import Label from "../styles/UI/Label";
import Form from "../styles/UI/Form";
import TextArea from "../styles/UI/TextArea";
import Button from "../styles/UI/Button";

import { IIssue } from "../../types/interface";

interface IIssueComment {
  projectId: string;
  issueData: IIssue;
}

function IssueComment({ projectId, issueData }: IIssueComment) {
  const dispatch = useAppDispatch();
  const { accessToken, userId } = useAppSelector((state) => state.user);

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
          <CardDescription $hasLimit={false}>{comment.comment}</CardDescription>
          <CommentFooter>
            <CommentAuthor>Posted by: {comment.author.username}</CommentAuthor>
            {comment.author._id === userId ? (
              <CommentDeleteButton
                onClick={deleteIssueCommentHandler.bind(
                  null,
                  issueData._id,
                  comment._id
                )}
              />
            ) : null}
          </CommentFooter>
          <CardDivider />
        </Fragment>
      ))}
    </Card>
  );
}

export default IssueComment;
