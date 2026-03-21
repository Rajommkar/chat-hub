const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');

const app = express();
app.use(cors());

const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "http://127.0.0.1:5500", // Update this to your Live Server URL
        methods: ["GET", "POST"]
    }
});

io.on('connection', (socket) => {
    console.log(`User Connected: ${socket.id}`);

    // Listen for a message from a client
    socket.on('send_message', (message) => {
        // Broadcast it to everyone including the sender
        io.emit('receive_message', message);
    });

    socket.on('disconnect', () => {
        console.log('User Disconnected', socket.id);
    });
});

server.listen(3001, () => {
    console.log('SERVER RUNNING ON PORT 3001');
});