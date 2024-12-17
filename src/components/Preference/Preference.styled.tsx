import styled from "@emotion/styled";

export const Container = styled.section`
  width: 80vw;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: calc(var(--gap) * 3);
  margin: auto;
  padding-top: calc(var(--gap) * 5);
`;

export const Thumbnail = styled.div`
  width: 40%;
  img {
    width: 100%;
  }
`;

export const Prefer = styled.div`
  width: 40%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  & .intro {
    color: var(--main);
  }

  & .startBtn {
    color: var(--light);
    background: var(--main);
    margin-top: var(--gap);
    padding: calc(var(--gap) * 0.5) var(--gap);
    border-radius: var(--gap);
  }
`;

export const Cursor = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--gap);

  & .cursor {
    display: flex;
    gap: var(--gap);
    font-size: var(--text-lg);
  }

  & .myPrefer {
    font-size: var(--text-md);
    padding-top: calc(var(--gap) * 0.5);
  }
`;
