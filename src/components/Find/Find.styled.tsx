import styled from "@emotion/styled";

export const Container = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-top: calc(var(--gap) * 10);

  & .text {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: calc(var(--gap) * 0.5);

    & .title {
      color: var(--dark);
      font-size: var(--text-lg);
    }
    & .desc {
      color: var(--gray);
    }
  }
`;

export const Kind = styled.div`
  display: flex;
  justify-content: center;
  gap: var(--gap);
  padding-top: calc(var(--gap) * 2);

  & .dog,
  .cat {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: calc(var(--gap) * 0.5);
    cursor: pointer;

    p {
      font-size: var(--text-md);
    }

    & .avatar {
      width: 200px;
      height: 200px;
    }
  }
`;
