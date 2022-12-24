import styled from "styled-components";

export const Table = styled.table`
  background-color: white;
  box-shadow: 0 1px 25px rgba(0, 0, 0, 0.2);
  text-align: left;
  font-size: 0.75rem;
  width: 100%;
  box-sizing: border-box;
  border-spacing: 0;
  text-align: center;
`;

export const TableHeader = styled.thead`
  background-color: var(--tertiary);
  color: white;

  & tr th {
    padding: 1rem;
    font-weight: normal;
    text-transform: uppercase;
  }
`;

export const TableBody = styled.tbody`
  & tr td {
    padding: 1rem;
  }

  & tr {
    cursor: pointer;
  }

  & tr:nth-child(even) {
    background-color: var(--white);
  }

  & tr:hover {
    background-color: var(--light);
  }
`;
