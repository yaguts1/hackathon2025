import React, { useState, useRef, useEffect } from 'react';
import styles from './ChatBot.module.css';

const ChatBot = ({ webhookUrl }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const chatEndRef = useRef(null);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { sender: 'user', text: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 120000); // 2 minutos

      const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: input }),
        signal: controller.signal
      });

      clearTimeout(timeout);

      if (!response.ok) {
        throw new Error('Falha na resposta');
      }

      const data = await response.json();

      // 💬 Permite HTML vindo do bot com fallback seguro
      const botMessage = {
        sender: 'bot',
        html: data.reply || '<i>🤖 Sem resposta.</i>'
      };

      setMessages(prev => [...prev, botMessage]);
    } catch (err) {
      console.error('Erro ao enviar mensagem:', err);
      setMessages(prev => [...prev, {
        sender: 'bot',
        html: '<strong>⚠️ Ocorreu um erro</strong><br>Tente novamente ou verifique sua conexão.'
      }]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') sendMessage();
  };

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <>
      <div className={styles.fab} onClick={() => setOpen(prev => !prev)}>
        {open ? '✖' : '💬'}
      </div>

      {open && (
        <div className={`${styles.chatbot} ${expanded ? styles.expanded : ''}`}>
          <div className={styles.header}>
            🤖 MechaBot
            <button
              className={styles.expandBtn}
              onClick={() => setExpanded(!expanded)}
              title={expanded ? 'Minimizar' : 'Expandir'}
            >
              {expanded ? '↙' : '⤢'}
            </button>
          </div>

          <div className={styles.chatBox}>
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`${styles.message} ${styles[msg.sender]}`}
                dangerouslySetInnerHTML={{ __html: msg.html || msg.text }}
              />
            ))}
            <div ref={chatEndRef} />
          </div>

          <div className={styles.inputArea}>
            <input
              type="text"
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={loading ? 'Aguardando resposta...' : 'Digite sua dúvida...'}
              disabled={loading}
            />
            <button onClick={sendMessage} disabled={loading}>
              {loading ? '⏳' : 'Enviar'}
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatBot;
