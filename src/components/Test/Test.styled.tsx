import styled from "@emotion/styled";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  & .title {
    font-size: var(--text-lg);
    margin: calc(var(--gap) * 5) 0;
  }

  & .desc {
    width: 60%;
    display: flex;
    justify-content: space-around;
    align-items: start;

    font-size: var(--text-md);

    & .text {
      display: flex;
      flex-direction: column;
      gap: var(--gap);
      padding-top: calc(var(--gap) * 2);

      & .typed {
        display: flex;
        align-items: end;

        & .type {
          font-size: var(--text-lg);
        }
      }
    }

    img {
      width: 50%;
    }

    & .subDesc {
      color: var(--gray);
      font-size: var(--text-sm);
    }
  }
`;
