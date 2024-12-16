import styled from "@emotion/styled";

export const HeaderContainer = styled.header`
  & .box {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;

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
    }

    ul {
      display: flex;
      gap: calc(var(--gap) * 2);

      & .login {
        padding: 0 var(--gap) 0 calc(var(--gap) * 5);
      }
    }
  }
`;