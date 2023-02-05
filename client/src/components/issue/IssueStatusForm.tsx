import { useAppDispatch, useAppSelector } from "../../store";
import { updateIssueStatus } from "../../store/issue-action";
import useValidation from "../../hooks/useValidation";

import { Card, CardHeader, CardTitle, CardDivider } from "../styles/UI/Card";
import { Form, Label, Select } from "../styles/UI/Form";
import { PositionCenter } from "../styles/utils/PositionCenter";
import Backdrop from "../styles/UI/Backdrop";
import { Button } from "../styles/UI/Button";

interface IIssueStatusForm {
  hideForm: () => void;
  projectId: string;
  issueStatus: string;
  issueId: string;
}

function IssueStatusForm({
  hideForm,
  projectId,
  issueId,
  issueStatus,
}: IIssueStatusForm) {
  const dispatch = useAppDispatch();
  const accessToken = useAppSelector((state) => state.user.accessToken);

  const { value: status, onChangeValueHandler: statusChange } = useValidation(
    null,
    issueStatus
  );

  const statusChangeHandler = (event: React.ChangeEvent<HTMLSelectElement>) => {
    statusChange(event.target.value);
  };

  const onSubmitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (accessToken) {
      dispatch(updateIssueStatus({ status }, projectId, issueId, accessToken));
    }
    hideForm();
  };

  return (
    <>
      <Backdrop onClick={hideForm} $hasBackground={true} />
      <PositionCenter>
        <Card $width="25rem">
          <CardHeader>
            <CardTitle>Update Status</CardTitle>
          </CardHeader>
          <CardDivider />
          <Form onSubmit={onSubmitHandler}>
            <Label htmlFor="status">Status</Label>
            <Select id="status" value={status} onChange={statusChangeHandler}>
              <option value="Pending">Pending</option>
              <option value="In Progress">In Progress</option>
              <option value="Done">Done</option>
            </Select>
            <Button>Submit</Button>
          </Form>
        </Card>
      </PositionCenter>
    </>
  );
}

export default IssueStatusForm;
