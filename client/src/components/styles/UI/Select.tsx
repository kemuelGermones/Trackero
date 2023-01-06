import styled from "styled-components";

interface ISelectCustomProps {
    $isInvalid?: boolean;
}

const Select = styled.select<ISelectCustomProps>`
  width: 100%;
  box-sizing: border-box;
  margin: 0 0 0.5rem 0;
  padding: 0.5rem 0.75rem;
  border-radius: 0.5rem;
  border: 1px solid ${(props) => (props.$isInvalid ? "red" : "var(--tertiary)")};
  font-size: 1rem;
  font-family: "Poppins";
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance:none;
  background: url("/arrow-down.png");
  background-repeat: no-repeat;
  background-size: 1rem;
  background-position: 96% center;
  background-color: white;

  &:focus {
    outline: none;
  }
`;

export default Select;
