import styled from "styled-components";

interface IPageDashboardLayoutCustomProps {
  $templateColumns: string;
}

export const PageDashboardLayout = styled.section<IPageDashboardLayoutCustomProps>`
  padding: 1rem;
  display: grid;
  grid-template-areas: "first second";
  grid-template-columns: ${(props) => props.$templateColumns};
  gap: 1rem;
`;

export const FirstSection = styled.div`
  grid-area: first;
`;

export const SecondSection = styled.div`
  grid-area: second;
`;
