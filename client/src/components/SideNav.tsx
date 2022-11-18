import styled from 'styled-components';

const SideNav = styled.nav`
  height: 100vh;
  width: 10rem;
  box-sizing: border-box;
  padding: 1rem;
  background-color: #F2F2F2;
  text-transform: uppercase;
  position: fixed;
  top: 0;
  left: 0;

  & h1 {
    margin: 0;
    font-size: 1.5rem;
    box-sizing: border-box;
    border-bottom: 1px solid black;
    padding: 0.5rem 0;
    text-align: center;
  }

  & ul {
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: column;
    height: 15rem;
    justify-content: space-around;
  }

  & li:hover {
    color: #6B7FF2
  }
`;

export default SideNav;
