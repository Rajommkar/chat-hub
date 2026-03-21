const socket = io('http://localhost:3001');

const messageInput = document.getElementById('message-input');
const sendBtn = document.getElementById('send-btn');
const messageContainer = document.getElementById('message-container');

// Helper function to easily put messages on the screen
function appendMessage(msg, type) {
    const msgElement = document.createElement('div');
    // This adds the base "message" class, plus either "sent" (blue) or "received" (grey)
    msgElement.classList.add('message', type); 
    msgElement.innerText = msg;
    
    messageContainer.appendChild(msgElement);
    messageContainer.scrollTop = messageContainer.scrollHeight; // Auto-scroll to bottom
}

// 1. When YOU click "Send"
sendBtn.onclick = () => {
    const message = messageInput.value;
    if (message !== "") {
        appendMessage(message, 'sent');       // Instantly show YOUR message on the right (Blue)
        socket.emit('send_message', message); // Send the text to the server for others
        messageInput.value = "";              // Clear the input box
    }
};

// 2. When SOMEONE ELSE sends a message
socket.on('receive_message', (message) => {
    appendMessage(message, 'received');       // Show THEIR message on the left (Grey)
});