import { useState, useMemo, useEffect } from "react";
import sortIssues from "../../lib/sortIssues";

import { SmallButton, PaginationButton } from "../styles/UI/Button";
import {
  DropdownContainer,
  Dropdown,
  DropdownLabel,
} from "../styles/UI/Dropdown";
import {
  Table,
  TableHeader,
  TableBody,
  TableSubHead,
  TableContainer,
  TablePagination,
} from "../styles/UI/Table";
import IssueForm from "./IssueForm";

import { IIssue, IModifiedIssue } from "../../types/interface";
import {
  instanceOfIIssue,
  instanceOfIModifiedIssue,
} from "../../types/type-guard";


type TCurrentIssuesState = IIssue[] | IModifiedIssue[];

interface IProjectIssueTable {
  projectId?: string;
  issuesData: TCurrentIssuesState;
  setCurrentIssue?: (issue: IIssue) => void;
  setCurrentModifiedIssue?: (issue: IModifiedIssue) => void;
  issuesPerTable: number;
}

function ProjectIssueTable({
  projectId,
  issuesData,
  setCurrentIssue,
  setCurrentModifiedIssue,
  issuesPerTable,
}: IProjectIssueTable) {
  const [issues, setIssues] = useState(issuesData);
  const [sortCategory, setSortCategory] = useState("importance");
  const [showNewIssueForm, setShowNewIssueForm] = useState(false);
  const [currentTablePage, setCurrentTablePage] = useState(1);

  const currentIssues = useMemo<TCurrentIssuesState>(() => {
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
    setIssues(sortIssues(issuesData, sortCategory));
  }, [issuesData, sortCategory]);

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

  const setCurrentIssueHandler = (issue: IIssue | IModifiedIssue) => {
    if (!!setCurrentIssue && instanceOfIIssue(issue)) {
      setCurrentIssue(issue);
    } else if (!!setCurrentModifiedIssue && instanceOfIModifiedIssue(issue)) {
      setCurrentModifiedIssue(issue);
    }
  };

  const changeSortCategoryHandler = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSortCategory(event.target.value);
  };

  return (
    <>
      {showNewIssueForm && !!projectId ? (
        <IssueForm
          type="new"
          hideForm={hideNewIssueForm}
          projectId={projectId}
        />
      ) : null}
      <TableContainer>
        <TableSubHead>
          <DropdownContainer>
            <DropdownLabel>Sort by:</DropdownLabel>
            <Dropdown onChange={changeSortCategoryHandler}>
              <option value="importance">Importance</option>
              <option value="status">Status</option>
              <option value="dueDate">Due Date</option>
            </Dropdown>
          </DropdownContainer>
          {!!projectId ? (
            <SmallButton onClick={showNewIssueFormHandler}>
              Add issue
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
            ) : null}

            {currentIssues.map((issue) => (
              <tr
                key={issue._id}
                onClick={setCurrentIssueHandler.bind(null, issue)}
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

export default ProjectIssueTable;
