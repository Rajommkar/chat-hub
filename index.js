require('dotenv').config(); 
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
const { GoogleGenerativeAI } = require('@google/generative-ai');

const app = express();
app.use(cors());

const server = http.createServer(app);
const io = new Server(server, {
    cors: { origin: "http://127.0.0.1:5500", methods: ["GET", "POST"] }
});

// FIX: We are now safely pulling the key from the .env file!
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

io.on('connection', (socket) => {
    console.log(`User Connected: ${socket.id}`);

    socket.on('send_message', async (data) => {
        socket.emit('user_typing', 'AI Bot');
        
        const userText = data.text.toLowerCase();
        let botReply = "";

        try {
            if (userText.includes('joke')) {
                const response = await fetch('https://official-joke-api.appspot.com/random_joke');
                const jokeData = await response.json();
                botReply = `${jokeData.setup} ... ${jokeData.punchline} 🤣`;
            } 
            else {
                const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
                const prompt = `You are a helpful, friendly chatbot built by a MERN stack developer. Keep your answers short, concise, and conversational. The user says: ${data.text}`;
                
                const result = await model.generateContent(prompt);
                botReply = result.response.text();
            }
        } catch (error) {
            botReply = "My AI brain is offline right now. Please check my API key!";
            
            // THIS IS THE MOST IMPORTANT LINE FOR DEBUGGING
            console.log("===============================");
            console.log("GOOGLE API ERROR REASON:");
            console.log(error); 
            console.log("===============================");
        }

        socket.emit('receive_message', {
            text: botReply,
            name: 'AI Bot'
        });
    });
});

server.listen(3001, () => {
    console.log('SERVER RUNNING ON PORT 3001');
});