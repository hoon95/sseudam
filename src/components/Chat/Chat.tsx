/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect, useRef } from "react";
import { sendMessage, fetchMessage, subscribeToMessage } from "./ChatService";
import { Button, Typography, OutlinedInput } from "@mui/material";
import { Chatting, Msg } from "./Chat.styled";
import { getCurrentUser, getAdminUser } from "@services/auth";
import { useChatStore } from "@store/store";

export const Chat = () => {
  const { chatAdmin } = useChatStore();
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<any[]>([]);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [currentAdmin, setCurrentAdmin] = useState<any>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messageContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const fetchCurrentUser = async () => {
      const { user } = await getCurrentUser();
      setCurrentUser(user);
    };

    fetchCurrentUser();
  }, []);

  useEffect(() => {
    if (currentUser) {
      const fetchAdminUser = async () => {
        const { adminUser } = await getAdminUser(currentUser.id);
        setCurrentAdmin(adminUser);
      };

      fetchAdminUser();
    }
  }, [currentUser]);

  const handleSendMessage = async () => {
    if (message.trim() !== "" && currentUser) {
      const senderName =
        currentUser?.user_metadata?.name || currentAdmin?.[0]?.center;
      await sendMessage(
        currentUser.id,
        senderName,
        "메세지 받는사람",
        message,
        chatAdmin,
      );
      setMessage("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.nativeEvent.isComposing) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  useEffect(() => {
    const loadMessages = async () => {
      const fetchedMessages = await fetchMessage(chatAdmin);
      setMessages(fetchedMessages);
    };

    loadMessages();

    const unsubscribe = subscribeToMessage(chatAdmin, (newMessage) => {
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    });

    return () => unsubscribe();
  }, [chatAdmin]);

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

  console.log("admin: ", chatAdmin);

  return (
    <Chatting>
      <Typography className="title">실시간 채팅</Typography>
      <div className="msgContainer" ref={messageContainerRef}>
        {messages.map((item, index) => (
          <Msg
            key={index}
            className={item.sender_id === currentUser?.id ? "receiveUser" : ""}
          >
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
