import styled from "@emotion/styled";

export const HeaderContainer = styled.header`
  & .MuiPaper-root {
    z-index: 999;
  }

  & .box {
    width: 100%;
    max-width: 1280px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: auto;

    & .logo {
      color: var(--main);
      font-size: var(--text-md);
      padding-left: var(--gap);
    }

    a {
      color: var(--dark);

      &.active {
        color: var(--main);
      }
      &:hover {
        color: var(--main);
      }
    }

    ul {
      display: flex;
      align-items: center;
      gap: calc(var(--gap) * 2);

      & .login {
        display: flex;
        align-items: center;
        gap: calc(var(--gap) * 0.5);
        padding: 0 var(--gap) 0 calc(var(--gap) * 5);

        & .profile {
          display: flex;
          align-items: center;
          gap: calc(var(--gap) * 0.5);
          cursor: pointer;
        }

        & .logout {
          padding-left: var(--gap);

          &:hover {
            color: var(--main);
          }
        }
      }
    }
  }
`;
