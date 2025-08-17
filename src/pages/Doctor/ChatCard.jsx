import React from 'react';

const ChatCard = ({ message }) => {
  if (!message || !message.text) return null;

  const isMe = message.sender === 'me';

  return (
    <div
      className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}
    >
      <div
        className={`max-w-xs px-4 py-2 rounded-lg shadow text-white ${
          isMe ? 'bg-green-500' : 'bg-gray-500'
        }`}
      >
        {message.text}
      </div>
    </div>
  );
};

export default ChatCard;
