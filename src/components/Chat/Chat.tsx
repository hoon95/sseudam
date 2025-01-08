import { useState, useEffect, useRef } from "react";
import { sendMessage, fetchMessage, subscribeToMessage } from "./ChatService";
import { Button, Typography, OutlinedInput } from "@mui/material";
import { Chatting, Msg } from "./Chat.styled";
import { getCurrentUser } from "@services/auth";

export const Chat = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<any[]>([]);
  const [currentUser, setCurrentUser] = useState("");

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messageContainerRef = useRef<HTMLDivElement | null>(null);

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

      await sendMessage(
        user.user.id,
        user.user.user_metadata.name || "관리자",
        "메세지 받는사람",
        message,
      );
      setMessage("");
    }
  };

  console.log(currentUser);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.nativeEvent.isComposing) {
      e.preventDefault();
      handleSendMessage();
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

  useEffect(() => {
    if (messageContainerRef.current) {
      messageContainerRef.current.scrollTop =
        messageContainerRef.current.scrollHeight;
    }
  }, [messages]);

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
      <div className="msgContainer" ref={messageContainerRef}>
        <p className="enter">{currentUser.email}님이 입장하였습니다</p>
        {messages.map((item, index) => (
          <Msg key={index}>
            <p className="message">
              {item.sender_name}: {item.content}
            </p>
            <p className="time">{handleDate(item.created_at)}</p>
          </Msg>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <OutlinedInput
        className="chat"
        maxRows={4}
        value={message}
        autoFocus
        onChange={(e) => setMessage(e.target.value)}
        placeholder="메시지를 입력하세요"
        onKeyDown={handleKeyDown}
        endAdornment={
          <Button type="submit" onClick={handleSendMessage}>
            Enter
          </Button>
        }
      />
    </Chatting>
  );
};
