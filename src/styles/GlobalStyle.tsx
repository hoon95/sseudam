import { Global, css } from '@emotion/react';
import emotionReset from 'emotion-reset';
import MoneygraphyWoff from '../assets/fonts/Moneygraphy-Rounded.woff';
import MoneygraphyWoff2 from '../assets/fonts/Moneygraphy-Rounded.woff2';

export const GlobalStyle = () => (
  <Global
    styles={css`
      ${emotionReset}

      :root {
        --text-lg: 3rem;
        --text-md: 2rem;
        --text-sm: 1rem;

        --gap: 1.5rem;

        --main: #ff7336;
        --light: #fff;
        --dark: #231f1d;
        --gray: #b6b1a7;
      }

      @font-face {
        font-family: 'Moneygraphy-Rounded';
        src: url(${MoneygraphyWoff2}) format("woff2"),
             url(${MoneygraphyWoff}) format("woff");
        font-weight: regular;
      }

      body {
        font-family: 'Moneygraphy-Rounded', sans-serif;
        color: #333333;
        background-color: #ffffff;
        margin: 0;
      }
    `}
  />
);
