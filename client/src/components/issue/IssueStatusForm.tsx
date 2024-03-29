import { useEffect } from "react";
import ReactDOM from "react-dom";

import useValidation from "../../hooks/useValidation";
import { useAppDispatch } from "../../store";
import { updateIssueStatusRequest } from "../../store/issue-action";
import Backdrop from "../styles/UI/Backdrop";
import { Button } from "../styles/UI/Button";
import {
  Card,
  CardDivider,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../styles/UI/Card";
import { Form, Label, Select } from "../styles/UI/Form";
import { PositionCenter } from "../styles/utils/PositionCenter";

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

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  const { value: status, onChangeValueHandler: statusChange } = useValidation(
    null,
    issueStatus
  );

  const statusChangeHandler = (event: React.ChangeEvent<HTMLSelectElement>) => {
    statusChange(event.target.value);
  };

  const onSubmitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch(updateIssueStatusRequest(status, projectId, issueId));
    hideForm();
  };

  return ReactDOM.createPortal(
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

export default IssueStatusForm;
