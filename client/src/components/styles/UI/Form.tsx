import styled from "styled-components";

interface IInputCustomProps {
  $isInvalid?: boolean;
}

export const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

export const Label = styled.label`
  margin-bottom: 0.3rem;
  color: var(--quaternary);
  font-weight: bold;
`;

export const Input = styled.input<IInputCustomProps>`
  width: 100%;
  box-sizing: border-box;
  margin-bottom: 0.5rem;
  padding: 0.5rem 0.75rem;
  border-radius: 0.5rem;
  border: 1px solid
    ${(props) => (props.$isInvalid ? "var(--danger)" : "var(--tertiary)")};
  font-size: 1rem;
  font-family: var(--main-font);

  &:focus {
    outline: none;
  }
`;

export const Select = styled.select<IInputCustomProps>`
  width: 100%;
  box-sizing: border-box;
  margin-bottom: 0.5rem;
  padding: 0.5rem 0.75rem;
  border-radius: 0.5rem;
  border: 1px solid ${(props) => (props.$isInvalid ? "red" : "var(--tertiary)")};
  font-size: 1rem;
  font-family: var(--main-font);
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  background: url("/arrow-down.png");
  background-repeat: no-repeat;
  background-size: 1rem;
  background-position: 96% center;
  background-color: white;

  &:focus {
    outline: none;
  }
`;

export const TextArea = styled.textarea<IInputCustomProps>`
  width: 100%;
  height: 8rem;
  box-sizing: border-box;
  margin-bottom: 0.5rem;
  padding: 0.5rem 0.75rem;
  border-radius: 0.5rem;
  border: 1px solid
    ${(props) => (props.$isInvalid ? "var(--danger)" : "var(--tertiary)")};
  font-size: 1rem;
  font-family: var(--main-font);

  &:focus {
    outline: none;
  }
`;

export const Checkbox = styled.div<IInputCustomProps>`
  border: 1px solid
    ${(props) => (props.$isInvalid ? "var(--danger)" : "var(--tertiary)")};
  border-radius: 0.5rem;
  padding: 0.5rem 0.75rem;
  width: 100%;
  height: 8rem;
  box-sizing: border-box;
  overflow-y: scroll;
  background-color: white;
  margin-bottom: 0.5rem;
`;
