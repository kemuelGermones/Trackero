import { Fragment } from "react";
import { useAppDispatch, useAppSelector } from "../../store";
import {
  deleteProjectComment,
  addProjectComment,
} from "../../store/project-action";
import useValidation from "../../hooks/useValidation";

import { Card, CardDescription, CardDivider } from "../styles/UI/Card";
import {
  CommentAuthor,
  CommentFooter,
  CommentDeleteButton,
} from "../styles/layout/CommentLayout";
import Form from "../styles/UI/Form";
import Button from "../styles/UI/Button";
import TextArea from "../styles/UI/TextArea";
import Label from "../styles/UI/Label";

import { IComment } from "../../types/interface";

interface IProjectComment {
  projectId: string;
  comments: IComment[];
}

function ProjectComment({ projectId, comments }: IProjectComment) {
  const dispatch = useAppDispatch();
  const { accessToken, userId } = useAppSelector((state) => state.user);
  const {
    value: comment,
    valueError: commentError,
    onChangeValueHandler: commentChange,
    onResetValueHandler: commentReset,
    validateValue: validateComment,
  } = useValidation((str) => str.trim().length > 0, "");

  const deleteProjectCommentRequest = (
    projectId: string,
    commentId: string
  ) => {
    if (!!accessToken && !!userId) {
      dispatch(deleteProjectComment(projectId, commentId, userId, accessToken));
    }
  };

  const onChangeCommentHandler = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    commentChange(event.target.value);
  };

  const onSubmitComment = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const commentIsValid = validateComment();
    if (commentIsValid && !!accessToken && !!userId) {
      dispatch(
        addProjectComment({ comment, author: userId }, projectId, accessToken)
      );
      commentReset();
    }
  };

  return (
    <Card style={{ marginBottom: "1rem" }}>
      <Form onSubmit={onSubmitComment}>
        <Label htmlFor="comment">Leave a Comment</Label>
        <TextArea
          id="comment"
          placeholder="Leave a comment"
          onChange={onChangeCommentHandler}
          value={comment}
          $isInvalid={commentError}
        />
        <Button>Submit</Button>
      </Form>
      <Label>{comments.length === 0 ? "No comments" : "Comments"}</Label>
      {comments.map((comment) => (
        <Fragment key={comment._id}>
          <CardDescription>{comment.comment}</CardDescription>
          <CommentFooter>
            <CommentAuthor>Posted by: {comment.author.username}</CommentAuthor>
            {comment.author._id === userId ? (
              <CommentDeleteButton
                onClick={deleteProjectCommentRequest.bind(
                  null,
                  projectId,
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

export default ProjectComment;
