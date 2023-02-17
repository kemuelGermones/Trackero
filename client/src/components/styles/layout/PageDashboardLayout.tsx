import styled from "styled-components";

interface IPageDashboardLayoutCustomProps {
  $templateColumns: string;
}

export const PageDashboardLayout = styled.section<IPageDashboardLayoutCustomProps>`
  padding: 1rem;
  display: grid;
  grid-template-columns: ${(props) => props.$templateColumns};
  gap: 1rem;
`;
