import { Fragment } from "react";
import { useAppDispatch, useAppSelector } from "../../store";
import {
  deleteProjectComment,
  addProjectComment,
} from "../../store/project-action";
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
import TextLight from "../styles/utils/TextLight";

import { IProject } from "../../types/interface";

interface IProjectComment {
  projectData: IProject;
}

function ProjectComment({ projectData }: IProjectComment) {
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

  const deleteProjectCommentRequest = (
    projectId: string,
    commentId: string
  ) => {
    if (accessToken) {
      dispatch(deleteProjectComment(projectId, commentId, accessToken));
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
    if (commentIsValid && accessToken) {
      dispatch(addProjectComment({ comment }, projectData._id, accessToken));
      commentReset();
    }
  };

  return (
    <Card>
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
      <Label>
        {projectData.comments.length === 0 ? "No Comments" : "Comments"}
      </Label>
      {projectData.comments.map((comment) => (
        <Fragment key={comment._id}>
          <CardBody>
            <CardDescription $hasLimit={false}>
              {comment.comment}
            </CardDescription>
          </CardBody>
          <CardHeader>
            <CardDescription $hasLimit={false}>
              <TextLight>Posted by: </TextLight>
              {comment.author.username}
            </CardDescription>
            {comment.author._id === userId || userRole === "Administrator" ? (
              <TrashButton
                onClick={deleteProjectCommentRequest.bind(
                  null,
                  projectData._id,
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

export default ProjectComment;
