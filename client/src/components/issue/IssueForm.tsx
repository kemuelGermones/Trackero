import { useAppDispatch } from "../../store";
import Backdrop from "../styles/UI/Backdrop";
import { PositionCenter } from "../styles/utils/PositionCenter";
import { Card, CardDivider, CardTitle } from "../styles/UI/Card";
import Label from "../styles/UI/Label";
import Input from "../styles/UI/Input";
import Form from "../styles/UI/Form";
import TextArea from "../styles/UI/TextArea";
import Button from "../styles/UI/Button";
import Select from "../styles/UI/Select";
import useValidation from "../../hooks/useValidation";
import { addIssue, editIssue } from "../../store/issue-action";
import { IIssue } from "../../types/interface";

interface IIssueForm {
  projectId: string;
  type: "new" | "edit";
  hideForm: () => void;
  initialValue?: IIssue;
}

function IssueForm({ type, hideForm, projectId, initialValue }: IIssueForm) {
  const dispatch = useAppDispatch();

  const {
    value: title,
    valueError: titleError,
    onChangeValueHandler: titleChange,
    validateValue: validateTitle,
  } = useValidation(
    (str) => str.trim().length > 0,
    type === "edit" && !!initialValue ? initialValue.title : ""
  );

  const {
    value: description,
    valueError: descriptionError,
    onChangeValueHandler: descriptionChange,
    validateValue: validateDescription,
  } = useValidation(
    (str) => str.trim().length > 0,
    type === "edit" && !!initialValue ? initialValue.description : ""
  );

  const { value: importance, onChangeValueHandler: importanceChange } =
    useValidation(
      null,
      type === "edit" && !!initialValue ? initialValue.importance : "high"
    );

  const { value: status, onChangeValueHandler: statusChange } = useValidation(
    null,
    type === "edit" && !!initialValue ? initialValue.status : "pending"
  );

  const {
    value: dueDate,
    valueError: dueDateError,
    onChangeValueHandler: dueDateChange,
    validateValue: validateDueDate,
  } = useValidation(
    type === "new"
      ? (str) => new Date(str).getTime() > new Date().getTime()
      : (str) => str.trim().length > 0,
    type === "edit" && !!initialValue ? initialValue.dueDate.split("T")[0] : ""
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

  const onChangeStatusHandler = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    statusChange(event.target.value);
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
      type === "new"
    ) {
      dispatch(
        addIssue(projectId, { title, description, importance, status, dueDate })
      );
      hideForm();
    }
    if (
      titleIsValid &&
      descriptionIsValid &&
      dueDateIsValid &&
      type === "edit" &&
      !!initialValue
    ) {
      dispatch(
        editIssue({
          projectId,
          issueId: initialValue._id,
          title,
          description,
          importance,
          status,
          dueDate,
        })
      );
      hideForm();
    }
  };

  return (
    <>
      <Backdrop onClick={hideForm} />
      <PositionCenter>
        <Card>
          {type === "new" ? (
            <CardTitle>New Issue</CardTitle>
          ) : (
            <CardTitle>Edit Issue</CardTitle>
          )}
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
              <option value="high">High</option>
              <option value="mid">Mid</option>
              <option value="low">Low</option>
            </Select>
            {type === "edit" && (
              <>
                <Label htmlFor="status">Status</Label>
                <Select
                  id="status"
                  onChange={onChangeStatusHandler}
                  value={status}
                >
                  <option value="pending">Pending</option>
                  <option value="done">Done</option>
                </Select>
              </>
            )}
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
