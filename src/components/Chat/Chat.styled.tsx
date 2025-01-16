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
    /* margin-bottom: calc(var(--gap) * 0.3); */
  }

  & .room {
    width: 90%;
    height: 80%;
    display: flex;
    flex-direction: column;
    justify-content: start;
    background: var(--mustard);
    overflow: scroll;

    & .list {
      display: flex;
      align-items: center;
      padding: calc(var(--gap) * 0.5);
      margin-bottom: calc(var(--gap) * 0.4);
      cursor: pointer;
    }
  }
`;

export const Chatting = styled.div`
  height: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  margin-top: calc(var(--gap) * 0.5);

  & .messageLoading {
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  & .back {
    font-size: var(--text-sm);
    margin-left: calc(var(--gap) * 0.5);
    cursor: pointer;
  }

  & .top {
    display: flex;
    align-items: center;
    gap: var(--gap);
    padding-bottom: calc(var(--gap) * 0.5);

    & .title {
      text-align: center;
    }
  }

  & .msgContainer {
    height: 70%;
    padding: 0 calc(var(--gap) * 0.5);
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
    font-size: calc(var(--text-sm) * 0.7);
    background: var(--light);
    padding: calc(var(--gap) * 0.5);
    border-radius: calc(var(--gap) * 0.5);
  }

  & .time {
    font-size: calc(var(--text-sm) * 0.7);
    color: #606d76;
    padding-left: calc(var(--gap) * 0.2);
  }
`;
