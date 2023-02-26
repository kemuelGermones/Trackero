import styled from "styled-components";

interface ICardCustomProp {
  $center?: boolean;
  $width?: string;
  $height?: string;
  $margin?: string;
}

interface ICardFooterCustomProp {
  $templateColumns: string;
}

export const Card = styled.div<ICardCustomProp>`
  background: var(--secondary);
  border-radius: 0.5rem;
  box-shadow: 0 1px 25px rgba(0, 0, 0, 0.2);
  box-sizing: border-box;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: ${(props) => (props.$center ? "center" : null)};
  align-items: ${(props) => (props.$center ? "center" : null)};
  margin: ${(props) => (props.$margin ? props.$margin : null)};
  width: ${(props) => (props.$width ? props.$width : null)};
  height: ${(props) => (props.$height ? props.$height : null)};
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

export const CardFooter = styled.div<ICardFooterCustomProp>`
  margin: 0.5rem 0;
  display: grid;
  grid-column-gap: 1rem;
  grid-template-columns: ${(props) => props.$templateColumns};
`;

export const CardDivider = styled.hr`
  height: 1px;
  background-color: var(--quaternary);
  margin: 0 0 0.5rem 0;
  border: none;
`;

export const CardTitle = styled.h1`
  margin: 0;
  color: var(--quaternary);
  font-size: 1.5rem;
  display: -webkit-box;
  overflow: hidden;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
`;

export const CardDescription = styled.p`
  margin: 0;
  display: -webkit-box;
  overflow: hidden;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 5;
`;

export const CardFooterText = styled.p`
  color: var(--tertiary);
  margin: 0 auto;
  cursor: pointer;

  &:hover {
    color: var(--quaternary);
  }
`;
