import { useEffect, useMemo, useState } from "react";

import sortAndFilterIssues from "../../lib/sortAndFilterIssues";
import { IIssue } from "../../types/interface";
import { DropdownButton, PaginationButton } from "../styles/UI/Button";
import {
  Table,
  TableBody,
  TableContainer,
  TableHeader,
  TablePagination,
  TableSubHead,
} from "../styles/UI/Table";

interface IIssueTable {
  issuesData: IIssue[];
  issuesPerTable: number;
  setCurrentIssue: (issue: IIssue) => void;
}

function IssueTable({
  issuesData,
  setCurrentIssue,
  issuesPerTable,
}: IIssueTable) {
  const [sortCategory, setSortCategory] = useState("Importance");
  const [currentTablePage, setCurrentTablePage] = useState(1);

  const issues = useMemo(() => {
    return sortAndFilterIssues(issuesData, sortCategory);
  }, [issuesData, sortCategory]);

  const currentIssues = useMemo(() => {
    const lastIssuetIndex = currentTablePage * issuesPerTable;
    const firstIssueIndex = lastIssuetIndex - issuesPerTable;
    return issues.slice(firstIssueIndex, lastIssuetIndex);
  }, [currentTablePage, issues]);

  const pages = useMemo(() => {
    const pages: number[] = [];
    for (let i = 1; i <= Math.ceil(issues.length / issuesPerTable); i++) {
      pages.push(i);
    }
    return pages;
  }, [issues, issuesPerTable]);

  useEffect(() => {
    if (currentIssues.length === 0 && currentTablePage > 1) {
      setCurrentTablePage((state) => state - 1);
    }
  }, [currentIssues]);

  const changeTablePageHandler = (page: number) => {
    setCurrentTablePage(page);
  };

  const changeSortCategoryHandler = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSortCategory(event.target.value);
    setCurrentTablePage(1);
  };

  return (
    <TableContainer>
      <TableSubHead>
        <DropdownButton onChange={changeSortCategoryHandler}>
          <option value="Importance">Sort by Importance</option>
          <option value="Status">Sort by Status</option>
          <option value="Due Date">Sort by Due Date</option>
          <option value="Your Issues">Filter by Your Issues</option>
          <option value="Assigned Issues">Filter by Assigned Issues</option>
        </DropdownButton>
      </TableSubHead>
      <Table>
        <TableHeader>
          <tr>
            <th>Title</th>
            <th>Importance</th>
            <th>Status</th>
            <th>Due Date</th>
          </tr>
        </TableHeader>
        <TableBody>
          {currentIssues.length === 0 ? (
            <tr>
              <td colSpan={4}>No Data</td>
            </tr>
          ) : (
            currentIssues.map((issue) => (
              <tr key={issue._id} onClick={setCurrentIssue.bind(null, issue)}>
                <td>{issue.title}</td>
                <td>{issue.importance}</td>
                <td>{issue.status}</td>
                <td>{new Date(issue.dueDate).toDateString()}</td>
              </tr>
            ))
          )}
        </TableBody>
      </Table>
      <TablePagination>
        {pages.length > 1
          ? pages.map((page, index) => (
              <PaginationButton
                key={index}
                onClick={changeTablePageHandler.bind(null, page)}
                $isActive={page === currentTablePage}
              >
                {page}
              </PaginationButton>
            ))
          : null}
      </TablePagination>
    </TableContainer>
  );
}

export default IssueTable;
