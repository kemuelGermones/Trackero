import { useMemo } from "react";
import { GraphLayout, GraphBox } from "../styles/layout/GraphLayout";
import { Card, CardDivider, CardTitle } from "../styles/UI/Card";
import "chart.js/auto";
import { Chart } from "react-chartjs-2";
import { IIssue, IModifiedIssue } from "../../types/interface";

interface IIssueGraph {
  issues: IIssue[] | IModifiedIssue[];
}

const STATUS_OPTIONS = {
  aspectRatio: 1,
  plugins: {
    legend: {
      display: false,
    },
  },
};

function IssueGraph({ issues }: IIssueGraph) {
  const statusData = useMemo(() => {
    return {
      labels: ["Pending", "In Progress", "Done"],
      datasets: [
        {
          label: "Total",
          data: [
            issues.filter((issue) => issue.status === "Pending").length,
            issues.filter((issue) => issue.status === "In Progress").length,
            issues.filter((issue) => issue.status === "Done").length,
          ],
          backgroundColor: ["#FB706C", "#FADF98", "#7BD67D"],
          borderColor: "black",
          borderWidth: 1,
        },
      ],
    };
  }, [issues]);

  const importanceData = useMemo(() => {
    return {
      labels: ["High", "Mid", "Low"],
      datasets: [
        {
          label: "Total",
          data: [
            issues.filter((issue) => issue.importance === "High").length,
            issues.filter((issue) => issue.importance === "Mid").length,
            issues.filter((issue) => issue.importance === "Low").length,
          ],
          backgroundColor: ["#FB706C", "#FADF98", "#7BD67D"],
          borderColor: "black",
          borderWidth: 1,
        },
      ],
    };
  }, [issues]);

  return (
    <GraphLayout>
      <Card>
        <CardTitle>Issues Status Chart</CardTitle>
        <CardDivider />
        <GraphBox>
          <Chart type="bar" data={statusData} options={STATUS_OPTIONS} />
        </GraphBox>
      </Card>
      <Card>
        <CardTitle>Issues Importance Chart</CardTitle>
        <CardDivider />
        <GraphBox>
          <Chart type="doughnut" data={importanceData} />
        </GraphBox>
      </Card>
    </GraphLayout>
  );
}

export default IssueGraph;
