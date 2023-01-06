import { useState, useMemo, useEffect } from "react";
import { SmallButton, PaginationButton } from "../styles/UI/Button";
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
  projectId: string;
  issues: IIssue[];
  setCurrentIssue: (issue: IIssue) => void;
}

function IssueTable({ projectId, issues, setCurrentIssue }: IIssueTable) {
  const [showNewIssueForm, setShowNewIssueForm] = useState(false);
  const [currentTablePage, setCurrentTablePage] = useState(1);
  const [issuesPerTablePage, setIssuesPerTablePage] = useState(5);

  const currentIssues = useMemo(() => {
    const lastIssuetIndex = currentTablePage * issuesPerTablePage;
    const firstIssueIndex = lastIssuetIndex - issuesPerTablePage;
    return issues.slice(firstIssueIndex, lastIssuetIndex);
  }, [currentTablePage, issuesPerTablePage, issues]);

  const pages = useMemo(() => {
    const pages: number[] = [];
    for (let i = 1; i <= Math.ceil(issues.length / issuesPerTablePage); i++) {
      pages.push(i);
    }
    return pages;
  }, [issues.length, issuesPerTablePage]);

  useEffect(() => {
    if (currentIssues.length === 0 && currentTablePage > 0) {
      setCurrentTablePage(state => state - 1);
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

  const setCurrentIssueIdHandler = (data: IIssue) => {
    setCurrentIssue(data);
  };

  const changeTablePageHandler = (page: number) => {
    setCurrentTablePage(page);
  };

  return (
    <>
      {showNewIssueForm && (
        <IssueForm
          type="new"
          hideForm={hideNewIssueForm}
          projectId={projectId}
        />
      )}
      <TableContainer>
        <TableSubHead>
          <SmallButton onClick={showNewIssueFormHandler}>Add issue</SmallButton>
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
            ) : null}
            {currentIssues.map((issue) => (
              <tr
                key={issue._id}
                onClick={setCurrentIssueIdHandler.bind(null, issue)}
              >
                <td>{issue.title}</td>
                <td>{issue.importance}</td>
                <td>{issue.status}</td>
                <td>{new Date(issue.dueDate).toDateString()}</td>
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
    </>
  );
}

export default IssueTable;
