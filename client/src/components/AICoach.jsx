import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';

function TypingIndicator() {
  return (
    <div className="flex items-center gap-1 px-4 py-3 bg-mint rounded-2xl rounded-bl-md w-fit">
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className="typing-dot w-2 h-2 bg-teal rounded-full block"
          style={{ animationDelay: `${i * 0.2}s` }}
        />
      ))}
    </div>
  );
}

export default function AICoach({ moduleTitle, moduleContext }) {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: `Hi! 👋 I'm your AI coach for **${moduleTitle}**. Ask me anything about this module — I'm here to help.`,
    },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const bottomRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (open) {
      bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
      inputRef.current?.focus();
    }
  }, [open, messages]);

  async function sendMessage(e) {
    e.preventDefault();
    const text = input.trim();
    if (!text || loading) return;

    const userMsg = { role: 'user', content: text };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setLoading(true);
    setError(null);

    try {
      const apiMessages = [...messages, userMsg]
        .filter((m) => m.role === 'user' || (m.role === 'assistant' && !m.content.startsWith('Hi! 👋')))
        .concat(messages.length === 1 ? [userMsg] : []);

      const { data } = await axios.post('/api/chat', {
        messages: [...messages.filter(m => m.role !== 'assistant' || !m.content.startsWith('Hi!')), userMsg].map(({ role, content }) => ({ role, content })),
        moduleContext: `${moduleTitle}. ${moduleContext || ''}`,
      });
      setMessages((prev) => [...prev, { role: 'assistant', content: data.content }]);
    } catch (err) {
      const msg = err.response?.data?.error || 'AI Coach is taking a break — try again in a moment.';
      setError(msg);
    } finally {
      setLoading(false);
    }
  }

  function renderContent(text) {
    return text
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\n/g, '<br />');
  }

  return (
    <>
      {/* Floating toggle button */}
      <button
        onClick={() => setOpen((o) => !o)}
        aria-label="Open AI Coach"
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-teal text-white shadow-xl flex items-center justify-center text-2xl hover:scale-110 transition-transform"
      >
        {open ? '✕' : '🤖'}
      </button>

      {/* Panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-24 right-4 sm:right-6 z-50 w-80 sm:w-96 bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden"
            style={{ maxHeight: '480px' }}
          >
            {/* Header */}
            <div className="bg-navy text-white px-4 py-3 flex items-center gap-2">
              <span className="text-xl">🤖</span>
              <div>
                <p className="font-bold text-sm">AI Coach</p>
                <p className="text-xs opacity-60">{moduleTitle}</p>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3" style={{ minHeight: '200px' }}>
              {messages.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div
                    className={msg.role === 'user' ? 'ai-message-user' : 'ai-message-assistant'}
                    dangerouslySetInnerHTML={{ __html: renderContent(msg.content) }}
                  />
                </div>
              ))}
              {loading && (
                <div className="flex justify-start">
                  <TypingIndicator />
                </div>
              )}
              {error && (
                <div className="text-xs text-coral bg-red-50 rounded-xl px-3 py-2">{error}</div>
              )}
              <div ref={bottomRef} />
            </div>

            {/* Input */}
            <form onSubmit={sendMessage} className="border-t border-gray-100 p-3 flex gap-2">
              <input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask me anything..."
                disabled={loading}
                className="flex-1 text-sm border-2 border-gray-200 rounded-xl px-3 py-2 focus:outline-none focus:border-teal disabled:opacity-50"
              />
              <button
                type="submit"
                disabled={!input.trim() || loading}
                className="bg-teal text-white rounded-xl px-3 py-2 font-bold text-sm disabled:opacity-40 hover:bg-opacity-90 transition-opacity"
              >
                →
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
