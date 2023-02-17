import "chart.js/auto";
import { useMemo } from "react";
import { Chart } from "react-chartjs-2";

import { IIssue } from "../../types/interface";
import { Card, CardDivider, CardHeader, CardTitle } from "../styles/UI/Card";
import { GraphBox, IssueGraphLayout } from "../styles/layout/IssueGraphLayout";

interface IIssueGraph {
  issuesData: IIssue[];
}

const STATUS_OPTIONS = {
  aspectRatio: 1,
  plugins: {
    legend: {
      display: false,
    },
  },
};

function IssueGraph({ issuesData }: IIssueGraph) {
  const statusData = useMemo(() => {
    return {
      labels: ["Pending", "In Progress", "Done"],
      datasets: [
        {
          label: "Total",
          data: [
            issuesData.filter((issue) => issue.status === "Pending").length,
            issuesData.filter((issue) => issue.status === "In Progress").length,
            issuesData.filter((issue) => issue.status === "Done").length,
          ],
          backgroundColor: ["#FB706C", "#FADF98", "#7BD67D"],
          borderColor: "black",
          borderWidth: 1,
        },
      ],
    };
  }, [issuesData]);

  const importanceData = useMemo(() => {
    return {
      labels: ["High", "Mid", "Low"],
      datasets: [
        {
          label: "Total",
          data: [
            issuesData.filter((issue) => issue.importance === "High").length,
            issuesData.filter((issue) => issue.importance === "Mid").length,
            issuesData.filter((issue) => issue.importance === "Low").length,
          ],
          backgroundColor: ["#FB706C", "#FADF98", "#7BD67D"],
          borderColor: "black",
          borderWidth: 1,
        },
      ],
    };
  }, [issuesData]);

  return (
    <IssueGraphLayout>
      <Card>
        <CardHeader>
          <CardTitle>Issues Status Chart</CardTitle>
        </CardHeader>
        <CardDivider />
        <GraphBox>
          <Chart type="bar" data={statusData} options={STATUS_OPTIONS} />
        </GraphBox>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Issues Importance Chart</CardTitle>
        </CardHeader>
        <CardDivider />
        <GraphBox>
          <Chart type="doughnut" data={importanceData} />
        </GraphBox>
      </Card>
    </IssueGraphLayout>
  );
}

export default IssueGraph;
