import styled from "styled-components";

export const Dashboard = styled.section`
  padding: 1rem;
  display: grid;
  grid-template-areas:
    "project issue";
  grid-template-columns: 1fr 1.5fr;
  gap: 1rem;
`;

export const ProjectSection = styled.div`
  grid-area: project;
`;

export const IssueSection = styled.div`
  grid-area: issue;
`;


