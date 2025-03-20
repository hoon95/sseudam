import styled from "@emotion/styled";
import banner from "@assets/images/dist/banner.webp";

export const Banner = styled.div`
  position: relative;
  width: 100vw;
  height: 30vh;
  margin: calc(var(--gap) * -0.3) 0 calc(var(--gap) * 3) 0;
  background: url(${banner}) center / cover no-repeat;

  p {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: var(--light);
    font-size: var(--text-lg);
    z-index: 2;

    @media (max-width: 768px) {
      font-size: var(--text-md);
    }

    @media (max-width: 480px) {
      font-size: var(--text-sm);
    }
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

  @media (max-width: 1024px) {
    padding: 0 calc(var(--gap) * 4) 0 calc(var(--gap) * 2);
  }

  @media (max-width: 768px) {
    flex-wrap: wrap;
    padding: 0 calc(var(--gap) * 2);
  }
`;

export const PagingLeft = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0 calc(var(--gap) * 6) 0 calc(var(--gap) * 3);

  @media (max-width: 1024px) {
    padding: 0 calc(var(--gap) * 4) 0 calc(var(--gap) * 2);
  }

  @media (max-width: 768px) {
    flex-direction: column;
    padding: 0 calc(var(--gap) * 2);
  }

  & .inner {
    width: 20%;
  }
`;
