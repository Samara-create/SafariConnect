// src/hooks/useChat.js
import { useEffect, useState, useRef } from 'react';
import socket from '../utils/socket'; // ✅ reuse the shared instance
import API from '../utils/api';
import { toast } from 'react-toastify';

const useChat = ({ matchId, userId }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [otherUserId, setOtherUserId] = useState(null); // ✅ add this
  const typingTimeoutRef = useRef(null);

  useEffect(() => {
    if (!matchId || !userId) return;

    // ensure connection & join room
    socket.connect?.();
    socket.emit('join-chat', { matchId, userId });

    fetchChat(); // initial load

    return () => {
      socket.emit('typing-stop', { matchId, userId });
      // don't disconnect the shared socket globally; just remove listeners below
    };
  }, [matchId, userId]);

  useEffect(() => {
    const onNewMessage = (msg) => {
      const isOwn = String(msg.senderId?._id || msg.senderId) === String(userId);
      if (!isOwn && msg.message) toast.info(`📩 ${msg.message}`);
      setMessages((prev) => [...prev, { ...msg, self: isOwn }]);
    };

    const onTyping = ({ userId: typingUser, isTyping }) => {
      if (String(typingUser) !== String(userId)) setIsTyping(isTyping);
    };

    socket.on('new-message', onNewMessage);
    socket.on('user-typing', onTyping);

    return () => {
      socket.off('new-message', onNewMessage);
      socket.off('user-typing', onTyping);
    };
  }, [userId]);

  const fetchChat = async () => {
    try {
      const res = await API.get(`/chat/match/${matchId}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });

      const data = res.data || {};
      const rawMessages = data.messages || data.chat?.messages || [];

      // ✅ find other participant robustly
      let participants = data.participants || data.chat?.participants || [];
      // normalize to string ids
      participants = (participants || []).map((p) => (typeof p === 'object' ? p._id : p)).filter(Boolean);

      // if API uses user1/user2
      if (!participants.length && (data.user1 || data.user2)) {
        participants = [data.user1?._id || data.user1, data.user2?._id || data.user2].filter(Boolean);
      }

      // fallback: infer from messages
      if (!participants.length && rawMessages.length) {
        const ids = new Set();
        rawMessages.forEach((m) => {
          const sid = m.senderId?._id || m.senderId;
          if (sid) ids.add(String(sid));
        });
        participants = Array.from(ids);
      }

      const other =
        participants.find((id) => String(id) !== String(userId)) ||
        null;

      setOtherUserId(other);

      const formatted = rawMessages.map((msg) => {
        const sid = msg.senderId?._id || msg.senderId;
        return {
          ...msg,
          timestamp: msg.timestamp || msg.createdAt || new Date().toISOString(),
          self: String(sid) === String(userId),
        };
      });

      setMessages(formatted);
    } catch (err) {
      console.error('❌ Failed to load chat:', err);
      toast.error('Could not load chat');
    }
  };

  const handleTyping = () => {
    socket.emit('typing-start', { matchId, userId });
    clearTimeout(typingTimeoutRef.current);
    typingTimeoutRef.current = setTimeout(() => {
      socket.emit('typing-stop', { matchId, userId });
    }, 1000);
  };

  const sendMessage = async () => {
    if (!input.trim()) return;
    if (!matchId) {
      toast.error('Missing match ID!');
      return;
    }

    const payload = {
      matchId,
      senderId: userId,
      message: input,
      messageType: 'text',
    };

    // realtime first
    socket.emit('send-message', payload);

    try {
      const res = await API.post(
        '/chat/send',
        { matchId, message: input },
        { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
      );

      const saved = res.data || {};
      setMessages((prev) => [
        ...prev,
        {
          ...saved,
          message: saved.message ?? input,
          timestamp: saved.timestamp || saved.createdAt || new Date().toISOString(),
          senderId: saved.senderId || userId,
          self: true,
        },
      ]);
    } catch (err) {
      console.error('❌ Error sending message:', err);
      toast.error('Failed to send message');
    }

    setInput('');
  };

  return {
    messages,
    input,
    setInput,
    sendMessage,
    handleTyping,
    isTyping,
    otherUserId, // ✅ now defined and returned
  };
};

export default useChat;
