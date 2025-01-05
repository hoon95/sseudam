import { Global, css } from "@emotion/react";
import emotionReset from "emotion-reset";
import MoneygraphyWoff from "@assets/fonts/Moneygraphy-Rounded.woff";
import MoneygraphyWoff2 from "@assets/fonts/Moneygraphy-Rounded.woff2";

export const GlobalStyle = () => (
  <Global
    styles={css`
      ${emotionReset}

      :root {
        --text-lg: 3rem;
        --text-md: 2rem;
        --text-sm: 1rem;

        --gap: 1.5rem;

        --main: #ff7000;
        --light: #ffffff;
        --dark: #231f1d;
        --gray: #b6b1a7;
        --yellow: #ffe835;
        --red: #ff2400;
      }

      @font-face {
        font-family: "Moneygraphy-Rounded";
        src:
          url(${MoneygraphyWoff2}) format("woff2"),
          url(${MoneygraphyWoff}) format("woff");
        font-weight: regular;
      }

      /* common */
      body {
        font-family: "Moneygraphy-Rounded", sans-serif;
        color: #333333;
        background-color: #ffffff;
        margin: 0;
        padding-top: calc(var(--gap) * 3);
        overflow-x: hidden; // aos
      }

      a {
        color: var(--dark);
        text-decoration: none;
      }

      /* Login - Tooltip */
      & .MuiPopper-root {
        z-index: 999 !important;
      }
      & .MuiTooltip-tooltip {
        background: var(--main) !important;
        padding: calc(var(--gap) * 0.5) !important;
      }
      & .MuiTooltip-arrow {
        color: var(--main) !important;
      }

      /* PetDetail - Tooltip */
      & .custom-tooltip {
        color: var(--dark) !important;
        background: var(--light) !important;
        border: 1px solid var(--dark);
        padding: var(--gap) !important;
      }

      & .MuiPagination-ul {
        justify-content: center;
      }

      /* Admin - 관리자 등록하기 */
      & .alertIcon {
        margin: calc(var(--gap) * 2) auto;
      }

      .swal2-container {
        overflow: visible;
      }

      & .customToast {
        color: var(--dark);
        bottom: calc(var(--gap) * 5);
      }
    `}
  />
);
