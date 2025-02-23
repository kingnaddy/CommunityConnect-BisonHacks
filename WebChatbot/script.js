// script.js
// Select elements
const hamburgerMenu = document.getElementById('hamburgerMenu');
const hamburgerContent = document.getElementById('hamburgerContent');
const createAccountButton = document.getElementById('createAccountButton');
const backToLoginButton = document.getElementById('backToLoginButton');
const loginFormContainer = document.getElementById('loginFormContainer');
const signUpFormContainer = document.getElementById('signUpFormContainer');
const loginForm = document.getElementById('loginForm');
const signUpForm = document.getElementById('signUpForm');
const loginMessage = document.getElementById('loginMessage');
const signUpMessage = document.getElementById('signUpMessage');
const chatWindow = document.getElementById('chatWindow');
const sendButton = document.getElementById('sendButton');
const chatInput = document.getElementById('chatInput');
const micButton = document.getElementById('micButton');


// Toggle the hamburger menu visibility
hamburgerMenu.addEventListener('click', () => {
    hamburgerContent.style.display = hamburgerContent.style.display === 'block' ? 'none' : 'block';
});

// Create Account button behavior (switch to Sign Up form)
createAccountButton.addEventListener('click', () => {
    loginFormContainer.style.display = 'none';
    signUpFormContainer.style.display = 'block';
    loginMessage.textContent = "";
});

// Back to Login button behavior
backToLoginButton.addEventListener('click', () => {
    signUpFormContainer.style.display = 'none';
    loginFormContainer.style.display = 'block';
    signUpMessage.textContent = "";
});

// Handle Login form submission
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find(u => u.username === username && u.password === password);
    if (user) {
        loginMessage.textContent = `${username} is logged in!`;
        loginMessage.style.color = 'green';
        sessionStorage.setItem('isLoggedIn', 'true');
        sessionStorage.setItem('username', username);

        loginFormContainer.style.display = 'none'; // Hide the form container *first*

        setTimeout(() => {
            hamburgerContent.style.display = 'none'; // Hide the menu content *later*
        }, 1500); // Adjust delay as needed

    } else {
        loginMessage.textContent = 'Incorrect username or password.';
        loginMessage.style.color = 'red';
    }
});

// Handle Sign Up form submission
signUpForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const newUsername = document.getElementById('newUsername').value;
    const newPassword = document.getElementById('newPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    const users = JSON.parse(localStorage.getItem('users')) || [];
    const existingUser = users.find(u => u.username === newUsername);
    if (existingUser) {
        signUpMessage.textContent = 'Username already exists. Please choose another one.';
        signUpMessage.style.color = 'red';
    } else if (newPassword === confirmPassword) {
        users.push({ username: newUsername, password: newPassword });
        localStorage.setItem('users', JSON.stringify(users));

        signUpMessage.textContent = 'Account created successfully!';
        signUpMessage.style.color = 'green';

        signUpFormContainer.style.display = 'none';
        loginFormContainer.style.display = 'block';
        signUpForm.reset(); // Clear form fields
    } else {
        signUpMessage.textContent = 'Passwords do not match.';
        signUpMessage.style.color = 'red';
    }
});

function displayMessage(message, sender) {
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('chat-message', sender);
    messageDiv.innerHTML = `<p>${message}</p>`;
    chatWindow.appendChild(messageDiv);
    chatWindow.scrollTop = chatWindow.scrollHeight;
}

sendButton.addEventListener('click', () => {
    const userMessage = chatInput.value.trim();
    if (userMessage !== "") {
        displayMessage(userMessage, 'user');
        chatInput.value = '';

        const botReply = getBotReply(userMessage); // Get reply using predefined responses
        displayMessage(botReply, 'bot');
    }
});

chatInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        sendButton.click();
    }
});

function getBotReply(userMessage) {
    let text = userMessage.toLowerCase().replace(/[^\w\s]/gi, "").replace(/[\d]/gi, "").trim();
    text = text
        .replace(/ a /g, " ")
        .replace(/i feel /g, "")
        .replace(/whats/g, "what is")
        .replace(/please /g, "")
        .replace(/ please/g, "")
        .replace(/r u/g, "are you");

    let botReply = compare(chatbotResponses, text);

    if (text.match(/thank/gi)) {
        botReply = "You're welcome!";
    } else if (!botReply) { // If no match is found
        botReply = alternativeResponses[Math.floor(Math.random() * alternativeResponses.length)];
    }

    return botReply;
}

function compare(responsesArray, string) {
    for (let i = 0; i < responsesArray.length; i++) {
        const entry = responsesArray[i];
        if (Array.isArray(entry.questions)) {
            for (let j = 0; j < entry.questions.length; j++) {
                if (entry.questions[j] === string) {
                    return getRandomResponse(entry.response);
                }
            }
        } else if (entry.questions === string) {
            return getRandomResponse(entry.response);
        }
    }
    return null;
}

function getRandomResponse(responses) {
    if (Array.isArray(responses)) {
        return responses[Math.floor(Math.random() * responses.length)];
    } else {
        return responses;
    }
}


// Microphone button click event
micButton.addEventListener('click', () => {
    if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
        const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();

        recognition.lang = 'en-US';

        recognition.onstart = () => {
            chatInput.placeholder = "Listening...";
        };

        recognition.onresult = (event) => {
            const transcript = event.results[0][0].transcript;
            chatInput.value = transcript;
            chatInput.placeholder = "Send a message...";
        };

        recognition.onerror = (event) => {
            console.error('Speech recognition error:', event.error);
            chatInput.placeholder = "Error occurred. Please try again.";
        };

        recognition.onend = () => {
            chatInput.placeholder = "Send a message...";
        };

        recognition.start();
    } else {
        alert('Speech Recognition API not supported in this browser.');
    }
});