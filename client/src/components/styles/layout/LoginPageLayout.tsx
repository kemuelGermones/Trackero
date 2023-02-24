import styled from "styled-components";

export const LoginPageLayout = styled.main`
  height: 100vh;
  box-sizing: border-box;
  display: grid;
  grid-template-columns: 1fr 1fr;
`;

export const HeroSection = styled.section`
  background-color: var(--tertiary);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const HeroImg = styled.img`
  width: 30rem;
`;

export const HeroTitle = styled.h1`
  font-size: 2.5rem;
  color: var(--secondary);
  margin: 0;
`;

export const HeroDescription = styled.p`
  color: var(--secondary);
  text-align: center;
  margin: 0;
  max-width: 60ch;
`;

export const FormSection = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
`;
