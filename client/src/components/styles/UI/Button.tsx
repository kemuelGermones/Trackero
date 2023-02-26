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
  white-space: nowrap;
  font-family: var(--main-font);
  font-size: 1rem;
  outline: none;

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
  font-size: 0.75rem;
  white-space: nowrap;
  font-family: var(--main-font);
  outline: none;

  &:hover {
    background-color: var(--quaternary);
  }
`;

export const DropdownButton = styled.select`
  padding: 0.3rem 0.75rem;
  width: 11.5rem;
  box-sizing: border-box;
  border-radius: 0.5rem;
  border: none;
  white-space: nowrap;
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
  font-family: var(--main-font);
  outline: none;
`;

export const PaginationButton = styled.button<IPaginationCustomProps>`
  border: none;
  outline: none;
  font-weight: bolder;
  border-radius: 1.5rem;
  width: 1.5rem;
  height: 1.5rem;
  margin: 0 0.3rem;
  background-color: ${(props) =>
    props.$isActive ? "var(--tertiary)" : "transparent"};
  color: ${(props) => (props.$isActive ? "white" : "black")};

  &:hover {
    color: ${(props) => (props.$isActive ? "" : "var(--quaternary)")};
  }
`;

export const TrashButton = styled(BsTrash)`
  &:hover {
    color: var(--quaternary);
  }
`;

export const PlusButton = styled(BsPlusLg)`
  color: var(--quaternary);
  margin-bottom: 0.5rem;
  font-size: 2.5rem;
`;
