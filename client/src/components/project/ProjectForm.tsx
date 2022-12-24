import Backdrop from "../styles/UI/Backdrop";
import Form from "../styles/UI/Form";
import Label from "../styles/UI/Label";
import Input from "../styles/UI/Input";
import TextArea from "../styles/UI/TextArea";
import { Card, CardTitle, CardDivider } from "../styles/UI/Card";
import Button from "../styles/UI/Button";
import { PositionCenter } from "../styles/utils/PositionCenter";
import useValidation from "../../hooks/useValidation";
import { useAppDispatch } from "../../store";
import { addProject, editProject } from "../../store/project-action";

interface IProjecForm {
  type: "new" | "edit";
  hideForm: () => void;
  initialTitle?: string;
  initialDescription?: string;
  projectId?: string;
}

function ProjectForm({
  type,
  hideForm,
  initialTitle,
  initialDescription,
  projectId,
}: IProjecForm) {
  const dispatch = useAppDispatch();

  const {
    value: title,
    valueError: titleError,
    onChangeValueHandler: titleChange,
    validateValue: validateTitle,
  } = useValidation(
    (str) => str.trim().length > 0,
    !!initialTitle ? initialTitle : ""
  );

  const {
    value: description,
    valueError: descriptionError,
    onChangeValueHandler: descriptionChange,
    validateValue: validateDescription,
  } = useValidation(
    (str) => str.trim().length > 0,
    !!initialDescription ? initialDescription : ""
  );

  const onChangeTitleHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    titleChange(event.target.value);
  };

  const onChangeDescriptionHandler = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    descriptionChange(event.target.value);
  };

  const onSubmitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const titleIsValid = validateTitle();
    const descriptionIsValid = validateDescription();
    if (titleIsValid && descriptionIsValid && type === "new") {
      dispatch(addProject({ title, description }));
      hideForm();
    }
    if (titleIsValid && descriptionIsValid && type === "edit" && !!projectId) {
      dispatch(editProject({ title, description, id: projectId }));
      hideForm();
    }
  };

  return (
    <>
      <Backdrop onClick={hideForm} />
      <PositionCenter>
        <Card>
          {type === "edit" ? (
            <CardTitle>Edit Project</CardTitle>
          ) : (
            <CardTitle>Add Project</CardTitle>
          )}
          <CardDivider />
          <Form onSubmit={onSubmitHandler}>
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              placeholder="Title"
              type="text"
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
            <Button>Submit</Button>
          </Form>
        </Card>
      </PositionCenter>
    </>
  );
}

export default ProjectForm;
