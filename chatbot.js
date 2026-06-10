// ── CHATBOT TELOPEX ──
(function () {

  // Inject styles
  const style = document.createElement('style');
  style.textContent = `
    .tx-toggle {
      position: fixed; bottom: 24px; right: 24px;
      width: 56px; height: 56px; border-radius: 50%;
      background: linear-gradient(135deg, #7c3aed, #06b6d4);
      color: white; font-size: 1.4rem; border: none;
      cursor: pointer; z-index: 1000;
      box-shadow: 0 4px 24px rgba(124,58,237,0.5);
      transition: transform .2s;
      display: flex; align-items: center; justify-content: center;
    }
    .tx-toggle:hover { transform: scale(1.1); }

    .tx-window {
      position: fixed; bottom: 90px; right: 24px;
      width: 340px; height: 480px;
      background: #10101a;
      border: 1px solid rgba(124,58,237,0.3);
      border-radius: 16px;
      box-shadow: 0 8px 40px rgba(124,58,237,0.2);
      display: none; flex-direction: column;
      z-index: 1000; overflow: hidden;
      font-family: 'Inter', sans-serif;
    }
    .tx-window.open { display: flex; }

    .tx-header {
      background: linear-gradient(135deg, #7c3aed, #06b6d4);
      padding: 14px 16px;
      display: flex; align-items: center; gap: 10px;
    }
    .tx-header-logo {
      width: 36px; height: 36px; border-radius: 8px;
      background: rgba(255,255,255,0.2);
      display: flex; align-items: center; justify-content: center;
      font-weight: 800; font-size: .85rem; color: #fff;
    }
    .tx-header-name  { font-weight: 700; font-size: .95rem; color: #fff; }
    .tx-header-status { font-size: .72rem; color: rgba(255,255,255,0.8); }

    .tx-messages {
      flex: 1; overflow-y: auto; padding: 14px;
      display: flex; flex-direction: column; gap: 10px;
      background: #0a0a0f;
    }
    .tx-messages::-webkit-scrollbar { width: 4px; }
    .tx-messages::-webkit-scrollbar-thumb { background: rgba(124,58,237,0.3); border-radius: 2px; }

    .tx-msg { display: flex; gap: 8px; max-width: 85%; }
    .tx-msg.user { align-self: flex-end; flex-direction: row-reverse; }

    .tx-bubble {
      padding: 10px 14px; border-radius: 14px;
      font-size: .85rem; line-height: 1.5;
    }
    .tx-msg.assistant .tx-bubble {
      background: #16162a;
      border: 1px solid rgba(124,58,237,0.2);
      color: #f1f0f7;
      border-bottom-left-radius: 4px;
    }
    .tx-msg.user .tx-bubble {
      background: linear-gradient(135deg, #7c3aed, #a855f7);
      color: #fff;
      border-bottom-right-radius: 4px;
    }

    .tx-typing {
      display: flex; gap: 4px;
      align-items: center; padding: 12px 16px;
    }
    .tx-typing span {
      width: 7px; height: 7px; background: #7c3aed;
      border-radius: 50%; animation: txTyping 1.2s infinite;
    }
    .tx-typing span:nth-child(2) { animation-delay: .2s; }
    .tx-typing span:nth-child(3) { animation-delay: .4s; }
    @keyframes txTyping {
      0%,60%,100% { opacity: .3; transform: scale(.8); }
      30%          { opacity: 1;  transform: scale(1);  }
    }

    .tx-input-bar {
      padding: 12px;
      border-top: 1px solid rgba(124,58,237,0.2);
      display: flex; gap: 8px;
      background: #10101a;
    }
    .tx-input-bar input {
      flex: 1; background: #16162a;
      border: 1px solid rgba(124,58,237,0.2);
      border-radius: 10px; padding: 9px 12px;
      font-size: .85rem; color: #f1f0f7; outline: none;
      font-family: 'Inter', sans-serif;
    }
    .tx-input-bar input:focus { border-color: #7c3aed; }
    .tx-input-bar input::placeholder { color: #8b8aa0; }
    .tx-input-bar button {
      background: linear-gradient(135deg, #7c3aed, #06b6d4);
      border: none; border-radius: 10px;
      width: 38px; color: #fff; font-size: 1rem;
      cursor: pointer; transition: opacity .2s;
    }
    .tx-input-bar button:hover { opacity: .85; }
    .tx-input-bar button:disabled { opacity: .4; cursor: default; }

    @media (max-width: 400px) {
      .tx-window { width: calc(100vw - 16px); right: 8px; }
    }
  `;
  document.head.appendChild(style);

  // HTML
  const toggle = document.createElement('button');
  toggle.className = 'tx-toggle';
  toggle.innerHTML = '💬';
  toggle.setAttribute('aria-label', 'Ouvrir le chat Telopex');

  const win = document.createElement('div');
  win.className = 'tx-window';
  win.innerHTML = `
    <div class="tx-header">
      <div class="tx-header-logo">TX</div>
      <div>
        <div class="tx-header-name">Telopex Assistant</div>
        <div class="tx-header-status">● En ligne</div>
      </div>
    </div>
    <div class="tx-messages" id="txMessages"></div>
    <div class="tx-input-bar">
      <input id="txInput" type="text" placeholder="Votre message..." />
      <button id="txSend">➤</button>
    </div>
  `;

  document.body.appendChild(toggle);
  document.body.appendChild(win);

  // State
  const messages = [
    { role: 'assistant', content: '👋 Bonjour ! Je suis l\'assistant Telopex. Comment puis-je vous aider ? ⚡' }
  ];

  const messagesEl = win.querySelector('#txMessages');
  const input      = win.querySelector('#txInput');
  const sendBtn    = win.querySelector('#txSend');

  // Toggle
  toggle.addEventListener('click', () => {
    win.classList.toggle('open');
    toggle.innerHTML = win.classList.contains('open') ? '✕' : '💬';
    if (win.classList.contains('open')) renderMessages();
  });

  // Render
  function renderMessages() {
    messagesEl.innerHTML = messages.map(m => `
      <div class="tx-msg ${m.role}">
        <div class="tx-bubble">${m.content}</div>
      </div>`).join('');
    messagesEl.scrollTop = messagesEl.scrollHeight;
  }

  function addTyping() {
    const el = document.createElement('div');
    el.className = 'tx-msg assistant'; el.id = 'txTyping';
    el.innerHTML = `<div class="tx-bubble tx-typing"><span></span><span></span><span></span></div>`;
    messagesEl.appendChild(el);
    messagesEl.scrollTop = messagesEl.scrollHeight;
  }

  function removeTyping() {
    document.getElementById('txTyping')?.remove();
  }

  // Send
  async function send() {
    const text = input.value.trim();
    if (!text) return;

    messages.push({ role: 'user', content: text });
    input.value = '';
    sendBtn.disabled = true;
    renderMessages();
    addTyping();

    try {
      const { contact } = TELOPEX;
      const systemPrompt = `Tu es l'assistant virtuel de Telopex, une agence digitale basée à Abidjan, Côte d'Ivoire.
Tu réponds en français, de façon naturelle et professionnelle. Maximum 3 phrases.
Services : bots IA multi-canaux (WhatsApp, Telegram, Messenger), automation, développement web, formations.
Contact : ${contact.email} | WhatsApp : ${contact.whatsapp} | Site : ${contact.site}
Règles : Ne pas inventer de prix. Pour les devis, orienter vers ${contact.email}.`;

      const res = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-lite:generateContent?key=${window.GEMINI_KEY || ''}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [
              { role: 'user',  parts: [{ text: systemPrompt }] },
              { role: 'model', parts: [{ text: 'Compris ! Je suis l\'assistant Telopex.' }] },
              ...messages.slice(-8).map(m => ({
                role: m.role === 'assistant' ? 'model' : 'user',
                parts: [{ text: m.content }]
              }))
            ],
            generationConfig: { maxOutputTokens: 300, temperature: 0.7 }
          })
        }
      );

      const data  = await res.json();
      const reply = data.candidates?.[0]?.content?.parts?.[0]?.text
        || `Désolé, je n'ai pas pu répondre. Contactez-nous sur ${contact.email}.`;

      removeTyping();
      messages.push({ role: 'assistant', content: reply });
      renderMessages();

    } catch {
      removeTyping();
      messages.push({ role: 'assistant', content: `Une erreur est survenue. Contactez-nous sur ${TELOPEX.contact.email}.` });
      renderMessages();
    } finally {
      sendBtn.disabled = false;
      input.focus();
    }
  }

  sendBtn.addEventListener('click', send);
  input.addEventListener('keydown', e => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send(); }
  });

  renderMessages();
})();

