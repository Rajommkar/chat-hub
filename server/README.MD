# 💬 ChatBot Hub

A full-stack, real-time chat application built with **Node.js** and **Socket.io**. This project features an automated, asynchronous ChatBot that can respond to conversational prompts and fetch real-time data from an external public API.

## ✨ Features

* **Real-Time Bidirectional Communication:** Powered by WebSockets (Socket.io) for instant messaging without page reloads.
* **Smart ChatBot:** An automated bot that parses user input and responds contextually.
* **External API Integration:** The bot asynchronously fetches live data from the Official Joke API using `async/await`.
* **Dynamic UI Feedback:** Includes real-time "ChatBot is typing..." indicators.
* **Quality of Life:** Seamless UI with auto-scrolling and "Enter-key" to send functionality.

## 🛠️ Tech Stack

* **Frontend:** HTML5, CSS3, Vanilla JavaScript
* **Backend:** Node.js, Express.js
* **WebSockets:** Socket.io
* **Data Fetching:** Native Node Fetch API

## 📂 Project Structure

```text
chat-hub/
├── client/                 # Frontend UI and logic
│   ├── index.html          # Chat interface
│   ├── style.css           # Custom styling and animations
│   └── script.js           # Client-side Socket.io logic
├── server/                 # Backend infrastructure
│   ├── index.js            # Express server and Bot logic
│   └── package.json        # Node dependencies
└── README.md
