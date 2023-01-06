import styled from "styled-components";

interface IInputCustomProps {
  $isInvalid?: boolean;
}

const Input = styled.input<IInputCustomProps>`
  width: 100%;
  box-sizing: border-box;   
  margin: 0 0 0.5rem 0;
  padding: 0.5rem 0.75rem;
  border-radius: 0.5rem;
  border: 1px solid ${props => props.$isInvalid ? "var(--danger)" : "var(--tertiary)"};
  font-size: 1rem;
  font-family: "Poppins";

  &:focus {
    outline: none;
  }
`;

export default Input;
