import styled from "@emotion/styled";

export const ChatSelect = styled.div`
  height: 100%;
  display: flex;
  justify-content: center;
`;

export const Chatroom = styled.div`
  width: 90%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;

  & .title {
    width: 50px;
    height: 50px;
    margin-bottom: calc(var(--gap) * 0.3);
  }

  & .room {
    width: 90%;
    height: 90%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: calc(var(--gap) * 0.4);
    background: var(--mustard);
    overflow: scroll;

    & .list {
      display: flex;
      align-items: center;
      padding: calc(var(--gap) * 0.5);
      cursor: pointer;
    }
  }
`;

export const Chatting = styled.div`
  height: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  margin-top: var(--gap);

  & .messageLoading {
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  & .back {
    margin-left: calc(var(--gap) * 0.5);
    cursor: pointer;
  }

  & .top {
    display: flex;
    align-items: center;
    gap: var(--gap);
    padding-bottom: var(--gap);

    & .title {
      text-align: center;
    }
  }

  & .msgContainer {
    height: 100%;
    padding: var(--gap);
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
    position: sticky;
    left: 0;
    bottom: 0;
    background: var(--light);
    border-radius: var(--gap);
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
