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

export const Filter = styled.aside`
  width: 20%;
  display: flex;
  flex-direction: column;
  gap: var(--gap);

  h3 {
    font-size: var(--text-md);
  }

  & .category {
    display: flex;
    align-items: center;
    gap: calc(var(--gap) * 0.5);
  }

  /* select box */
  & .MuiSelect-select {
    display: flex;
    align-items: center;
  }
`;

export const Container = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0 calc(var(--gap) * 6) 0 calc(var(--gap) * 3);

  & .list {
    width: 65vw;
    display: flex;
    flex-wrap: wrap;
    gap: var(--gap);
  }

  & .card {
    width: calc(25% - var(--gap));
    display: flex;
    flex-direction: column;
    align-items: center;
    border-radius: var(--gap);
    box-shadow: 1px 1px 2px #999;

    img {
      width: 100%;
      object-fit: contain;
    }

    & .text {
      width: 100%;

      p {
        font-size: var(--text-sm);
      }
    }
  }
`;
