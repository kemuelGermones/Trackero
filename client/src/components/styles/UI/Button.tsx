import styled from "styled-components";

interface IPaginationCustomProps {
  $isActive: boolean;
}

const Button = styled.button`
  padding: 0.5rem;
  width: 100%;
  box-sizing: border-box;
  border-radius: 0.5rem;
  border: none;
  background-color: var(--tertiary);
  color: white;
  font-family: "Poppins";
  font-size: 1rem;
  margin: 0.5rem 0;

  &:hover {
    background-color: var(--quaternary);
  }
`;

export const SmallButton = styled.button`
  padding: 0.3rem 0.75rem;
  box-sizing: border-box;
  border-radius: 0.5rem;
  border: none;
  background-color: var(--tertiary);
  color: white;
  font-size: 0.75rem
  font-family: "Poppins";
  margin-left: 1rem;
  display: flex;
  align-items: center;

  &:hover {
    background-color: var(--quaternary);
  }
`;

export const PaginationButton = styled.button<IPaginationCustomProps>`
  border: none;
  outline: none;
  background-color: ${(props) =>
    props.$isActive ? "var(--tertiary)" : "transparent"};
  color: ${(props) => (props.$isActive ? "white" : "black")};
  font-weight: bolder;
  border-radius: 1.5rem;
  width: 1.5rem;
  height: 1.5rem;
  margin: 0 0.3rem;

  &:hover {
    color: ${(props) => (props.$isActive ? "" : "var(--quaternary)")};
  }
`;

export default Button;
