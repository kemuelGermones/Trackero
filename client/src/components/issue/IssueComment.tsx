import { Fragment } from "react";
import { useAppDispatch } from "../../store";
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
import { IComment } from "../../types/interface";
import useValidation from "../../hooks/useValidation";
import { addIssueComment, deleteIssueComment} from "../../store/issue-action";

interface IIssueComment {
  projectId: string;
  issueId: string;
  comments: IComment[];
}

function IssueComment({ projectId, issueId, comments }: IIssueComment) {
  const dispatch = useAppDispatch();

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
      dispatch(addIssueComment(issueId, comment));
      commentReset();
    }
  };

  const deleteIssueCommentHandler = (issueId: string, commentId: string) => {
    dispatch(deleteIssueComment(projectId, issueId, commentId));
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
      <Label>{comments.length === 0 ? "No comments" : "Comments"}</Label>
      {comments.map((comment) => (
        <Fragment key={comment._id}>
          <CardDescription>{comment.comment}</CardDescription>
          <CommentFooter>
            <CommentAuthor>Posted by: Ironman</CommentAuthor>
            <CommentDeleteButton
              onClick={deleteIssueCommentHandler.bind(
                null,
                issueId,
                comment._id
              )}
            />
          </CommentFooter>
          <CardDivider />
        </Fragment>
      ))}
    </Card>
  );
}

export default IssueComment;
