// Language files (normally these would be imported from separate files)
const languages = {
    en: {
        greetings: "Hello! How can I help you today?",
        timings: "We are open from 9 AM to 5 PM every day.",
        pricing: "Tickets are $15 for adults, $10 for seniors, and $5 for children.",
        exhibit: "Our current exhibit is 'Impressionism: A New Perspective'.",
        goodbye: "Goodbye! Have a great day!",
        unknown: "Sorry, I didn't understand that. Can you please rephrase?",
    },
    es: {
        greetings: "¡Hola! ¿Cómo puedo ayudarte hoy?",
        timings: "Estamos abiertos de 9 AM a 5 PM todos los días.",
        pricing: "Las entradas cuestan $15 para adultos, $10 para mayores y $5 para niños.",
        exhibit: "Nuestra exposición actual es 'Impresionismo: Una nueva perspectiva'.",
        goodbye: "¡Adiós! ¡Que tengas un gran día!",
        unknown: "Lo siento, no entendí eso. ¿Puedes reformularlo?",
    }
};

// Default language
let currentLanguage = 'en';

// Change language based on user selection
function changeLanguage() {
    const languageSelect = document.getElementById('languageSelect');
    currentLanguage = languageSelect.value;
}

// Handle user input and display messages
function handleKeyDown(event) {
    if (event.key === 'Enter') {
        event.preventDefault();
        sendMessage();
    }
}

function sendMessage() {
    var inputField = document.getElementById('userInput');
    var chatArea = document.getElementById('chatArea');
    var userMessage = inputField.value.trim();

    if (userMessage === '') {
        return;
    }

    // Display user message
    var userMessageDiv = document.createElement('div');
    userMessageDiv.className = 'message user';
    userMessageDiv.innerHTML = '<p>' + userMessage + '</p>';
    chatArea.appendChild(userMessageDiv);

    // Generate bot response
    var botResponse = getBotResponse(userMessage);

    var botMessageDiv = document.createElement('div');
    botMessageDiv.className = 'message bot';
    botMessageDiv.innerHTML = '<p>' + botResponse + '</p>';
    chatArea.appendChild(botMessageDiv);

    // Clear input field
    inputField.value = '';

    // Scroll to bottom
    chatArea.scrollTop = chatArea.scrollHeight;
}

// Function to get bot response based on user message
function getBotResponse(userMessage) {
    const lang = languages[currentLanguage];
    userMessage = userMessage.toLowerCase();

    if (userMessage.includes('timing') || userMessage.includes('open')) {
        return lang.timings;
    } else if (userMessage.includes('ticket price') || userMessage.includes('price')) {
        return lang.pricing;
    } else if (userMessage.includes('current exhibit') || userMessage.includes('exhibit')) {
        return lang.exhibit;
    } else if (userMessage.includes('hello') || userMessage.includes('hey')) {
        return lang.greetings;
    } else if (userMessage.includes('goodbye') || userMessage.includes('bye')) {
        return lang.goodbye;
    } else {
        return lang.unknown;
    }
}
