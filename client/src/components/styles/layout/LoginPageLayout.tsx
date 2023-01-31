import styled from "styled-components";

export const LoginPageLayout = styled.main`
  height: 100vh;
  box-sizing: border-box;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-areas: "hero form";
`;

export const HeroSection = styled.section`
  grid-area: hero;
  background-color: var(--tertiary);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const HeroImg = styled.img`
  width: 35rem;
`;

export const HeroTitle = styled.h1`
  font-size: 2.5rem;
  color: var(--secondary);
  margin: 0;
`;

export const HeroDescription = styled.p`
  color: var(--secondary);
  text-align: center;
  padding: 0 5rem;
  margin: 0;
`;

export const FormSection = styled.section`
  grid-area: form;
  display: flex;
  justify-content: center;
  align-items: center;
`;
