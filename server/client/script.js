const socket = io('http://localhost:3001');

const messageInput = document.getElementById('message-input');
const sendBtn = document.getElementById('send-btn');
const messageContainer = document.getElementById('message-container');
const feedback = document.getElementById('feedback'); 

function appendMessage(msg, type, senderName) {
    const msgElement = document.createElement('div');
    msgElement.classList.add('message', type); 
    msgElement.innerHTML = `<strong>${senderName}:</strong> ${msg}`;
    
    messageContainer.appendChild(msgElement);
    messageContainer.scrollTop = messageContainer.scrollHeight;
}

// 1. Send Message Logic
sendBtn.onclick = () => {
    const message = messageInput.value;
    if (message !== "") {
        appendMessage(message, 'sent', "You"); // Puts YOUR message on the right (Blue)
        
        // Send it to the server so the bot can read it
        socket.emit('send_message', { text: message }); 
        messageInput.value = ""; 
    }
};

// 2. Enter Key Feature
messageInput.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        event.preventDefault(); 
        sendBtn.click();        
    }
});

// 3. Receive the Bot's Reply
socket.on('receive_message', (data) => {
    // Clear the typing indicator early just in case
    if(feedback) feedback.innerHTML = "";
    // Puts BOT'S message on the left (Grey)
    appendMessage(data.text, 'received', data.name); 
});

// 4. Show "Bot is typing..."
let typingTimer;
socket.on('user_typing', (name) => {
    if(feedback) {
        feedback.innerHTML = `${name} is typing...`;
        clearTimeout(typingTimer);
        typingTimer = setTimeout(() => {
            feedback.innerHTML = "";
        }, 2000);
    }
});