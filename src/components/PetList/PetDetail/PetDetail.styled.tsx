import styled from "@emotion/styled";

export const Detail = styled.div`
  width: 50vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: auto;

  img {
    width: 50%;
  }

  & .title {
    width: 50%;
    display: flex;
    justify-content: start;
    align-items: end;
    font-size: var(--text-md);
    padding-top: var(--gap);

    & .kind {
      font-size: var(--text-lg);
    }

    & .sex {
      padding: 0 var(--gap);
    }
  }
`;
