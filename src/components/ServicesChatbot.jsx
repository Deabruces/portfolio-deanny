import { useState, useRef, useEffect } from 'react';

export default function ServicesChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: '¡Hola! 👋 Soy tu asistente virtual. Cuéntame sobre tu proyecto o negocio y te ayudaré a identificar qué servicios se ajustan mejor a tus necesidades.',
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');

    // Add user message
    setMessages((prev) => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);

    try {
      const response = await fetch('/api/chatbot', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: userMessage,
          conversationHistory: messages,
        }),
      });

      const data = await response.json();

      if (data.error) {
        throw new Error(data.error);
      }

      // Add AI response
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: data.response,
          recommendations: data.recommendations,
        },
      ]);
    } catch (error) {
      console.error('Error:', error);
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content:
            'Lo siento, hubo un error al procesar tu mensaje. Por favor, intenta de nuevo o contacta directamente.',
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const quickQuestions = [
    'Necesito una página web para mi negocio',
    'Quiero vender productos online',
    'Necesito automatizar procesos repetitivos',
    'Mi web es muy lenta',
  ];

  const handleQuickQuestion = (question) => {
    setInput(question);
    setTimeout(() => {
      inputRef.current?.focus();
    }, 100);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleReset = () => {
    setMessages([
      {
        role: 'assistant',
        content: '¡Hola! 👋 Soy tu asistente virtual. Cuéntame sobre tu proyecto o negocio y te ayudaré a identificar qué servicios se ajustan mejor a tus necesidades.',
      },
    ]);
    setInput('');
  };

  return (
    <>
      {/* Floating Chat Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="chat-button"
          aria-label="Abrir chat de ayuda"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          </svg>
          <span className="chat-badge">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2L2 7l10 5 10-5-10-5z" />
              <path d="M2 17l10 5 10-5" />
              <path d="M2 12l10 5 10-5" />
            </svg>
          </span>
          <span className="chat-label">Deanny AI</span>
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="chat-window">
          {/* Header */}
          <div className="chat-header">
            <div className="chat-header-info">
              <div className="chat-avatar">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M12 2L2 7l10 5 10-5-10-5z" />
                  <path d="M2 17l10 5 10-5" />
                  <path d="M2 12l10 5 10-5" />
                </svg>
              </div>
              <div>
                <h3>Deanny AI</h3>
                <p>
                  <span className="status-dot"></span>
                  Asistente Inteligente
                </p>
              </div>
            </div>
            <div className="chat-actions">
              <button
                onClick={handleReset}
                className="icon-button"
                aria-label="Reiniciar conversación"
                title="Reiniciar"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <polyline points="1 4 1 10 7 10" />
                  <polyline points="23 20 23 14 17 14" />
                  <path d="M20.49 9A9 9 0 0 0 5.64 5.64L1 10m22 4l-4.64 4.36A9 9 0 0 1 3.51 15" />
                </svg>
              </button>
              <button
                onClick={handleClose}
                className="icon-button"
                aria-label="Cerrar chat"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>
          </div>

          {/* Messages */}
          <div className="chat-messages">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`message ${message.role === 'user' ? 'message-user' : 'message-assistant'}`}
              >
                {message.role === 'assistant' && (
                  <div className="message-avatar">
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M12 2L2 7l10 5 10-5-10-5z" />
                      <path d="M2 17l10 5 10-5" />
                      <path d="M2 12l10 5 10-5" />
                    </svg>
                  </div>
                )}
                <div className="message-content">
                  <p>{message.content}</p>

                  {/* Service Recommendations */}
                  {message.recommendations && message.recommendations.length > 0 && (
                    <div className="recommendations">
                      <h4>Servicios recomendados:</h4>
                      <div className="recommendations-grid">
                        {message.recommendations.map((rec, idx) => (
                          <div key={idx} className="recommendation-card">
                            <div className="recommendation-header">
                              <span className="recommendation-icon">{rec.icon}</span>
                              <h5>{rec.name}</h5>
                            </div>
                            <p>{rec.reason}</p>
                            <div className="recommendation-tags">
                              {rec.benefits.map((benefit, bidx) => (
                                <span key={bidx} className="tag">
                                  {benefit}
                                </span>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                      <div className="recommendation-actions">
                        <a
                          href="https://calendar.app.google/7zL3cZ713aYB9tCW6"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn-primary-chat"
                        >
                          Agendar Consultoría Gratuita
                        </a>
                        <a href="/contacto" className="btn-secondary-chat">
                          Enviar Mensaje
                        </a>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="message message-assistant">
                <div className="message-avatar">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M12 2L2 7l10 5 10-5-10-5z" />
                    <path d="M2 17l10 5 10-5" />
                    <path d="M2 12l10 5 10-5" />
                  </svg>
                </div>
                <div className="message-content">
                  <div className="typing-indicator">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Questions */}
          {messages.length === 1 && (
            <div className="quick-questions">
              <p className="quick-questions-label">Preguntas frecuentes:</p>
              <div className="quick-questions-grid">
                {quickQuestions.map((question, index) => (
                  <button
                    key={index}
                    onClick={() => handleQuickQuestion(question)}
                    className="quick-question-btn"
                  >
                    {question}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Input */}
          <form onSubmit={handleSubmit} className="chat-input-container">
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Describe tu proyecto o necesidad..."
              className="chat-input"
              disabled={isLoading}
            />
            <button
              type="submit"
              className="chat-send-btn"
              disabled={isLoading || !input.trim()}
              aria-label="Enviar mensaje"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <line x1="22" y1="2" x2="11" y2="13" />
                <polygon points="22 2 15 22 11 13 2 9 22 2" />
              </svg>
            </button>
          </form>

          {/* Footer */}
          <div className="chat-footer">
            <p>
              Powered by AI • <a href="/plantillas">Ver automatizaciones</a>
            </p>
          </div>
        </div>
      )}

      <style>{`
        /* Chat Button */
        .chat-button {
          position: fixed;
          bottom: 7.5rem;
          right: 2rem;
          z-index: 1000;

          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 0.25rem;

          padding: 0.75rem 1.25rem;
          border: none;
          border-radius: 2rem;

          background: linear-gradient(135deg, #14b8a6, #06b6d4, #8b5cf6);
          background-size: 200% 200%;
          color: white;

          box-shadow: 0 10px 30px rgba(20, 184, 166, 0.5);
          cursor: pointer;

          transition: all 0.3s ease;
          animation: gradientShift 3s ease infinite, float 3s ease-in-out infinite;
        }

        @keyframes gradientShift {
          0%, 100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        @keyframes pulse-ring {
          0% {
            transform: scale(0.95);
            opacity: 1;
          }
          100% {
            transform: scale(1.3);
            opacity: 0;
          }
        }

        .chat-button::before {
          content: '';
          position: absolute;
          inset: -4px;
          border-radius: 2rem;
          background: linear-gradient(135deg, #14b8a6, #06b6d4, #8b5cf6);
          background-size: 200% 200%;
          opacity: 0.6;
          z-index: -1;
          animation: gradientShift 3s ease infinite, pulse-ring 2s ease-out infinite;
        }

        .chat-button:hover {
          transform: scale(1.05) translateY(-5px);
          box-shadow: 0 20px 50px rgba(20, 184, 166, 0.7);
        }

        .chat-badge {
          display: flex;
          align-items: center;
          justify-content: center;

          width: 24px;
          height: 24px;
          border-radius: 50%;

          background: rgba(255, 255, 255, 0.3);
          color: white;

          animation: rotate 4s linear infinite;
        }

        @keyframes rotate {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        .chat-label {
          font-size: 0.875rem;
          font-weight: 700;
          text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
          letter-spacing: 0.5px;
        }

        /* Chat Window */
        .chat-window {
          position: fixed;
          bottom: 2rem;
          right: 2rem;
          z-index: 1000;

          display: flex;
          flex-direction: column;

          width: min(450px, calc(100vw - 2rem));
          height: min(650px, calc(100vh - 4rem));

          background: light-dark(white, #1e293b);
          border-radius: 1.5rem;

          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
          overflow: hidden;

          animation: slideIn 0.3s ease-out;
        }

        @keyframes slideIn {
          from {
            transform: translateY(20px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }

        /* Header */
        .chat-header {
          display: flex;
          align-items: center;
          justify-content: space-between;

          padding: 1.25rem;
          background: linear-gradient(135deg, #14b8a6, #06b6d4);
          color: white;
        }

        .chat-header-info {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .chat-avatar {
          display: flex;
          align-items: center;
          justify-content: center;

          width: 40px;
          height: 40px;
          border-radius: 50%;

          background: rgba(255, 255, 255, 0.2);
        }

        .chat-header h3 {
          margin: 0;
          font-size: 1rem;
          font-weight: 700;
        }

        .chat-header p {
          margin: 0;
          font-size: 0.75rem;
          opacity: 0.9;

          display: flex;
          align-items: center;
          gap: 0.375rem;
        }

        .status-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #22c55e;
          animation: pulse 2s infinite;
        }

        @keyframes pulse {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.5;
          }
        }

        .chat-actions {
          display: flex;
          gap: 0.5rem;
        }

        .icon-button {
          display: flex;
          align-items: center;
          justify-content: center;

          width: 36px;
          height: 36px;
          padding: 0;
          border: none;
          border-radius: 0.5rem;

          background: rgba(255, 255, 255, 0.2);
          color: white;

          cursor: pointer;
          transition: all 0.2s ease;
        }

        .icon-button:hover {
          background: rgba(255, 255, 255, 0.3);
        }

        /* Messages */
        .chat-messages {
          flex: 1;
          overflow-y: auto;
          padding: 1.5rem;

          background: light-dark(#f8fafc, #0f172a);
        }

        .message {
          display: flex;
          gap: 0.75rem;
          margin-bottom: 1.5rem;
        }

        .message-user {
          flex-direction: row-reverse;
        }

        .message-avatar {
          flex-shrink: 0;
          display: flex;
          align-items: center;
          justify-content: center;

          width: 32px;
          height: 32px;
          border-radius: 50%;

          background: linear-gradient(135deg, #14b8a6, #06b6d4);
          color: white;
        }

        .message-content {
          max-width: 80%;
          padding: 1rem;
          border-radius: 1rem;

          background: light-dark(white, #1e293b);
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        }

        .message-user .message-content {
          background: linear-gradient(135deg, #14b8a6, #06b6d4);
          color: white;
        }

        .message-content p {
          margin: 0;
          font-size: 0.925rem;
          line-height: 1.5;
          color: inherit;
        }

        /* Typing Indicator */
        .typing-indicator {
          display: flex;
          gap: 0.375rem;
          padding: 0.5rem 0;
        }

        .typing-indicator span {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: light-dark(#94a3b8, #64748b);
          animation: typing 1.4s infinite;
        }

        .typing-indicator span:nth-child(2) {
          animation-delay: 0.2s;
        }

        .typing-indicator span:nth-child(3) {
          animation-delay: 0.4s;
        }

        @keyframes typing {
          0%, 60%, 100% {
            transform: translateY(0);
          }
          30% {
            transform: translateY(-10px);
          }
        }

        /* Recommendations */
        .recommendations {
          margin-top: 1rem;
          padding-top: 1rem;
          border-top: 2px solid light-dark(#e2e8f0, #334155);
        }

        .recommendations h4 {
          margin: 0 0 1rem 0;
          font-size: 0.875rem;
          font-weight: 700;
          color: light-dark(#0f172a, white);
        }

        .recommendations-grid {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
          margin-bottom: 1rem;
        }

        .recommendation-card {
          padding: 1rem;
          background: light-dark(#f8fafc, #0f172a);
          border-radius: 0.75rem;
          border: 1px solid light-dark(#e2e8f0, #334155);
        }

        .recommendation-header {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          margin-bottom: 0.5rem;
        }

        .recommendation-icon {
          font-size: 1.5rem;
        }

        .recommendation-card h5 {
          margin: 0;
          font-size: 0.875rem;
          font-weight: 700;
          color: light-dark(#0f172a, white);
        }

        .recommendation-card p {
          margin: 0 0 0.75rem 0;
          font-size: 0.8rem;
          line-height: 1.4;
          color: light-dark(#475569, #cbd5e1);
        }

        .recommendation-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 0.375rem;
        }

        .tag {
          padding: 0.25rem 0.625rem;
          border-radius: 0.375rem;
          background: light-dark(rgba(20, 184, 166, 0.1), rgba(20, 184, 166, 0.2));
          color: light-dark(#0d9488, #5eead4);
          font-size: 0.7rem;
          font-weight: 600;
        }

        .recommendation-actions {
          display: flex;
          gap: 0.5rem;
          margin-top: 1rem;
        }

        .btn-primary-chat,
        .btn-secondary-chat {
          flex: 1;
          padding: 0.625rem 1rem;
          border-radius: 0.5rem;
          font-size: 0.75rem;
          font-weight: 700;
          text-align: center;
          text-decoration: none;
          transition: all 0.2s ease;
        }

        .btn-primary-chat {
          background: linear-gradient(135deg, #14b8a6, #06b6d4);
          color: white;
        }

        .btn-primary-chat:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(20, 184, 166, 0.4);
        }

        .btn-secondary-chat {
          background: light-dark(#f1f5f9, #334155);
          color: light-dark(#0f172a, #e2e8f0);
        }

        .btn-secondary-chat:hover {
          background: light-dark(#e2e8f0, #475569);
        }

        /* Quick Questions */
        .quick-questions {
          padding: 1rem 1.5rem;
          background: light-dark(white, #1e293b);
          border-top: 1px solid light-dark(#e2e8f0, #334155);
        }

        .quick-questions-label {
          margin: 0 0 0.75rem 0;
          font-size: 0.75rem;
          font-weight: 600;
          color: light-dark(#1e293b, #e2e8f0);
        }

        .quick-questions-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 0.5rem;
        }

        .quick-question-btn {
          padding: 0.625rem;
          border: 1px solid light-dark(#e2e8f0, #334155);
          border-radius: 0.5rem;
          background: light-dark(#f8fafc, #0f172a);
          color: light-dark(#1e293b, #e2e8f0);

          font-size: 0.75rem;
          text-align: left;

          cursor: pointer;
          transition: all 0.2s ease;
        }

        .quick-question-btn:hover {
          border-color: #14b8a6;
          background: light-dark(rgba(20, 184, 166, 0.05), rgba(20, 184, 166, 0.1));
          color: light-dark(#0d9488, #5eead4);
        }

        /* Input */
        .chat-input-container {
          display: flex;
          gap: 0.75rem;
          padding: 1rem 1.5rem;
          background: light-dark(white, #1e293b);
          border-top: 1px solid light-dark(#e2e8f0, #334155);
        }

        .chat-input {
          flex: 1;
          padding: 0.75rem 1rem;
          border: 2px solid light-dark(#e2e8f0, #334155);
          border-radius: 0.75rem;

          background: light-dark(#f8fafc, #0f172a);
          color: light-dark(#0f172a, white);

          font-size: 0.875rem;
          outline: none;

          transition: all 0.2s ease;
        }

        .chat-input:focus {
          border-color: #14b8a6;
        }

        .chat-input::placeholder {
          color: light-dark(#94a3b8, #64748b);
        }

        .chat-send-btn {
          flex-shrink: 0;
          width: 44px;
          height: 44px;
          padding: 0;
          border: none;
          border-radius: 0.75rem;

          background: linear-gradient(135deg, #14b8a6, #06b6d4);
          color: white;

          cursor: pointer;
          transition: all 0.2s ease;
        }

        .chat-send-btn:hover:not(:disabled) {
          transform: scale(1.05);
          box-shadow: 0 4px 12px rgba(20, 184, 166, 0.4);
        }

        .chat-send-btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        /* Footer */
        .chat-footer {
          padding: 0.75rem 1.5rem;
          background: light-dark(#f8fafc, #0f172a);
          border-top: 1px solid light-dark(#e2e8f0, #334155);
          text-align: center;
        }

        .chat-footer p {
          margin: 0;
          font-size: 0.7rem;
          color: light-dark(#475569, #94a3b8);
        }

        .chat-footer a {
          color: #14b8a6;
          text-decoration: none;
          font-weight: 600;
        }

        .chat-footer a:hover {
          text-decoration: underline;
        }

        /* Accessibility - Reduced Motion */
        @media (prefers-reduced-motion: reduce) {
          .chat-button,
          .chat-button::before,
          .chat-badge,
          .status-dot,
          .typing-indicator span {
            animation: none !important;
          }

          .chat-button:hover,
          .chat-window,
          .message,
          .btn-primary-chat:hover,
          .chat-send-btn:hover:not(:disabled) {
            transition: none !important;
          }
        }

        /* Responsive */
        @media (max-width: 640px) {
          .chat-window {
            bottom: 0;
            right: 0;
            width: 100vw;
            height: 100vh;
            border-radius: 0;
          }

          .chat-button {
            bottom: 6rem;
            right: 1.5rem;
            padding: 0.625rem 1rem;
          }

          .chat-label {
            font-size: 0.75rem;
          }

          .quick-questions-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </>
  );
}
