import styled from "@emotion/styled";

export const ChatSelect = styled.div`
  display: flex;
  justify-content: center;
  margin: calc(var(--gap) * 10) 0;
`;

export const Chatroom = styled.div`
  width: 50%;
  display: flex;
  flex-direction: column;
  gap: calc(var(--gap) * 2);
  cursor: pointer;

  & .title {
    display: flex;
    justify-content: center;
    font-size: var(--text-md);
  }

  & .room {
    display: flex;
    justify-content: center;
    gap: var(--gap);
    flex-wrap: wrap;

    & .list {
      width: calc(25% + var(--gap));
      display: flex;
      align-items: center;
      gap: var(--gap);
      padding: var(--gap);
    }
  }
`;

export const Chatting = styled.div`
  position: relative;
  width: 80vw;
  height: 60vh;
  display: flex;
  flex-direction: column;
  margin: calc(var(--gap) * 5) auto;
  padding: calc(var(--gap) * 3) var(--gap);
  background: #abc0d0;

  & .messageLoading {
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  & .back {
    cursor: pointer;
  }

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

  & .noChat {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;

    p {
      font-size: var(--text-lg);
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
  justify-content: start;
  align-items: end;
  margin-bottom: calc(var(--gap) * 0.5);

  &.receiveUser {
    justify-content: end;

    & .message {
      background: var(--yellow);
    }
  }

  & .message {
    background: var(--light);
    padding: calc(var(--gap) * 0.5);
    border-radius: calc(var(--gap) * 0.5);
  }

  & .time {
    color: #606d76;
    padding-left: calc(var(--gap) * 0.2);
  }
`;
