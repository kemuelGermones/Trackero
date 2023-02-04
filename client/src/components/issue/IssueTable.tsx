import { useState, useMemo, useEffect } from "react";
import sortAndFilterIssues from "../../lib/sortAndFilterIssues";

import {
  PaginationButton,
  SmallButton,
  DropdownButton,
} from "../styles/UI/Button";
import {
  Table,
  TableHeader,
  TableBody,
  TableSubHead,
  TableContainer,
  TablePagination,
} from "../styles/UI/Table";
import IssueForm from "./IssueForm";

import { IIssue } from "../../types/interface";

interface IIssueTable {
  projectId?: string;
  issuesData: IIssue[];
  setCurrentIssue: (issue: IIssue) => void;
  issuesPerTable: number;
}

function IssueTable({
  projectId,
  issuesData,
  setCurrentIssue,
  issuesPerTable,
}: IIssueTable) {
  const [showNewIssueForm, setShowNewIssueForm] = useState(false);
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

  const showNewIssueFormHandler = () => {
    setShowNewIssueForm(true);
    document.body.style.overflow = "hidden";
  };

  const hideNewIssueForm = () => {
    setShowNewIssueForm(false);
    document.body.style.overflow = "unset";
  };

  const changeTablePageHandler = (page: number) => {
    setCurrentTablePage(page);
  };

  const changeSortCategoryHandler = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSortCategory(event.target.value);
  };

  return (
    <>
      {showNewIssueForm && projectId ? (
        <IssueForm hideForm={hideNewIssueForm} projectId={projectId} />
      ) : null}
      <TableContainer>
        <TableSubHead>
          <DropdownButton onChange={changeSortCategoryHandler}>
            <option value="Importance">Sort by Importance</option>
            <option value="Status">Sort by Status</option>
            <option value="Due Date">Sort by Due Date</option>
            <option value="Your Issues">Filter by Your Issues</option>
            <option value="Assigned Issues">Filter by Assigned Issues</option>
          </DropdownButton>
          {projectId ? (
            <SmallButton onClick={showNewIssueFormHandler}>
              Add Issue
            </SmallButton>
          ) : null}
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
    </>
  );
}

export default IssueTable;
