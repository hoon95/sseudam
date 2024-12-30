import styled from "@emotion/styled";

export const Banner = styled.div`
  position: relative;
  width: 100vw;
  height: 30vh;
  margin: calc(var(--gap) * -0.3) 0 calc(var(--gap) * 3) 0;
  background: url("/src/assets/images/home/test.png") center / cover no-repeat;

  p {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: var(--light);
    font-size: var(--text-lg);
    z-index: 2;
  }

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.7);
    z-index: 1;
  }
`;

export const Container = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0 calc(var(--gap) * 6) 0 calc(var(--gap) * 3);
`;

export const PagingLeft = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0 calc(var(--gap) * 6) 0 calc(var(--gap) * 3);

  & .inner {
    width: 20%;
  }
`;
