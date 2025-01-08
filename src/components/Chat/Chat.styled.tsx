import styled from "@emotion/styled";

export const Chatting = styled.div`
  position: relative;
  width: 80vw;
  height: 60vh;
  display: flex;
  flex-direction: column;
  margin: calc(var(--gap) * 5) auto;
  padding: calc(var(--gap) * 3) var(--gap);
  background: #abc0d0;

  & .title {
    font-size: var(--gap);
    text-align: center;
  }

  & .msgContainer {
    overflow: scroll;

    & .enter {
      width: fit-content;
      margin: var(--gap) auto;
      padding: calc(var(--gap) * 0.7);
      background: #7c8fb5;
      text-align: center;
      border-radius: calc(var(--gap) * 0.5);
    }
  }

  & .chat {
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    margin: 0 auto;
    background: var(--light);
  }
`;

export const Msg = styled.div`
  display: flex;
  align-items: end;
  margin-bottom: calc(var(--gap) * 0.5);

  & .message {
    background: var(--yellow);
    padding: calc(var(--gap) * 0.5);
    border-radius: calc(var(--gap) * 0.5);
  }

  & .time {
    color: #606d76;
    padding-left: calc(var(--gap) * 0.2);
  }
`;
