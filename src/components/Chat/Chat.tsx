/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect, useRef } from "react";
import { sendMessage, fetchMessage, subscribeToMessage } from "./ChatService";
import { Chatroom, Chatting, Msg } from "./Chat.styled";
import { getCurrentUser, getAdminUser } from "@services/auth";
import { useChatStore } from "@store/store";
import { Button, Typography, OutlinedInput } from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";

const ChatList = () => {
  const { setAdmin, setOpen, setChatAdminUser } = useChatStore();
  const [chatList, setChatList] = useState<string[]>([]);
  const [user, setUser] = useState("");

  useEffect(() => {
    const loadMessages = async () => {
      const { user } = await getCurrentUser();
      const userId = user.id;
      setUser(userId);

      const fetchedMessages = await fetchMessage(`%${userId}`);
      const roomIds = fetchedMessages.map(
        (messages: { room_id: string }) => messages.room_id,
      );
      const uniqueRoomIds = [...new Set(roomIds)] as string[];
      const roomNames = uniqueRoomIds.map(
        (roomId: string) => roomId.split("-")[0],
      );

      setChatList(roomNames);

      const { adminUser } = await getAdminUser();
      const isAdmin = adminUser.some(
        (admin: { id: any }) => admin.id === user.id,
      );
      setAdmin(isAdmin);
    };

    loadMessages();
  }, [setAdmin]);

  const handleChatting = (room: string, user: string) => {
    setChatAdminUser(`${room}-${user}`);
    setOpen(true);
  };

  return (
    <Chatroom>
      {chatList.map((room, index) => (
        <li
          key={`${room}_${index}`}
          onClick={() => {
            handleChatting(room, user);
          }}
        >
          {room}
        </li>
      ))}
    </Chatroom>
  );
};

export const Chat = () => {
  const { admin, open, setOpen, chatAdmin } = useChatStore();
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
      await sendMessage(currentUser.id, senderName, message, chatAdmin);
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

  return (
    <Chatting>
      {open ? (
        <>
          <ArrowBackIosNewIcon
            className="back"
            onClick={(e) => {
              e.preventDefault();
              setOpen(false);
            }}
          />
          <Typography className="title">
            {admin ? "사용자" : chatAdmin.split("-")[0]}
          </Typography>
          <div className="msgContainer" ref={messageContainerRef}>
            {messages.map((item, index) => (
              <Msg
                key={index}
                className={
                  item.sender_id === currentUser?.id ? "receiveUser" : ""
                }
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
        </>
      ) : (
        <ChatList />
      )}
    </Chatting>
  );
};
