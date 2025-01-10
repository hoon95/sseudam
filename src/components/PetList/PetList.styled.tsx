import styled from "@emotion/styled";

export const List = styled.div`
  width: 65vw;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: var(--gap);

  & .card {
    width: calc(25% - var(--gap));
    height: 15%;
    display: flex;
    flex-direction: column;
    align-items: center;
    border-radius: var(--gap);
    box-shadow: 1px 1px 2px #999;

    a {
      height: 100%;

      img {
        width: 100%;
        height: 50%;
        object-fit: cover;
      }
    }

    & .text {
      width: 100%;
      height: 50%;

      p {
        font-size: var(--text-sm);
      }
    }
  }
`;

export const EmptyList = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: var(--gap);
  font-size: var(--text-md);
`;
