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
import { SmallButton } from "../styles/UI/Button";

interface IUserAssignForm {
  hideForm: () => void;
}

function UserAssignForm({ hideForm }: IUserAssignForm) {
  return (
    <>
      <Backdrop onClick={hideForm} />
      <PositionCenter>
        <TableContainer>
          <TableSubHead>
            <SmallButton>Assign</SmallButton>
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
              <tr>
                <td>Ironman</td>
                <td>Developer</td>
                <td>
                  <input type="checkbox" />
                </td>
              </tr>
              <tr>
                <td>Ironman</td>
                <td>Developer</td>
                <td>
                  <input type="checkbox" />
                </td>
              </tr>
              <tr>
                <td>Ironman</td>
                <td>Developer</td>
                <td>
                  <input type="checkbox" />
                </td>
              </tr>
              <tr>
                <td>Ironman</td>
                <td>Developer</td>
                <td>
                  <input type="checkbox" />
                </td>
              </tr>
              <tr>
                <td>Ironman</td>
                <td>Developer</td>
                <td>
                  <input type="checkbox" />
                </td>
              </tr>
            </TableBody>
          </Table>
          <TablePagination>
            {/* {pages.map((page, index) => (
            <PaginationButton
              key={index}
              onClick={changeTablePageHandler.bind(null, page)}
              $isActive={page === currentTablePage}
            >
              {page}
            </PaginationButton>
          ))} */}
          </TablePagination>
        </TableContainer>
      </PositionCenter>
    </>
  );
}

export default UserAssignForm;
