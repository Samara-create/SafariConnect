const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const { createServer } = require('http');
const { Server } = require('socket.io');

// Load env variables
dotenv.config();

// Temp check for env vars
console.log('🔐 JWT_SECRET:', process.env.JWT_SECRET);
console.log('🌐 FRONTEND_URL:', process.env.FRONTEND_URL);

const app = express();
const server = createServer(app);

// ✅ CORS config
const corsOptions = {
  origin: ['http://localhost:3000', 'http://localhost:3001'], // Adjust if needed
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};
app.use(cors(corsOptions));

// ✅ Socket.IO config
const io = new Server(server, {
  cors: {
    origin: ['http://localhost:3000', 'http://localhost:3001'],
    methods: ['GET', 'POST'],
    credentials: true
  }
});

// ✅ Middleware
app.use(express.json());

if (process.env.NODE_ENV !== 'production') {
  const morgan = require('morgan');
  app.use(morgan('dev'));
}
module.exports.io = io; // ✅ Export io instance here

// ✅ Route imports
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const matchRoutes = require('./routes/matchRoutes');
const chatRoutes = require('./routes/chatRoutes');
const tripRoutes = require('./routes/tripRoutes');
const adminRoutes = require('./routes/adminRoutes');
const ratingRoutes = require('./routes/ratingRoutes');



// ✅ Mount routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/match', matchRoutes);
app.use('/api/chat', chatRoutes);
app.use('/api/trips', tripRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/ratings', ratingRoutes);

// ✅ MongoDB connection
mongoose.connect(process.env.MONGO_URI_LOCAL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('✅ MongoDB connected'))
  .catch((err) => console.error('❌ MongoDB error:', err));

// ✅ 404 Handler
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

// ✅ Error Handler
app.use((err, req, res, next) => {
  console.error('❌ Server error:', err.stack);
  res.status(500).json({ message: 'Internal server error' });
});

// ✅ Socket.IO Events
io.on('connection', (socket) => {
  console.log('🔌 User connected:', socket.id);

  // ✅ Join personal notification room (after login/signup)
  socket.on('join-room', (userId) => {
    if (userId) {
      socket.join(userId.toString());
      console.log(`📢 User ${userId} joined personal notifications room`);
    }
  });

  // ✅ Join chat room
  socket.on('join-chat', ({ matchId, userId }) => {
    const room = `match-${matchId}`;
    socket.join(room);
    socket.join(userId); // Also join personal notifications
    console.log(`👥 User ${userId} joined rooms: ${room}, ${userId}`);
  });

  // ✅ Send message
  socket.on('send-message', (data) => {
    const { matchId, senderId, message, messageType = 'text' } = data;
    const room = `match-${matchId}`;
    const messageData = {
      id: Date.now().toString(),
      matchId,
      senderId,
      message,
      messageType,
      timestamp: new Date(),
      read: false
    };

    io.to(room).emit('new-message', messageData);
    console.log(`💬 Message sent in ${room}:`, messageData);
  });

  // ✅ Typing indicators
  socket.on('typing-start', ({ matchId, userId }) => {
    io.to(`match-${matchId}`).emit('user-typing', { userId, isTyping: true });
  });

  socket.on('typing-stop', ({ matchId, userId }) => {
    io.to(`match-${matchId}`).emit('user-typing', { userId, isTyping: false });
  });

  // ✅ Mark message as read
  socket.on('mark-read', ({ matchId, messageId, userId }) => {
    io.to(`match-${matchId}`).emit('message-read', { messageId, userId });
  });

  // ✅ Share location
  socket.on('share-location', ({ matchId, senderId, location }) => {
    const room = `match-${matchId}`;
    const locationData = {
      id: Date.now().toString(),
      matchId,
      senderId,
      messageType: 'location',
      location,
      timestamp: new Date()
    };

    io.to(room).emit('new-message', locationData);
    console.log(`📍 Location shared in ${room}:`, locationData);
  });

  socket.on('disconnect', () => {
    console.log('🔌 User disconnected:', socket.id);
  });
});


// ✅ Start server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`🚀 Server listening on port ${PORT}`);
  console.log('💬 Socket.IO is live!');
});



