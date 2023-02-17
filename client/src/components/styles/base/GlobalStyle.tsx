import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
:root {
    --primary: #BDC5F2;
    --secondary: #F2F2F2;
    --tertiary: #6B7FF2;
    --quaternary: #415CF2;
    --success: #7BD67D;
    --danger: #FB706C;
    --warning: #FADF98;
}

 body {
     background-color: var(--primary);
     font-family: "Poppins", sans-serif;
     margin: 0;
     padding: 0;
 }
`;

export default GlobalStyle;
