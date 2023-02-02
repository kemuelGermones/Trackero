import {
  TableContainer,
  TableSubHead,
  Table,
  TableHeader,
  TableBody,
  TablePagination,
} from "../styles/UI/Table";

function UserTable() {
  return (
    <TableContainer>
      <TableSubHead />
      <Table>
        <TableHeader>
          <tr>
            <th>Username</th>
            <th>Email</th>
            <th>Role</th>
          </tr>
        </TableHeader>
        <TableBody>
          <tr>
            <td>ironman</td>
            <td>ironman@gmail.com</td>
            <td>Administrator</td>
          </tr>
          <tr>
            <td>ironman</td>
            <td>ironman@gmail.com</td>
            <td>Administrator</td>
          </tr>
          <tr>
            <td>ironman</td>
            <td>ironman@gmail.com</td>
            <td>Administrator</td>
          </tr>
          <tr>
            <td>ironman</td>
            <td>ironman@gmail.com</td>
            <td>Administrator</td>
          </tr>
        </TableBody>
      </Table>
      <TablePagination />
    </TableContainer>
  );
}

export default UserTable;
