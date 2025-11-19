// Chatbot functionality
const chatMessages = document.getElementById('chatMessages');
const chatInput = document.getElementById('chatInput');
const sendBtn = document.getElementById('sendBtn');
const loadingDiv = document.getElementById('loading');

// Initialize chat
function initChat() {
    chatMessages.innerHTML = '';
    addMessage('AI', 'Merhaba! Size nasıl yardımcı olabilirim?', 'bot');
}

// Add message to chat
function addMessage(sender, text, type) {
    const messageDiv = document.createElement('div');
    messageDiv.style.cssText = `
    margin-bottom: 15px;
    padding: 12px 16px;
    border-radius: 8px;
    max-width: 70%;
    ${type === 'user' ? 'margin-left: auto; background: #d2242a; color: white; text-align: right;' : 'background: white; color: #333;'}
  `;

    const senderSpan = document.createElement('div');
    senderSpan.style.cssText = 'font-weight: bold; margin-bottom: 5px; font-size: 12px;';
    senderSpan.textContent = sender;

    const textDiv = document.createElement('div');
    textDiv.style.cssText = 'line-height: 1.5;';
    textDiv.textContent = text;

    messageDiv.appendChild(senderSpan);
    messageDiv.appendChild(textDiv);
    chatMessages.appendChild(messageDiv);

    // Scroll to bottom
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Send message to Gemini API
async function sendMessage() {
    const message = chatInput.value.trim();
    const apiKey = document.getElementById('apiKey').value.trim();

    if (!message) {
        alert('Lütfen bir mesaj yazın');
        return;
    }

    if (!apiKey) {
        alert('Lütfen API anahtarınızı girin');
        return;
    }

    // Add user message
    addMessage('Siz', message, 'user');
    chatInput.value = '';

    // Show loading
    loadingDiv.style.display = 'block';
    sendBtn.disabled = true;

    try {
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-pro:generateContent?key=${apiKey}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                contents: [{
                    role: 'user',
                    parts: [{ text: message }]
                }],
                generationConfig: {
                    temperature: 0.7,
                    topK: 40,
                    topP: 0.95,
                    maxOutputTokens: 1024,
                }
            })
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(`API Hatası: ${response.status} - ${errorData.error?.message || 'Bilinmeyen hata'}`);
        }

        const data = await response.json();
        const aiResponse = data.candidates?.[0]?.content?.parts?.[0]?.text || 'Yanıt alınamadı';

        // Add AI response
        addMessage('AI', aiResponse, 'bot');

    } catch (error) {
        console.error('Chat error:', error);
        addMessage('Sistem', `Hata: ${error.message}`, 'bot');
    } finally {
        loadingDiv.style.display = 'none';
        sendBtn.disabled = false;
        chatInput.focus();
    }
}

// Event listeners
sendBtn.addEventListener('click', sendMessage);
chatInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        sendMessage();
    }
});

// Initialize on load
window.addEventListener('load', () => {
    initChat();
});
