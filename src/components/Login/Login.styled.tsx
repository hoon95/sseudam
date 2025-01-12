import styled from "@emotion/styled";

export const Sns = styled.section`
  width: 25vw;
  display: flex;
  flex-direction: column;
  gap: calc(var(--gap) * 0.5);
  padding-top: calc(var(--gap) * 5);

  & .kakao,
  /* .instagram, */
  .google {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: calc(var(--gap) * 0.5);
    padding: var(--gap);
    font-family: "Moneygraphy-Rounded";
    font-size: var(--font-md);
    border: 1px solid transparent;
    border-radius: 10px;
    box-shadow:
      0 4px 6px rgba(0, 0, 0, 0.1),
      0 1px 3px rgba(0, 0, 0, 0.08);
    transition:
      transform 0.2s ease-in-out,
      box-shadow 0.2s ease-in-out;
    cursor: pointer;

    &:hover {
      transform: translateY(-5px);
      box-shadow:
        0 6px 12px rgba(0, 0, 0, 0.15),
        0 3px 6px rgba(0, 0, 0, 0.1);
    }

    &.kakao {
      background: var(--yellow);
    }
    &.google {
      color: var(--dark);
      /* background: linear-gradient(
        90deg,
        #2d282c 0%,
        #543639 20%,
        #793d49 40%,
        #634247 60%,
        #49363a 80%,
        #2d282c 100%
      ); */
      /* border: 1.5px solid #564e50; */
      background: linear-gradient(
        225deg,
        rgba(0, 0, 0, 0.02) 0%,
        rgba(0, 0, 0, 0.04) 50%,
        rgba(0, 0, 0, 0.02) 100%
      );
      border: none;
    }
  }
`;

export const KakaoIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="var(--dark)"
    width="24"
    height="24"
  >
    <path d="M12 2C6.48 2 2 6.02 2 10.86c0 2.38 1.55 4.49 3.94 5.74-.11.79-.61 3.46-.71 4.15 0 0-.02.18.09.25.11.07.27-.01.27-.01 1.1-.15 4.48-2.91 5.15-3.47.4.05.81.08 1.26.08 5.52 0 10-4.02 10-8.86S17.52 2 12 2z" />
  </svg>
);

export const LoginContainer = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: calc(var(--gap) * 5) 0;

  & .text {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    h2 {
      font-size: var(--text-md);
      padding-bottom: calc(var(--gap) * 0.5);
    }

    p {
      color: var(--gray);
    }
  }

  & .admin {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: var(--gap);
    padding-top: var(--gap);

    & .or {
      color: var(--gray);
    }
    & .login {
      font-size: calc(var(--text-md) * 0.7);
      cursor: pointer;
    }
  }
`;
