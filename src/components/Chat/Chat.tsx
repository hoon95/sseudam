import { useState, useEffect } from "react";
import { sendMessage, fetchMessage, subscribeToMessage } from "./ChatService";
import { Button, Typography, OutlinedInput } from "@mui/material";
import { Chatting, Msg } from "./Chat.styled";
import { getCurrentUser } from "@services/auth";

export const Chat = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<any[]>([]);
  const [currentUser, setCurrentUser] = useState("");

  useEffect(() => {
    const fetchCurrentUser = async () => {
      const { user } = await getCurrentUser();
      setCurrentUser(user);
    };

    fetchCurrentUser();
  }, []);

  const handleSendMessage = async () => {
    if (message.trim() !== "") {
      const user = await getCurrentUser();
      console.log(currentUser);

      await sendMessage(
        user.user.user_metadata.name || "관리자",
        user.user.id,
        "메세지 받는사람",
        message,
      );
      setMessage("");
    }
  };

  useEffect(() => {
    const loadMessages = async () => {
      const fetchedMessages = await fetchMessage();
      setMessages(fetchedMessages);
    };

    loadMessages();

    const unsubscribe = subscribeToMessage((newMessage) => {
      setMessages((prevMessages) => {
        return [...prevMessages, newMessage];
      });
    });

    return () => unsubscribe();
  }, []);

  const handleDate = (date: string) => {
    const newDate = new Date(date);
    const formattedDate = newDate.toLocaleTimeString("ko-KR", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });

    return formattedDate;
  };

  return (
    <Chatting>
      <Typography className="title">실시간 채팅</Typography>
      <div className="msgContainer">
        <p className="enter">{currentUser.email}님이 입장하였습니다</p>
        {messages.map((item, index) => (
          <Msg key={index}>
            <p className="message">
              {item.sender_id}: {item.content}
            </p>
            <p className="time">{handleDate(item.created_at)}</p>
          </Msg>
        ))}
      </div>
      <OutlinedInput
        className="chat"
        maxRows={4}
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="메시지를 입력하세요"
        endAdornment={<Button onClick={handleSendMessage}>전송</Button>}
      />
    </Chatting>
  );
};
