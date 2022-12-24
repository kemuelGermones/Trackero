import { Fragment } from "react";
import { useAppDispatch } from "../../store";
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
import useValidation from "../../hooks/useValidation";
import { deleteProjectComment, addProjectComment } from "../../store/project-action";

interface IProjectComment {
  projectId: string;
  comments: IComment[];
}

function ProjectComment({ projectId, comments }: IProjectComment) {
  const dispatch = useAppDispatch();
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
    dispatch(deleteProjectComment(projectId, commentId));
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
      dispatch(addProjectComment(projectId, comment));
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
      <Label>Comments</Label>
      {comments.map((comment) => (
        <Fragment key={comment._id}>
          <CardDescription>{comment.comment}</CardDescription>
          <CommentFooter>
            <CommentAuthor>Posted by: Ironman</CommentAuthor>
            <CommentDeleteButton
              onClick={deleteProjectCommentRequest.bind(
                null,
                projectId,
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

export default ProjectComment;
