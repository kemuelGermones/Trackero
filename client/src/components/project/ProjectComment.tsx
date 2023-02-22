import { Fragment } from "react";

import useValidation from "../../hooks/useValidation";
import { useAppDispatch, useAppSelector } from "../../store";
import {
  addProjectCommentRequest,
  deleteProjectCommentRequest,
} from "../../store/project-action";
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

interface IProjectComment {
  projectId: string;
  projectComments: IComment[];
}

function ProjectComment({ projectId, projectComments }: IProjectComment) {
  const dispatch = useAppDispatch();
  const { userId, userRole } = useAppSelector((state) => state.user);

  const {
    value: comment,
    valueError: commentError,
    onChangeValueHandler: commentChange,
    onResetValueHandler: commentReset,
    validateValue: validateComment,
  } = useValidation((str) => str.trim().length > 0, "");

  const deleteProjectCommentRequestHandler = (commentId: string) => {
    dispatch(deleteProjectCommentRequest(projectId, commentId));
  };

  const onChangeCommentHandler = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    commentChange(event.target.value);
  };

  const onSubmitComment = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const commentIsValid = validateComment();
    if (commentIsValid) {
      dispatch(addProjectCommentRequest(comment, projectId));
      commentReset("");
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
        <CardFooter $templateColumns="1fr">
          <Button>Submit</Button>
        </CardFooter>
      </Form>
      <Label>{projectComments.length === 0 ? "No Comments" : "Comments"}</Label>
      {projectComments.map((comment) => (
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
                onClick={deleteProjectCommentRequestHandler.bind(
                  null,
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
