import useValidation from "../../hooks/useValidation";
import { useAppDispatch } from "../../store";
import { addProject, editProject } from "../../store/project-action";
import { useAppSelector } from "../../store";

import { Form, Label, Input, TextArea } from "../styles/UI/Form";
import { Card, CardTitle, CardDivider, CardHeader } from "../styles/UI/Card";
import { PositionCenter } from "../styles/utils/PositionCenter";
import { Button } from "../styles/UI/Button";
import Backdrop from "../styles/UI/Backdrop";


import { IProject } from "../../types/interface";

interface IProjectForm {
  hideForm: () => void;
  initialValues?: IProject;
}

function ProjectForm({ hideForm, initialValues }: IProjectForm) {
  const dispatch = useAppDispatch();
  const accessToken = useAppSelector((state) => state.user.accessToken);

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
    if (titleIsValid && descriptionIsValid && !initialValues && accessToken) {
      dispatch(addProject({ title, description }, accessToken));
      hideForm();
    }
    if (titleIsValid && descriptionIsValid && initialValues && accessToken) {
      dispatch(
        editProject({ title, description }, initialValues._id, accessToken)
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
            {initialValues ? (
              <CardTitle>Edit Project</CardTitle>
            ) : (
              <CardTitle>Add Project</CardTitle>
            )}
          </CardHeader>
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
