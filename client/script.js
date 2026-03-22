const socket = io('http://localhost:3001');

const messageInput = document.getElementById('message-input');
const sendBtn = document.getElementById('send-btn');
const messageContainer = document.getElementById('message-container');

// 1. Ask the user for their name right when the page loads
const userName = prompt("Enter your chat name:") || "Anonymous";

// 2. Updated Helper Function to include names
function appendMessage(msg, type, senderName) {
    const msgElement = document.createElement('div');
    msgElement.classList.add('message', type); 
    
    // We use innerHTML here so we can make the name bold
    msgElement.innerHTML = `<strong>${senderName}:</strong> ${msg}`;
    
    messageContainer.appendChild(msgElement);
    messageContainer.scrollTop = messageContainer.scrollHeight;
}

// 3. Send Message Logic
sendBtn.onclick = () => {
    const message = messageInput.value;
    if (message !== "") {
        appendMessage(message, 'sent', "You"); // Shows "You: [message]" on your screen
        
        // We now send an object containing BOTH the message and the user's name
        socket.emit('send_message', { 
            text: message, 
            name: userName 
        }); 
        
        messageInput.value = ""; 
    }
};

// 4. THE ENTER KEY FEATURE
messageInput.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        event.preventDefault(); // Stops the enter key from doing anything weird
        sendBtn.click();        // Triggers the send button click automatically
    }
});

// 5. Receiving a message from someone else
socket.on('receive_message', (data) => {
    // We pull the text and the name out of the data object the server sent back
    appendMessage(data.text, 'received', data.name); 
});