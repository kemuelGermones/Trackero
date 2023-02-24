import styled from "styled-components";


interface ICustomCardProp {
  $center?: boolean;
  $width?: string;
  $height?: string;
  $marginBottom?: boolean;
}

interface ICustomCardDescriptionProp {
  $hasLimit: boolean;
}

interface ICustomCardFooterProp {
  $templateColumns: string;
}

export const Card = styled.div<ICustomCardProp>`
  background: var(--secondary);
  border-radius: 0.5rem;
  box-shadow: 0 1px 25px rgba(0, 0, 0, 0.2);
  width: ${(props) => (props.$width ? props.$width : "")};
  height: ${(props) => (props.$height ? props.$height : "")};
  box-sizing: border-box;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: ${(props) => (props.$center ? "center" : "")};
  align-items: ${(props) => (props.$center ? "center" : "")};
  margin-bottom: ${(props) => (props.$marginBottom ? "1rem" : "")};
`;

export const CardTitle = styled.h1`
  margin: 0;
  color: var(--quaternary);
  font-size: 1.5rem;
`;

export const CardHeader = styled.div`
  margin-bottom: 0.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const CardBody = styled.div`
  margin-bottom: 0.5rem;
`;

export const CardDescription = styled.p<ICustomCardDescriptionProp>`
  margin: 0;
  display: ${(state) => (state.$hasLimit ? "-webkit-box" : "")};
  overflow: ${(state) => (state.$hasLimit ? "hidden" : "")};
  -webkit-box-orient: ${(state) => (state.$hasLimit ? "vertical" : "")};
  -webkit-line-clamp: ${(state) => (state.$hasLimit ? "5" : "")};
`;

export const CardDivider = styled.hr`
  height: 1px;
  background-color: var(--quaternary);
  margin: 0 0 0.5rem 0;
  border: none;
`;

export const CardFooter = styled.div<ICustomCardFooterProp>`
  display: grid;
  grid-template-columns: ${(props) => props.$templateColumns};
  grid-column-gap: 1rem;
  margin: 0.5rem 0;
`;

export const CardFooterText = styled.p`
  color: var(--tertiary);
  margin: 0 auto;
  cursor: pointer;

  &:hover {
    color: var(--quaternary);
  }
`;