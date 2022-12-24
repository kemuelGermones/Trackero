import styled from "styled-components";

const Button = styled.button`
  padding: 0.5rem;
  width: 100%
  box-sizing: border-box;
  border-radius: 0.5rem;
  border: none;
  background-color: var(--tertiary);
  color: white;
  font-family: "Poppins";
  font-size: 1rem;
  margin: 0.5rem 0;

  &:hover {
    background-color: var(--secondary);
  }
`;

export default Button;
