/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect, useRef } from "react";
import { sendMessage, fetchMessage, subscribeToMessage } from "./ChatService";
import { Chatroom, ChatSelect, Chatting, Msg } from "./Chat.styled";
import { getCurrentUser, getAllUser, getAdminUser } from "@services/auth";
import { useChatStore } from "@store/store";
import {
  Paper,
  Avatar,
  Button,
  Typography,
  OutlinedInput,
  CircularProgress,
} from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ChatIcon from "@assets/images/home/chat.png";

const ChatList = () => {
  const {
    entireUser,
    setEntireUser,
    admin,
    setAdmin,
    setOpen,
    setChatAdminUser,
  } = useChatStore();
  const [adminName, setAdminName] = useState("");
  const [chatList, setChatList] = useState<string[]>([]);
  const [user, setUser] = useState("");

  useEffect(() => {
    const loadMessages = async () => {
      getAllUser().then((res: any) => setEntireUser(res.users));

      const { user } = await getCurrentUser();
      const userId = user.id;
      setUser(userId);

      const { adminUser } = await getAdminUser();
      const isAdmin = adminUser.some(
        (admin: { id: any }) => admin.id === user.id,
      );
      const matchingAdmin = adminUser.find(
        (admin: { id: any }) => admin.id === user.id,
      );

      setAdmin(isAdmin);

      if (admin) {
        setAdminName(matchingAdmin.center);

        const fetchedMessages = await fetchMessage(`${matchingAdmin.center}%`);
        const roomIds = fetchedMessages.map(
          (messages: { room_id: string }) => messages.room_id,
        );
        const uniqueRoomIds = [...new Set(roomIds)] as string[];
        const roomNames = uniqueRoomIds.map((roomId: string) =>
          roomId.split("-").slice(1).join("-"),
        );

        setChatList(roomNames);
      } else {
        const fetchedMessages = await fetchMessage(`%${userId}`);
        const roomIds = fetchedMessages.map(
          (messages: { room_id: string }) => messages.room_id,
        );
        const uniqueRoomIds = [...new Set(roomIds)] as string[];
        const roomNames = uniqueRoomIds.map(
          (roomId: string) => roomId.split("-")[0],
        );

        setChatList(roomNames);
      }
    };

    loadMessages();
  }, [admin, setAdmin, setEntireUser]);

  const handleChatting = (args: string[]) => {
    const [room, user] = args;
    setChatAdminUser(`${room}-${user}`);
    setOpen(true);
  };

  const users = entireUser.reduce(
    (
      acc: { [x: string]: any },
      user: { id: string | number; user_metadata: { full_name: any } },
    ) => {
      acc[user.id] = user.user_metadata.full_name;
      return acc;
    },
    {},
  );

  return (
    <Chatroom>
      <Avatar className="title" src={ChatIcon} />
      <div className="room">
        {chatList.length === 0 ? (
          <div className="loading">
            <CircularProgress />
          </div>
        ) : (
          chatList.map((room, index) => (
            <Paper
              className="list"
              square={false}
              elevation={4}
              key={`${room}_${index}`}
              onClick={() => {
                handleChatting(admin ? [adminName, room] : [room, user]);
              }}
            >
              {admin ? users[room] : room}
            </Paper>
          ))
        )}
      </div>
    </Chatroom>
  );
};

export const Chat = () => {
  const { entireUser, admin, isOpen, setIsOpen, open, setOpen, chatAdmin } =
    useChatStore();
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
    setMessages([]);

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

  const users = entireUser.reduce(
    (
      acc: { [x: string]: any },
      user: { id: string | number; user_metadata: { full_name: any } },
    ) => {
      acc[user.id] = user.user_metadata.full_name;
      return acc;
    },
    {},
  );

  return (
    isOpen && (
      <Paper
        square={false}
        elevation={5}
        sx={{
          position: "fixed",
          width: "20%",
          height: "50%",
          bottom: 16,
          right: 16,
          borderRadius: "var(--gap)",
          background: "var(--mustard)",
        }}
      >
        <Button
          sx={{ position: "absolute", right: 0, color: "var(--dark)" }}
          onClick={() => setIsOpen(false)}
        >
          X
        </Button>
        {open ? (
          <Chatting>
            <ArrowBackIosNewIcon
              className="back"
              onClick={(e) => {
                e.preventDefault();
                setOpen(false);
              }}
            />
            <Typography className="title">
              {admin
                ? users[chatAdmin.split("-").slice(1).join("-")]
                : chatAdmin.split("-")[0]}
            </Typography>
            {messages.length === 0 ? (
              <div className="messageLoading">
                <CircularProgress />
              </div>
            ) : (
              <div className="msgContainer" ref={messageContainerRef}>
                {messages.map((item) => (
                  <Msg
                    key={item.created_at}
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
            )}

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
        ) : (
          <ChatSelect>
            <ChatList />
          </ChatSelect>
        )}
      </Paper>
    )
  );
};
