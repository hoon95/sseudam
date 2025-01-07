import styled from "@emotion/styled";

export const Title = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--gap);
  padding-top: calc(var(--gap) * 5);
  padding-bottom: calc(var(--gap) * 3);

  h2 {
    color: var(--dark);
    font-size: var(--text-lg);
  }

  p {
    color: var(--gray);
    font-size: var(--text-sm);
  }
`;

export const ShortList = styled.ul`
  display: flex;
  justify-content: center;
  gap: var(--gap);
  padding-bottom: calc(var(--gap) * 10);

  li {
    width: 20%;
    cursor: pointer;

    img {
      padding-bottom: calc(var(--gap) * 0.5);
    }

    img,
    p {
      width: 100%;
    }

    & .likeView {
      display: flex;
      padding-top: calc(var(--gap) * 0.3);
      gap: calc(var(--gap) * 0.3);
      & .like,
      .view {
        display: flex;
        align-items: center;
        gap: calc(var(--gap) * 0.2);
      }
    }
  }

  & .traffic {
    font-size: var(--text-md);
  }
`;
