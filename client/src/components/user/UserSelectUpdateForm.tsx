import useValidation from "../../hooks/useValidation";
import { useAppDispatch, useAppSelector } from "../../store";
import { updateUserRole } from "../../store/user-action";

import { Button } from "../styles/UI/Button";
import { Form, Label, Select } from "../styles/UI/Form";

import { IUser } from "../../types/interface";

interface IUserSelectUpdateForm {
  userData: IUser;
}

function UserSelectUpdateForm({ userData }: IUserSelectUpdateForm) {
  const dispatch = useAppDispatch();
  const accessToken = useAppSelector((state) => state.user.accessToken);

  const { value, onChangeValueHandler } =
    useValidation(null, userData.role);

  const onChangeHandler = (event: React.ChangeEvent<HTMLSelectElement>) => {
    onChangeValueHandler(event.target.value);
  };

  const onSubmitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (accessToken) {
      dispatch(updateUserRole(value, userData._id, accessToken));
    }
  };

  return ( 
    <Form onSubmit={onSubmitHandler}>
      <Label htmlFor="role">Change Role</Label>
      <Select id="role" onChange={onChangeHandler} value={value}>
        <option value="Developer">Developer</option>
        <option value="Administrator">Administrator</option>
      </Select>
      <Button>Change</Button>
    </Form>
  );
}

export default UserSelectUpdateForm;
