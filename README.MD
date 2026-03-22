# 💬 AI-Powered ChatBot Hub

A full-stack, real-time chat application built with **Node.js**, **Socket.io**, and **Google Gemini AI**. This project features an intelligent ChatBot capable of natural language processing, answering complex queries, and fetching real-time data.

## ✨ Features

* **LLM Integration:** Powered by the **Google Gemini 2.5 Flash** model for intelligent, context-aware conversations.
* **Real-Time Communication:** Uses WebSockets (Socket.io) for instant, low-latency messaging.
* **Hybrid Logic:** Combines custom API fetching (Official Joke API) with Generative AI fallback.
* **Secure Architecture:** Implements `dotenv` for protected API key management and a clean `.gitignore` for professional repository standards.
* **Dynamic UI:** Features "AI is typing..." indicators and auto-scrolling for a seamless user experience.

## 🛠️ Tech Stack

* **Frontend:** HTML5, CSS3, JavaScript (ES6+)
* **Backend:** Node.js, Express.js
* **AI/ML:** Google Generative AI SDK
* **Real-Time:** Socket.io
* **Environment:** Dotenv (Secure Secret Management)

## 📂 Project Structure

```text
chat-hub/
├── client/                 # Frontend UI and logic
│   ├── index.html          
│   ├── style.css           
│   └── script.js           
├── server/                 # Backend infrastructure
│   ├── .env                # Secret API Keys (Git-ignored)
│   ├── index.js            # Node/Express & AI Logic
│   └── package.json        
├── .gitignore              # Security rules
└── README.md
