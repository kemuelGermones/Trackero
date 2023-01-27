import { useState, useMemo } from "react";
import { useAppDispatch, useAppSelector } from "../../store";
import { updateIssueAssignedTo } from "../../store/issue-action";

import {
  TableContainer,
  TableSubHead,
  Table,
  TableHeader,
  TableBody,
  TablePagination,
} from "../styles/UI/Table";
import { PositionCenter } from "../styles/utils/PositionCenter";
import Backdrop from "../styles/UI/Backdrop";
import { SmallButton, PaginationButton } from "../styles/UI/Button";

import { IUser } from "../../types/interface";

interface IIssueAssignForm {
  users: IUser[];
  initialAssignedUsers: IUser[];
  issueId: string;
  projectId: string;
  hideForm: () => void;
}

function IssueAssignForm({
  users,
  initialAssignedUsers,
  issueId,
  projectId,
  hideForm,
}: IIssueAssignForm) {
  const dispatch = useAppDispatch();
  const accessToken = useAppSelector((state) => state.user.accessToken);
  const [selectedMembers, setSelectedMembers] = useState(initialAssignedUsers);
  const [currentTablePage, setCurrentTablePage] = useState(1);

  const currentUsers = useMemo(() => {
    const lastIssuetIndex = currentTablePage * 5;
    const firstIssueIndex = lastIssuetIndex - 5;
    return users.slice(firstIssueIndex, lastIssuetIndex);
  }, [currentTablePage, users]);

  const pages = useMemo(() => {
    const pages: number[] = [];
    for (let i = 1; i <= Math.ceil(users.length / 5); i++) {
      pages.push(i);
    }
    return pages;
  }, [users]);

  const changeTablePageHandler = (page: number) => {
    setCurrentTablePage(page);
  };

  const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const userData: IUser = JSON.parse(event.target.value);
    const isChecked =
      selectedMembers.findIndex((member) => member._id === userData._id) !== -1;
    if (isChecked) {
      setSelectedMembers((state) =>
        state.filter((member) => member._id !== userData._id)
      );
    } else {
      setSelectedMembers((state) => [...state, userData]);
    }
  };

  const onSubmitSelectedUsers = () => {
    if (accessToken) {
      dispatch(
        updateIssueAssignedTo(selectedMembers, projectId, issueId, accessToken)
      );
    }
    hideForm();
  };

  return (
    <>
      <Backdrop onClick={hideForm} />
      <PositionCenter>
        <TableContainer>
          <TableSubHead>
            <SmallButton onClick={onSubmitSelectedUsers}>Assign</SmallButton>
          </TableSubHead>
          <Table>
            <TableHeader>
              <tr>
                <th>Username</th>
                <th>Role</th>
                <th>Select</th>
              </tr>
            </TableHeader>
            <TableBody>
              {currentUsers.map((user) => (
                <tr key={user._id}>
                  <td>{user.username}</td>
                  <td>{user.role}</td>
                  <td>
                    <input
                      type="checkbox"
                      value={JSON.stringify(user)}
                      checked={
                        selectedMembers.findIndex(
                          (member) => member._id === user._id
                        ) !== -1
                      }
                      onChange={onChangeHandler}
                    />
                  </td>
                </tr>
              ))}
            </TableBody>
          </Table>
          <TablePagination>
            {pages.map((page, index) => (
              <PaginationButton
                key={index}
                onClick={changeTablePageHandler.bind(null, page)}
                $isActive={page === currentTablePage}
              >
                {page}
              </PaginationButton>
            ))}
          </TablePagination>
        </TableContainer>
      </PositionCenter>
    </>
  );
}

export default IssueAssignForm;
