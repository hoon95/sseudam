import styled from "@emotion/styled";

export const Detail = styled.div`
  width: 50vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: auto;

  img {
    width: 70%;
    max-width: 70%;
    max-height: 50vh;
    border: 1px solid var(--dark);
    border-radius: 10px;
    margin-bottom: calc(var(--gap) * 2);
  }

  & .title {
    width: 70%;
    display: flex;
    justify-content: space-between;
    font-size: calc(var(--text-md) * 0.7);

    & .desc {
      display: flex;
      align-items: center;

      & .kind {
        font-size: var(--text-lg);
      }

      & .sex {
        padding-left: var(--gap);
        padding-right: calc(var(--gap) * 0.5);
      }
    }
  }

  & .divider {
    width: 70%;
    margin: calc(var(--gap) * 1.5) 0;
  }
`;

export const BtnContainer = styled.div`
  display: flex;
  gap: calc(var(--gap) * 0.5);

  & .list {
    color: var(--light);
  }
`;

export const Info = styled.ul`
  width: 70%;
  display: flex;
  flex-direction: column;
  gap: var(--gap);

  li {
    display: flex;
    align-items: center;
    gap: var(--gap);

    p {
      :first-of-type {
        width: 20%;
        font-size: calc(var(--text-md) * 0.7);
      }
    }

    &.careNm {
      justify-content: space-between;

      & .title {
        width: 20%;
      }

      & .container {
        width: 80%;
        display: flex;
        flex-direction: column;
        gap: var(--gap);

        & .text {
          width: 100%;

          p {
            width: 100%;
          }

          & .call {
            display: flex;
            align-items: center;
            gap: calc(var(--gap) * 0.2);
            padding-top: calc(var(--gap) * 0.7);
          }
        }

        & .map {
          height: 50vh;

          & .gmnoscreen,
          .gmnoprint {
            display: none;
          }
        }
      }
    }
  }
`;
