import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
    :root {
        --primary: #2745F2;
        --secondary: #415CF2;
        --tertiary: #6B7FF2;
        --light: #BDC5F2;
        --white: #F2F2F2;
        --success: #7BD67D;
        --danger: #FB706C;
        --warning: #FAB96B;
    }

    body {
        background-color: var(--light);
        font-family: "Poppins", sans-serif;
        margin: 0;
        padding: 0;
    }
`;

export default GlobalStyle;
