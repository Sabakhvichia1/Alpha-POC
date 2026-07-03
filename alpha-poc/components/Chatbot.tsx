'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Bot, User, Loader2 } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { useAppContext } from '@/contexts/AppContext';

type Message = {
  id: string;
  role: 'user' | 'model';
  content: string;
};

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { language } = useAppContext();
  
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Initialize or update welcome message when language changes
  useEffect(() => {
    const welcomeContent = language === 'ka' 
      ? 'გამარჯობა! მე ვარ გელამხუთი (Gelamxuti), თქვენი ხელოვნური ინტელექტის ასისტენტი. რით შემიძლია დაგეხმაროთ დღეს?'
      : 'Hello! I am Gelamxuti, your AI assistant. How can I help you navigate the platform today?';

    setMessages((prev) => {
      // If no messages, set the welcome message
      if (prev.length === 0) {
        return [{ id: 'welcome', role: 'model', content: welcomeContent }];
      }
      
      // If messages exist and the first one is our welcome message, update its language
      if (prev[0].id === 'welcome') {
        const newMessages = [...prev];
        newMessages[0] = { ...newMessages[0], content: welcomeContent };
        return newMessages;
      }

      return prev;
    });
  }, [language]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input.trim(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          language,
          messages: [...messages, userMessage].map((m) => ({
            role: m.role,
            content: m.content,
          })),
        }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          role: 'model',
          content: data.text || 'Sorry, I could not understand that.',
        },
      ]);
    } catch (error) {
      console.error('Chat error:', error);
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          role: 'model',
          content: 'Sorry, I encountered an error connecting to the server.',
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-24 right-4 sm:right-8 w-[calc(100vw-2rem)] sm:w-96 h-[500px] bg-white rounded-2xl shadow-2xl border border-slate-200 flex flex-col z-50 overflow-hidden"
          >
            {/* Header */}
            <div className="bg-blue-600 p-4 flex items-center justify-between text-white">
              <div className="flex items-center gap-2">
                <Bot className="w-6 h-6" />
                <div>
                  <h3 className="font-bold">Gelamxuti</h3>
                  <p className="text-xs text-blue-100 flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                    Online
                  </p>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="p-2 hover:bg-blue-700 rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50">
              {messages.map((m) => (
                <div 
                  key={m.id} 
                  className={`flex gap-3 max-w-[85%] ${m.role === 'user' ? 'ml-auto flex-row-reverse' : ''}`}
                >
                  <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${m.role === 'user' ? 'bg-slate-900' : 'bg-blue-100'}`}>
                    {m.role === 'user' ? <User className="w-4 h-4 text-white" /> : <Bot className="w-5 h-5 text-blue-600" />}
                  </div>
                  <div className={`p-3 rounded-2xl text-sm leading-relaxed ${m.role === 'user' ? 'bg-slate-900 text-white rounded-tr-sm' : 'bg-white border border-slate-100 shadow-sm text-slate-800 rounded-tl-sm'}`}>
                    <div className="prose prose-sm max-w-none prose-p:leading-relaxed prose-pre:bg-slate-100 prose-pre:text-slate-800 prose-a:text-blue-600">
                      <ReactMarkdown>
                        {m.content}
                      </ReactMarkdown>
                    </div>
                  </div>
                </div>
              ))}
              
              {isLoading && (
                <div className="flex gap-3 max-w-[85%]">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center bg-blue-100">
                    <Bot className="w-5 h-5 text-blue-600" />
                  </div>
                  <div className="p-4 rounded-2xl bg-white border border-slate-100 shadow-sm rounded-tl-sm flex items-center gap-2">
                    <Loader2 className="w-4 h-4 animate-spin text-blue-500" />
                    <span className="text-xs text-slate-500">Thinking...</span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <form onSubmit={handleSubmit} className="p-3 bg-white border-t border-slate-100 flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={language === 'ka' ? "შეიყვანეთ შეტყობინება..." : "Type your message..."}
                className="flex-1 bg-slate-100 text-slate-900 placeholder:text-slate-400 border-transparent focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200 rounded-xl px-4 py-3 text-sm transition-all outline-none"
                disabled={isLoading}
              />
              <button
                type="submit"
                disabled={!input.trim() || isLoading}
                className="bg-blue-600 text-white p-3 rounded-xl hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center"
              >
                <Send className="w-5 h-5" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* FAB Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-6 right-4 sm:right-8 w-14 h-14 bg-slate-900 text-white rounded-full shadow-2xl shadow-blue-900/20 flex items-center justify-center z-50 border-2 border-slate-800 hover:bg-slate-800 transition-colors"
      >
        {isOpen ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
      </motion.button>
    </>
  );
}
