import { Fragment } from "react";

import useValidation from "../../hooks/useValidation";
import { useAppDispatch, useAppSelector } from "../../store";
import {
  addIssueCommentRequest,
  deleteIssueCommentRequest,
} from "../../store/issue-action";
import { IComment } from "../../types/interface";
import { Button, TrashButton } from "../styles/UI/Button";
import {
  Card,
  CardBody,
  CardDivider,
  CardFooter,
  CardHeader,
} from "../styles/UI/Card";
import { Form, Label, TextArea } from "../styles/UI/Form";
import TextLight from "../styles/utils/TextLight";

interface IIssueComment {
  projectId: string;
  issueId: string;
  issueComments: IComment[];
}

function IssueComment({ projectId, issueId, issueComments }: IIssueComment) {
  const dispatch = useAppDispatch();
  const { userId, userRole } = useAppSelector((state) => state.user);

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
    if (commentIsValid) {
      dispatch(addIssueCommentRequest(comment, issueId));
      commentReset("");
    }
  };

  const deleteIssueCommentRequestHandler = (commentId: string) => {
    dispatch(deleteIssueCommentRequest(projectId, issueId, commentId));
  };

  return (
    <Card>
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
          <CardBody>{comment.comment}</CardBody>
          <CardHeader>
            <div>
              <TextLight>Posted by: </TextLight>
              {comment.author.username}
            </div>
            {comment.author._id === userId || userRole === "Administrator" ? (
              <TrashButton
                onClick={deleteIssueCommentRequestHandler.bind(
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

export default IssueComment;
