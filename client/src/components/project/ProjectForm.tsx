import { Fragment, useEffect } from "react";
import ReactDOM from "react-dom";

import useValidation from "../../hooks/useValidation";
import { useAppDispatch } from "../../store";
import { useAppSelector } from "../../store";
import {
  addProjectRequest,
  editProjectRequest,
} from "../../store/project-action";
import { IProject, IUser } from "../../types/interface";
import Backdrop from "../styles/UI/Backdrop";
import { Button } from "../styles/UI/Button";
import {
  Card,
  CardDivider,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../styles/UI/Card";
import { Checkbox, Form, Input, Label, TextArea } from "../styles/UI/Form";
import { PositionCenter } from "../styles/utils/PositionCenter";

interface IProjectForm {
  hideForm: () => void;
  initialValues?: IProject;
}

function ProjectForm({ hideForm, initialValues }: IProjectForm) {
  const dispatch = useAppDispatch();
  const users = useAppSelector((state) => state.userList.usersData);

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

  const {
    value: assignees,
    valueError: assigneesError,
    onChangeValueHandler: assigneesChange,
    validateValue: validateAssignees,
  } = useValidation<IUser[]>(
    (arr) => arr.length > 0,
    initialValues ? initialValues.assignees : []
  );

  const onChangeTitleHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    titleChange(event.target.value);
  };

  const onChangeDescriptionHandler = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    descriptionChange(event.target.value);
  };

  const onChangeAssigneesHandler = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const user: IUser = JSON.parse(event.target.value);
    if (event.target.checked) {
      assigneesChange([...assignees, user]);
    } else {
      assigneesChange(
        assignees.filter((assignee) => assignee._id !== user._id)
      );
    }
  };

  const onSubmitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const titleIsValid = validateTitle();
    const descriptionIsValid = validateDescription();
    const assigneesIsValid = validateAssignees();
    if (
      titleIsValid &&
      descriptionIsValid &&
      assigneesIsValid &&
      !initialValues
    ) {
      dispatch(addProjectRequest({ title, description, assignees }));
      hideForm();
    }
    if (
      titleIsValid &&
      descriptionIsValid &&
      assigneesIsValid &&
      initialValues
    ) {
      dispatch(
        editProjectRequest({ title, description, assignees }, initialValues._id)
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
            {users ? (
              <>
                <Label>Assign Users</Label>
                <Checkbox $isInvalid={assigneesError}>
                  {users.map((user) => (
                    <Fragment key={user._id}>
                      <input
                        type="checkbox"
                        value={JSON.stringify(user)}
                        checked={
                          !!assignees.find(
                            (assignee) => assignee._id === user._id
                          )
                        }
                        onChange={onChangeAssigneesHandler}
                      />
                      &nbsp;
                      {user.username}
                      <br />
                    </Fragment>
                  ))}
                </Checkbox>
              </>
            ) : null}
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

export default ProjectForm;
