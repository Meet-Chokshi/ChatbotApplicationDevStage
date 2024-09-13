const languages = {};

function loadLanguage(languageCode) {
    fetch(`Languages/${languageCode}.json`)
        .then(response => response.json())
        .then(data => {
            window.languageData = data;
            applyLanguage();
        });
}

function applyLanguage() {
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        const [category, subKey] = key.split('.');
        element.textContent = window.languageData[category][subKey];
    });

    const inputField = document.getElementById('userInput');
    if (inputField) inputField.placeholder = window.languageData.chat.placeholder || '';
}

function changeLanguage() {
    const languageSelect = document.getElementById('languageSelect');
    const selectedLanguage = languageSelect.value;
    localStorage.setItem('language', selectedLanguage);
    loadLanguage(selectedLanguage);
}

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

    var userMessageDiv = document.createElement('div');
    userMessageDiv.className = 'message user';
    userMessageDiv.innerHTML = '<p>' + userMessage + '</p>';
    chatArea.appendChild(userMessageDiv);

    var botResponse = getBotResponse(userMessage);

    var botMessageDiv = document.createElement('div');
    botMessageDiv.className = 'message bot';
    botMessageDiv.innerHTML = '<p>' + botResponse + '</p>';
    chatArea.appendChild(botMessageDiv);

    inputField.value = '';
    chatArea.scrollTop = chatArea.scrollHeight;
}

function getBotResponse(userMessage) {
    const lang = window.languageData.chat;
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

function redirectToBooking() {
    window.location.href = 'ticket-booking.html';
}

document.addEventListener('DOMContentLoaded', () => {
    const savedLanguage = localStorage.getItem('language') || 'en';
    loadLanguage(savedLanguage);
});
