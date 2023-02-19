import styled from "styled-components";

export const ErrorLayout = styled.div`
  height: 100vh;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const ErrorLogo = styled.img`
  width: 30rem;
`;

export const ErrorTitle = styled.h1`
  margin: 0;
  font-size: 2.5rem;
`;

export const ErrorDescription = styled.p`
  margin: 0;
  text-align: center;
  max-width: 40ch;
`;
