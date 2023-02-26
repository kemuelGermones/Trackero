import { useEffect } from "react";
import ReactDOM from "react-dom";

import useValidation from "../../hooks/useValidation";
import { useAppDispatch } from "../../store";
import { addIssueRequest, editIssueRequest } from "../../store/issue-action";
import { IIssue, IUser } from "../../types/interface";
import Backdrop from "../styles/UI/Backdrop";
import { Button } from "../styles/UI/Button";
import {
  Card,
  CardDivider,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../styles/UI/Card";
import { Form, Input, Label, Select, TextArea } from "../styles/UI/Form";
import { PositionCenter } from "../styles/utils/PositionCenter";

interface IIssueForm {
  projectId: string;
  projectAssignees: IUser[];
  hideForm: () => void;
  initialValues?: IIssue;
}

function IssueForm({
  projectId,
  projectAssignees,
  hideForm,
  initialValues,
}: IIssueForm) {
  const dispatch = useAppDispatch();

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

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

  const { value: assignedTo, onChangeValueHandler: assignedToChange } =
    useValidation(
      null,
      initialValues ? initialValues.assignedTo : projectAssignees[0]
    );

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

  const onChangeAssignedToHandler = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const user: IUser = JSON.parse(event.target.value);
    assignedToChange(user);
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
      !initialValues
    ) {
      dispatch(
        addIssueRequest(
          {
            title,
            description,
            assignedTo,
            importance,
            dueDate,
          },
          projectId
        )
      );
      hideForm();
    }
    if (titleIsValid && descriptionIsValid && dueDateIsValid && initialValues) {
      dispatch(
        editIssueRequest(
          {
            title,
            description,
            assignedTo,
            importance,
            dueDate,
          },
          projectId,
          initialValues._id
        )
      );
      hideForm();
    }
  };

  return ReactDOM.createPortal(
    <>
      <Backdrop onClick={hideForm} $hasBackground={true} />
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
            <Label htmlFor="assignedTo">Assign To</Label>
            <Select
              id="assignedTo"
              onChange={onChangeAssignedToHandler}
              value={JSON.stringify(assignedTo)}
            >
              {projectAssignees.map((user) => (
                <option value={JSON.stringify(user)} key={user._id}>
                  {user.username}
                </option>
              ))}
            </Select>
            <Label htmlFor="dueDate">Due Date</Label>
            <Input
              id="dueDate"
              type="date"
              onChange={onChangeDueDateHandler}
              value={dueDate}
              $isInvalid={dueDateError}
            />
            <CardFooter $templateColumns="1fr">
              <Button>Submit</Button>
            </CardFooter>
          </Form>
        </Card>
      </PositionCenter>
    </>,
    document.getElementById("modal-root")!
  );
}

export default IssueForm;
