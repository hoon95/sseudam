import styled from "@emotion/styled";

export const HeaderContainer = styled.header`
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

        & .logout {
          cursor: pointer;
          padding-left: var(--gap);

          &:hover {
            color: var(--main);
          }
        }
      }
    }
  }
`;
