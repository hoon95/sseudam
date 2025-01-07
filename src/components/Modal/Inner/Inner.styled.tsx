/* eslint-disable react-refresh/only-export-components */

import styled from "@emotion/styled";

export const InnerStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  width: "25vw",
  p: 4,
  borderRadius: "var(--gap)",
  boxShadow: "5px 5px 3px #666",
  whiteSpace: "pre-line",

  display: "flex",
  flexDirection: "column",
  alignItems: "center",

  img: {
    width: "100%",
    objectFit: "cover",
  },

  "& .answer": {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    gap: "calc(var(--gap) * 0.5)",
    paddingTop: "var(--gap)",
  },

  "& .answerBtn": {
    fontSize: "var(--text-sm)",
    color: "var(--dark)",
  },
};

export const ShortsInnerStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "#000",
  width: "25vw",
  p: 4,
  border: "1px solid var(--light)",
  borderRadius: "var(--gap)",
  boxShadow: "3px 3px 3px #666",

  display: "flex",
  flexDirection: "column",
  alignItems: "center",
};

export const InnerResult = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--gap);

  p {
    &:first-of-type {
      font-size: calc(var(--text-md) * 0.7);
    }
    &:nth-of-type(2) {
      font-size: var(--text-md);
    }
  }
`;

export const KakaoInner = styled.div`
  display: flex;
  align-items: center;
  gap: calc(var(--gap) * 0.5);
  border-radius: calc(var(--gap) * 0.5);
  padding: calc(var(--gap) * 0.5) var(--gap);
  background: var(--yellow);
`;
