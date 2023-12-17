import { createGlobalStyle } from "styled-components";
import { scrollbarStyle } from "./styles/scrollbar-style";

export const GlobalStyle = createGlobalStyle` 
  * {
    ${scrollbarStyle}
  }

  html,
  body,
  #root {
    font-family: "Lexend";
    height: 100%;
    width: 100%;
    margin: 0;
    padding: 0;
  }

  
  
  
`;
