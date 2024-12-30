import styled from "@emotion/styled";

export const List = styled.div`
  width: 65vw;
  display: flex;
  flex-wrap: wrap;
  gap: var(--gap);

  & .card {
    width: calc(25% - var(--gap));
    display: flex;
    flex-direction: column;
    align-items: center;
    border-radius: var(--gap);
    box-shadow: 1px 1px 2px #999;

    img {
      width: 100%;
      height: 20vh;
    }

    & .text {
      width: 100%;

      p {
        font-size: var(--text-sm);
      }
    }
  }
`;

export const EmptyList = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
