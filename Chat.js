// Chat.js
import React from 'react';
import { useParams, useLocation } from 'react-router-dom';
import ChatRoom from './Chatroom';

const Chat = () => {
  const { chatRoomId } = useParams();
  const location = useLocation();

  const userId = localStorage.getItem('userId');
  const matchIdFromState = location.state?.matchId;
  const finalChatId = chatRoomId || matchIdFromState;

  if (!finalChatId || !userId) {
    return (
      <div className="text-center text-red-600">
        ❌ Chat room not found or user not logged in.
      </div>
    );
  }

  return <ChatRoom matchId={finalChatId} userId={userId} />;
};

export default Chat;
