import React, { useState } from "react";
import chatData from "../data/chatData";
import ChatList from "../components/ChatList";
import ChatWindow from "../components/ChatWindow";

const Chat = () => {
  const [chats, setChats] = useState(chatData);
  const [selectedChat, setSelectedChat] = useState(null);
  const [newMessage, setNewMessage] = useState("");

  const handleChatSelect = (chat) => {
    setSelectedChat(chat);
    const updated = chats.map((c) =>
      c.id === chat.id ? { ...c, unread: 0 } : c
    );
    setChats(updated);
  };

  const handleSendMessage = () => {
    if (newMessage.trim() === "") return;

    const time = new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

    const updated = chats.map((chat) => {
      if (chat.id === selectedChat.id) {
        return {
          ...chat,
          messages: [...chat.messages, { text: newMessage, sent: true, time }],
          lastMessage: newMessage,
          time: "Just now",
        };
      }
      return chat;
    });

    setChats(updated);
    setSelectedChat({
      ...selectedChat,
      messages: [...selectedChat.messages, { text: newMessage, sent: true, time }],
    });
    setNewMessage("");
  };

  return (
    <div className="flex h-full">
      {/* Chat List - Hidden on mobile when chat is selected */}
      <div
        className={`w-full md:w-1/3 ${
          selectedChat ? "hidden md:block" : "block"
        }`}
      >
        <ChatList
          chats={chats}
          selectedChat={selectedChat}
          handleChatSelect={handleChatSelect}
        />
      </div>

      {/* Chat Window - Fullscreen on mobile */}
      <div
        className={`w-full md:w-2/3 ${
          selectedChat ? "block" : "hidden md:flex"
        }`}
      >
        <ChatWindow
          selectedChat={selectedChat}
          newMessage={newMessage}
          setNewMessage={setNewMessage}
          handleSendMessage={handleSendMessage}
          goBack={() => setSelectedChat(null)} // 👈 Mobile back button support
        />
      </div>
    </div>
  );
};

export default Chat;
