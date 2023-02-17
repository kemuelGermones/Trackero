import { BsPlusLg, BsTrash } from "react-icons/bs";
import styled from "styled-components";

interface IPaginationCustomProps {
  $isActive: boolean;
}

export const Button = styled.button`
  padding: 0.5rem;
  width: 100%;
  box-sizing: border-box;
  border-radius: 0.5rem;
  border: none;
  background-color: var(--tertiary);
  color: white;
  font-family: "Poppins";
  font-size: 1rem;
  outline: none;

  &:hover {
    background-color: var(--quaternary);
  }
`;

export const SmallButton = styled.button`
  padding: 0.3rem 0.5rem;
  box-sizing: border-box;
  border-radius: 0.5rem;
  border: none;
  background-color: var(--tertiary);
  color: white;
  font-size: 0.75rem;
  font-family: "Poppins";
  outline: none;

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

export const TrashButton = styled(BsTrash)`
  &:hover {
    color: var(--quaternary);
  }
`;

export const DropdownButton = styled.select`
  padding: 0.3rem 0.5rem;
  width: 11.5rem;
  box-sizing: border-box;
  border-radius: 0.5rem;
  border: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  background: url("/white-arrow-down.png");
  background-repeat: no-repeat;
  background-size: 0.6rem;
  background-position: 93% center;
  background-color: var(--tertiary);
  color: white;
  font-size: 0.75rem
  font-family: "Poppins";
  outline: none;
`;

export const PlusButton = styled(BsPlusLg)`
  color: var(--quaternary);
  margin-bottom: 0.5rem;
  font-size: 2.5rem;
`;
