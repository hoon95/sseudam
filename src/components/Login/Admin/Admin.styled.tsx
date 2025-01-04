import styled from "@emotion/styled";

export const AdminForm = styled.form`
  width: 30vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: var(--gap);
  border: 1px solid rgba(148, 160, 184, 0.4);
  border-radius: calc(var(--gap) * 0.5);
  box-shadow:
    rgba(9, 11, 17, 0.05) 0px 5px 15px,
    rgba(19, 23, 32, 0.05) 0px 15px 35px -5px;
  padding: calc(var(--gap) * 2);
  margin: calc(var(--gap) * 5) auto;

  form {
    width: 80%;
  }

  & .signUpTitle {
    font-size: var(--text-md);
    padding-bottom: calc(var(--gap) * 1.5);
  }

  & .title {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: calc(var(--gap) * 0.7);
    padding-bottom: calc(var(--gap) * 1.5);

    h2 {
      color: var(--main);
      font-size: var(--text-lg);
    }
    p {
      color: var(--dark);
    }
  }

  & .bottom {
    & .text {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: var(--gap) 0;

      & .save {
        display: flex;
        align-items: center;
        gap: calc(var(--gap) * 0.2);
      }

      a {
        color: var(--gray);
        text-decoration: underline;
      }
    }

    & .btn {
      background: var(--main);
      color: var(--light);
    }
  }

  & .centerSelect {
    margin: var(--gap) 0;
  }
`;
