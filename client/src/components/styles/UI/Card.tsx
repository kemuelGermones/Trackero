import styled from "styled-components";

interface ICustomCardProp {
  $center?: boolean;
};

export const Card = styled.div<ICustomCardProp>`
  background: var(--secondary);
  border-radius: 0.5rem;
  box-shadow: 0 1px 25px rgba(0, 0, 0, 0.2);
  box-sizing: border-box;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: ${(props) => (props.$center ? "center" : "")};
  align-items: ${(props) => (props.$center ? "center" : "")};
`;

export const CardLogo = styled.div`
  height: 5rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  font-size: 1.5rem;
  font-weight: bold;
  color: var(--quaternary);
`;

export const CardTitle = styled.h1`
  margin: 0 0 0.5rem 0;
  color: var(--quaternary);
  font-size: 1.5rem;
`;

export const CardDescription = styled.p`
  margin: 0 0 0.5rem 0;
  display: -webkit-box;
  overflow: hidden;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 5;
`;

export const CardDivider = styled.hr`
  height: 1px;
  background-color: var(--quaternary);
  margin: 0 0 0.5rem 0;
  border: none;
`;

export const CardButtons = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-column-gap: 1rem;
`;

export const CardFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
