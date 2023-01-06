import styled from "styled-components";

export const TableContainer = styled.div`
  box-shadow: 0 1px 25px rgba(0, 0, 0, 0.2);
  margin-bottom: 1rem;
  font-size: 0.75rem;
`;

export const Table = styled.table`
  background-color: white;
  text-align: left;
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
    padding: 1rem 0;
    border-bottom: 1px solid lightgray;
  }

  & tr {
    cursor: pointer;
  }

  & tr:hover {
    background-color: var(--primary);
  }
`;

export const TableSubHead = styled.div`
  background-color: var(--secondary);
  padding: 0.5rem 1rem;
  display: flex;
  justify-content: end;
  border-top-left-radius: 0.5rem;
  border-top-right-radius: 0.5rem;
`;

export const TablePagination = styled.div`
  background-color: var(--secondary);
  height: 2.5rem;
  box-sizing: border-box;
  padding: 0.5rem;
  display: flex;
  justify-content: center;
  border-bottom-left-radius: 0.5rem;
  border-bottom-right-radius: 0.5rem;
`;
