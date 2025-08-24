// src/pages/Chatroom.js
import React, { useRef, useEffect, useState } from 'react';
import useChat from '../hooks/useChat';
import { ToastContainer } from 'react-toastify';
import RateUserModal from '../components/Rateusermodal';   // matches your file
import UserRatings from '../components/userRatings';       // matches your file

const ChatRoom = ({ matchId, userId }) => {
  const {
    messages,
    input,
    setInput,
    sendMessage,
    handleTyping,
    isTyping,
    otherUserId, // make sure useChat returns this
  } = useChat({ matchId, userId });

  const [showRate, setShowRate] = useState(false);
  const [ratingRefresh, setRatingRefresh] = useState(0); // trigger ratings reload
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 to-blue-200 py-10 px-4 flex flex-col items-center">
      <div className="w-full max-w-5xl grid md:grid-cols-3 gap-6">
        {/* Chat card */}
        <div className="md:col-span-2 bg-white rounded-2xl shadow-xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-3xl font-bold text-blue-800">Live Chat 💬</h2>
            <button
              disabled={!otherUserId}
              onClick={() => setShowRate(true)}
              className="px-3 py-1.5 rounded-full text-sm bg-emerald-600 text-white disabled:opacity-50"
              title={otherUserId ? 'Rate your chat partner' : 'Partner not loaded yet'}
            >
              Rate partner
            </button>
          </div>

          <div className="h-80 overflow-y-auto bg-gray-50 rounded p-4 mb-4 shadow-inner">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`mb-2 p-2 rounded-lg max-w-xs break-words ${
                  msg.self ? 'ml-auto bg-green-200 text-right' : 'mr-auto bg-blue-200 text-left'
                }`}
              >
                <div>{msg.message}</div>
                <div className="text-xs text-gray-500 mt-1">
                  {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </div>
              </div>
            ))}
            {isTyping && <div className="text-sm italic text-gray-500 mb-2">⌨️ The other user is typing...</div>}
            <div ref={messagesEndRef} />
          </div>

          <div className="flex">
            <input
              className="flex-grow px-4 py-2 rounded-l-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={input}
              onChange={(e) => {
                setInput(e.target.value);
                handleTyping();
              }}
              onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
              placeholder="Type your message..."
            />
            <button
              onClick={sendMessage}
              className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-r-full transition"
            >
              Send
            </button>
          </div>
        </div>

        {/* Ratings sidebar */}
        <div className="md:col-span-1">
          {otherUserId && (
            <UserRatings userId={otherUserId} refreshKey={ratingRefresh} />
          )}
        </div>
      </div>

      <ToastContainer />

      {/* Rating modal */}
      {showRate && otherUserId && (
        <RateUserModal
          rateeId={otherUserId}
          matchId={matchId}
          onClose={() => setShowRate(false)}
          onDone={() => {
            setShowRate(false);
            setRatingRefresh((n) => n + 1); // refresh ratings panel after submit
          }}
        />
      )}
    </div>
  );
};

export default ChatRoom;
