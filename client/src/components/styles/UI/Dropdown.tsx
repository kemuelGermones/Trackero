import styled from "styled-components";

export const DropdownContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 10rem;
`;

export const Dropdown = styled.select`
    padding: 0.3rem 0.5rem;
    width: 6.5rem;
    box-sizing: border-box;
    border-radius: 0.5rem;
    border: none;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance:none;
    background: url("/white-arrow-down.png");
    background-repeat: no-repeat;
    background-size: 0.75rem;
    background-position: 93% center;
    background-color: var(--tertiary);
    color: white;
    font-size: 0.75rem
    font-family: "Poppins";
    outline: none;
`;

export const DropdownLabel = styled.label`
  font-size: 0.75rem;
`;

export default Dropdown;
