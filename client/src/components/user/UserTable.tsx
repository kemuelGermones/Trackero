import { useState, useMemo } from "react";
import filterUsers from "../../lib/filterUsers";

import {
  TableContainer,
  TableSubHead,
  Table,
  TableHeader,
  TableBody,
  TablePagination,
} from "../styles/UI/Table";
import { DropdownButton, PaginationButton } from "../styles/UI/Button";

import { IUser } from "../../types/interface";

interface IUserTable {
  usersData: IUser[];
  setCurrentUser: (user: IUser) => void;
}

function UserTable({ usersData, setCurrentUser }: IUserTable) {
  const [filterCategory, setFilterCategory] = useState("Developer");
  const [currentTablePage, setCurrentTablePage] = useState(1);

  const users = useMemo(() => {
    return filterUsers(usersData, filterCategory);
  }, [usersData, filterCategory]);

  const currentUsers = useMemo(() => {
    const lastUserIndex = currentTablePage * 5;
    const firstUserIndex = lastUserIndex - 5;
    return users.slice(firstUserIndex, lastUserIndex);
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

  const changeFilterCategoryHandler = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setFilterCategory(event.target.value);
  };

  return (
    <TableContainer>
      <TableSubHead>
        <DropdownButton
          onChange={changeFilterCategoryHandler}
          value={filterCategory}
        >
          <option value="Developer">Filter by Developer</option>
          <option value="Administrator">Filter by Administrator</option>
        </DropdownButton>
      </TableSubHead>
      <Table>
        <TableHeader>
          <tr>
            <th>Username</th>
            <th>Email</th>
            <th>Role</th>
          </tr>
        </TableHeader>
        <TableBody>
          {currentUsers.length === 0 ? (
            <tr>
              <td colSpan={4}>No Data</td>
            </tr>
          ) : (
            currentUsers.map((user) => (
              <tr key={user._id} onClick={setCurrentUser.bind(null, user)} >
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
              </tr>
            ))
          )}
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
  );
}

export default UserTable;
