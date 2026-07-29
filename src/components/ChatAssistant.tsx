import { useState, useRef, useEffect, type FormEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Sparkles, Bot } from 'lucide-react';
import { supabase } from '@/lib/supabase';

type Message = { role: 'user' | 'assistant'; content: string };

const SUGGESTIONS = [
  'How does the 3D designer work?',
  'What styles can I explore?',
  'Tell me about pricing',
  'Tips for small spaces',
];

export default function ChatAssistant() {
  const [open, setOpen] = useState(false);
  const [hasUnread, setHasUnread] = useState(true);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: "Hi there! I'm your Atelier design assistant. Ask me about interior design, room styling, or how to use this platform.",
    },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
    }
  }, [messages, loading]);

  useEffect(() => {
    if (open) {
      setHasUnread(false);
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [open]);

  const sendMessage = async (text: string) => {
    if (!text.trim() || loading) return;

    const userMsg: Message = { role: 'user', content: text };
    const updatedMessages = [...messages, userMsg];
    setMessages(updatedMessages);
    setInput('');
    setLoading(true);

    try {
      const { data, error } = await supabase.functions.invoke('chat', {
        body: { messages: updatedMessages.map((m) => ({ role: m.role, content: m.content })) },
      });

      if (error || !data?.reply) {
        setMessages((prev) => [
          ...prev,
          { role: 'assistant', content: "I'm having trouble connecting right now. Please try again in a moment." },
        ]);
      } else {
        setMessages((prev) => [...prev, { role: 'assistant', content: data.reply }]);
      }
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: "Something went wrong. Please try again." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    sendMessage(input);
  };

  return (
    <>
      {/* Floating button with pulse ring */}
      <div className="fixed bottom-6 right-6 z-50">
        <AnimatePresence>
          {!open && hasUnread && (
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-terracotta text-white text-[10px] font-bold flex items-center justify-center shadow-md z-10"
            >
              1
            </motion.div>
          )}
        </AnimatePresence>
        <motion.button
          onClick={() => setOpen((v) => !v)}
          className="relative w-14 h-14 rounded-full bg-gradient-to-br from-sage to-olive text-white shadow-lg shadow-olive/40 flex items-center justify-center hover:shadow-xl hover:shadow-olive/50 transition-all"
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.92 }}
          aria-label="Open chat assistant"
        >
          {!open && (
            <motion.span
              className="absolute inset-0 rounded-full bg-sage"
              animate={{ scale: [1, 1.4], opacity: [0.5, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeOut' }}
            />
          )}
          <AnimatePresence mode="wait">
            {open ? (
              <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.15 }}>
                <X className="w-6 h-6 relative z-10" />
              </motion.div>
            ) : (
              <motion.div key="open" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.15 }}>
                <MessageCircle className="w-6 h-6 relative z-10" />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>
      </div>

      {/* Chat panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.92 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="fixed bottom-24 right-6 z-50 w-[calc(100vw-3rem)] sm:w-[400px] h-[520px] max-h-[75vh] rounded-3xl bg-warmwhite border border-stone/30 shadow-2xl flex flex-col overflow-hidden"
          >
            {/* Header with gradient */}
            <div className="relative px-5 py-4 bg-gradient-to-br from-sage via-olive to-olive text-white flex items-center gap-3">
              <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 80% 20%, white 1px, transparent 1px)', backgroundSize: '24px 24px' }} />
              <div className="relative w-11 h-11 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center border border-white/20">
                <Sparkles className="w-5 h-5" />
              </div>
              <div className="relative flex-1">
                <h3 className="font-display text-lg font-medium leading-tight">Atelier Assistant</h3>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <span className="w-2 h-2 rounded-full bg-success animate-pulse" />
                  <p className="text-xs text-white/85">Online — AI-powered design help</p>
                </div>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="relative w-8 h-8 rounded-full hover:bg-white/15 flex items-center justify-center transition-colors"
                aria-label="Close chat"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Messages */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-4 space-y-3 bg-gradient-to-b from-warmwhite to-ivory/50">
              {messages.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className={`flex items-end gap-2 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
                >
                  {msg.role === 'assistant' && (
                    <div className="w-7 h-7 rounded-full bg-gradient-to-br from-sage to-olive flex items-center justify-center flex-shrink-0 mb-0.5">
                      <Bot className="w-4 h-4 text-white" />
                    </div>
                  )}
                  <div
                    className={`max-w-[78%] px-4 py-2.5 text-sm leading-relaxed ${
                      msg.role === 'user'
                        ? 'bg-gradient-to-br from-sage to-olive text-white rounded-2xl rounded-br-md shadow-sm shadow-olive/20'
                        : 'bg-white border border-stone/25 text-ink rounded-2xl rounded-bl-md shadow-soft'
                    }`}
                  >
                    {msg.content}
                  </div>
                </motion.div>
              ))}

              {loading && (
                <div className="flex items-end gap-2">
                  <div className="w-7 h-7 rounded-full bg-gradient-to-br from-sage to-olive flex items-center justify-center flex-shrink-0 mb-0.5">
                    <Bot className="w-4 h-4 text-white" />
                  </div>
                  <div className="bg-white border border-stone/25 rounded-2xl rounded-bl-md px-4 py-3.5 flex gap-1.5 shadow-soft">
                    {[0, 150, 300].map((delay) => (
                      <span
                        key={delay}
                        className="w-2 h-2 rounded-full bg-olive/50 animate-bounce"
                        style={{ animationDelay: `${delay}ms` }}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Suggestions on first load */}
              {messages.length === 1 && !loading && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="pt-2 space-y-2.5"
                >
                  <p className="text-xs text-muted text-center font-medium">Suggested questions</p>
                  <div className="flex flex-wrap gap-2 justify-center">
                    {SUGGESTIONS.map((s, idx) => (
                      <motion.button
                        key={s}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.4 + idx * 0.05 }}
                        onClick={() => sendMessage(s)}
                        className="text-xs px-3.5 py-2 rounded-full bg-white border border-stone/30 text-slatey hover:border-sage hover:text-olive hover:bg-sage/5 transition-all shadow-sm"
                      >
                        {s}
                      </motion.button>
                    ))}
                  </div>
                </motion.div>
              )}
            </div>

            {/* Input */}
            <form onSubmit={handleSubmit} className="p-3.5 border-t border-stone/20 bg-white/80 backdrop-blur-sm">
              <div className="flex items-center gap-2.5">
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask about interior design..."
                  className="flex-1 px-4 py-3 rounded-2xl bg-warmwhite border border-stone/30 focus:border-sage focus:ring-2 focus:ring-sage/20 focus:outline-none text-sm text-ink placeholder:text-muted transition-all"
                />
                <motion.button
                  type="submit"
                  disabled={loading || !input.trim()}
                  className="w-11 h-11 rounded-2xl bg-gradient-to-br from-sage to-olive text-white flex items-center justify-center hover:shadow-lg hover:shadow-olive/30 disabled:opacity-40 disabled:cursor-not-allowed transition-all flex-shrink-0"
                  whileHover={{ scale: input.trim() ? 1.05 : 1 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label="Send message"
                >
                  <Send className="w-4 h-4" />
                </motion.button>
              </div>
              <p className="text-[10px] text-muted text-center mt-2">Powered by Gemini AI</p>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
