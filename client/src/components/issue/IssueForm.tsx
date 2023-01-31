import { useAppDispatch, useAppSelector } from "../../store";
import { addIssue, editIssue } from "../../store/issue-action";
import useValidation from "../../hooks/useValidation";

import { PositionCenter } from "../styles/utils/PositionCenter";
import { Card, CardDivider, CardHeader, CardTitle } from "../styles/UI/Card";
import { Form, Label, Input, TextArea, Select } from "../styles/UI/Form";
import Backdrop from "../styles/UI/Backdrop";
import { Button } from "../styles/UI/Button";

import { IIssue } from "../../types/interface";

interface IIssueForm {
  projectId: string;
  hideForm: () => void;
  initialValues?: IIssue;
}

function IssueForm({ hideForm, projectId, initialValues }: IIssueForm) {
  const dispatch = useAppDispatch();
  const { accessToken } = useAppSelector((state) => state.user);

  const {
    value: title,
    valueError: titleError,
    onChangeValueHandler: titleChange,
    validateValue: validateTitle,
  } = useValidation(
    (str) => str.trim().length > 0,
    initialValues ? initialValues.title : ""
  );

  const {
    value: description,
    valueError: descriptionError,
    onChangeValueHandler: descriptionChange,
    validateValue: validateDescription,
  } = useValidation(
    (str) => str.trim().length > 0,
    initialValues ? initialValues.description : ""
  );

  const { value: importance, onChangeValueHandler: importanceChange } =
    useValidation(null, initialValues ? initialValues.importance : "High");

  const {
    value: dueDate,
    valueError: dueDateError,
    onChangeValueHandler: dueDateChange,
    validateValue: validateDueDate,
  } = useValidation(
    (str) => new Date(str).getTime() > new Date().getTime(),
    initialValues ? initialValues.dueDate.split("T")[0] : ""
  );

  const onChangeTitleHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    titleChange(event.target.value);
  };

  const onChangeDescriptionHandler = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    descriptionChange(event.target.value);
  };

  const onChangeImportanceHandler = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    importanceChange(event.target.value);
  };

  const onChangeDueDateHandler = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    dueDateChange(event.target.value);
  };

  const onSubmitIssueForm = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const titleIsValid = validateTitle();
    const descriptionIsValid = validateDescription();
    const dueDateIsValid = validateDueDate();
    if (
      titleIsValid &&
      descriptionIsValid &&
      dueDateIsValid &&
      !initialValues &&
      accessToken
    ) {
      dispatch(
        addIssue(
          {
            title,
            description,
            importance,
            dueDate,
          },
          projectId,
          accessToken
        )
      );
      hideForm();
    }
    if (
      titleIsValid &&
      descriptionIsValid &&
      dueDateIsValid &&
      initialValues &&
      accessToken
    ) {
      dispatch(
        editIssue(
          {
            title,
            description,
            importance,
            dueDate,
          },
          projectId,
          initialValues._id,
          accessToken
        )
      );
      hideForm();
    }
  };

  return (
    <>
      <Backdrop onClick={hideForm} />
      <PositionCenter>
        <Card $width="25rem">
          <CardHeader>
            {!initialValues ? (
              <CardTitle>New Issue</CardTitle>
            ) : (
              <CardTitle>Edit Issue</CardTitle>
            )}
          </CardHeader>
          <CardDivider />
          <Form onSubmit={onSubmitIssueForm}>
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              placeholder="Title"
              onChange={onChangeTitleHandler}
              value={title}
              $isInvalid={titleError}
            />
            <Label htmlFor="description">Description</Label>
            <TextArea
              id="description"
              placeholder="Description"
              onChange={onChangeDescriptionHandler}
              value={description}
              $isInvalid={descriptionError}
            />
            <Label htmlFor="importance">Importance</Label>
            <Select
              id="importance"
              onChange={onChangeImportanceHandler}
              value={importance}
            >
              <option value="High">High</option>
              <option value="Mid">Mid</option>
              <option value="Low">Low</option>
            </Select>
            <Label htmlFor="dueDate">Due Date</Label>
            <Input
              id="dueDate"
              type="date"
              onChange={onChangeDueDateHandler}
              value={dueDate}
              $isInvalid={dueDateError}
            />
            <Button>Submit</Button>
          </Form>
        </Card>
      </PositionCenter>
    </>
  );
}

export default IssueForm;
