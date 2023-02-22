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
    --main-font: Poppins, "Segoe UI", Helvetica, Arial, sans-serif;
}

 body {
     background-color: var(--primary);
     font-family: var(--main-font);
     margin: 0;
     padding: 0;
 }
`;

export default GlobalStyle;
