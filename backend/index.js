// backend/server.js
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);

const io = socketIo(server, {
  cors: {
    origin: 'http://localhost:3000', // Update with the actual URL of your frontend app
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type'],
    credentials: true // if you're using cookies or authentication headers
  }
});

// Listen for incoming connections
io.on('connection', (socket) => {
  console.log('New client connected');
  
  // Listen for messages from the client
  socket.on('message', (data) => {
    console.log('Received message:', data);
    // Broadcast the message to all clients
    io.emit('message', data);
  });

   // Join a specific room for video call
  socket.on('join-call', ({ room }) => {
    socket.join(room);
  });

  // Handle offer from peer
 socket.on('offer', (data) => {
  socket.to(data.room).emit('offer', data.offer);
  console.log('Emitting offer to room:', data.room);
});

  // Handle answer from peer
  socket.on('answer', (data) => {
    socket.to(data.room).emit('answer', data.answer);
  });

  // Handle ICE candidate from peer
  socket.on('candidate', (data) => {
    socket.to(data.room).emit('candidate', data.candidate);
  });

  // Disconnect event
  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

// Start the server on a specific port
server.listen(3001, () => {
  console.log('Server running on port 3001');
});