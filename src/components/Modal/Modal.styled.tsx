/* eslint-disable react-refresh/only-export-components */
import styled from "@emotion/styled";

export const Btn = styled.div`
  padding-top: var(--gap);

  button {
    color: var(--light);
  }
`;

export const VideoContainer = styled.div`
  position: relative;
  width: 100%;
  height: 0;
  padding-bottom: 177.78%;

  iframe {
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
  }
`;

export const Camera = styled.div`
  position: absolute;
  top: calc(var(--gap) * -1);
  left: 50%;
  width: calc(var(--gap) * 3);
  height: calc(var(--gap) * 0.8);
  transform: translateX(-50%);
  background: #363636;
  border-radius: var(--gap);
`;

export const Wifi = {
  position: "absolute",
  top: "calc(var(--gap) * -1.1)",
  right: "calc(var(--gap) * 1.2)",
  color: "var(--light)",
};

export const Battery = {
  position: "absolute",
  top: "calc(var(--gap) * -1.1)",
  right: "0",
  color: "var(--light)",
  transform: "rotate(90deg)",
};
