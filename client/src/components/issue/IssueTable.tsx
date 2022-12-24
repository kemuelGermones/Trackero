import { useState } from "react";
import { Card } from "../styles/UI/Card";
import Button from "../styles/UI/Button";
import { Table, TableHeader, TableBody } from "../styles/UI/Table";
import IssueForm from "./IssueForm";
import { IIssue } from "../../types/interface";

interface IIssueTable {
  projectId: string;
  issues: IIssue[];
  setCurrentIssueId: (issueId: string) => void;
}

function IssueTable({ projectId, issues, setCurrentIssueId }: IIssueTable) {
  const [showNewIssueForm, setShowNewIssueForm] = useState(false);

  const showNewIssueFormHandler = () => {
    setShowNewIssueForm(true);
    document.body.style.overflow = "hidden";
  };

  const hideNewIssueForm = () => {
    setShowNewIssueForm(false);
    document.body.style.overflow = "unset";
  };

  const setCurrentIssueIdHandler = (data: string) => {
    setCurrentIssueId(data);
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
      <Card style={{ marginBottom: "1rem" }}>
        <Button onClick={showNewIssueFormHandler}>Add issue</Button>
      </Card>
      <Table style={{ marginBottom: "1rem" }}>
        <TableHeader>
          <tr>
            <th>Title</th>
            <th>Importance</th>
            <th>Status</th>
            <th>Due Date</th>
          </tr>
        </TableHeader>
        <TableBody>
          {issues.map((issue) => (
            <tr
              key={issue._id}
              onClick={setCurrentIssueIdHandler.bind(null, issue._id)}
            >
              <td>{issue.title}</td>
              <td>{issue.importance}</td>
              <td>{issue.status}</td>
              <td>{issue.dueDate.split("T")[0]}</td>
            </tr>
          ))}
        </TableBody>
      </Table>
    </>
  );
}

export default IssueTable;
