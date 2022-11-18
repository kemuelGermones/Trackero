import styled from "styled-components";

const Container = styled.section`
  margin: 0 0 0 10rem;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-column-gap: 1rem;
  grid-row-gap: 1rem;
  padding: 1rem;
  box-sizing: border-box;

  & div {
    background: #F2F2F2;
    height: 15rem;
    border-radius: 0.5rem;
    box-shadow: 0 1px 25px rgba(0,0,0,0.2);
    box-sizing: border-box;
    padding: 1rem;
  }

  & h1 {
    font-weight: bold;
    font-size: 1.5rem;
  }

  & div:nth-child(1) {
    color: blue;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  & div:nth-child(1) h1 {
    margin-top: 1rem;
  }
`;


export default Container;
