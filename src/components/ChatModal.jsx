import React, { useState, useEffect, useRef } from 'react';
import { X, MessageCircle, Send, Minus } from 'lucide-react';
import { generateResponse } from '../chatbotKnowledge';

const ChatModal = ({ isOpen, onClose, onMinimize, messages, setMessages }) => {
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
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

  const handleSend = async () => {
    // Get value from ref (DOM) or state - handles both manual typing and automation
    const messageText = inputRef.current?.value?.trim() || input.trim();
    if (!messageText) return;
    
    const userMessage = { role: 'user', content: messageText };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    if (inputRef.current) inputRef.current.value = ''; // Clear DOM directly too
    setIsTyping(true);

    // Generate response using knowledge base
    setTimeout(() => {
      const responseText = generateResponse(messageText);
      const aiMessage = { 
        role: 'assistant', 
        content: responseText 
      };
      setMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);
    }, 800 + Math.random() * 700);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed md:absolute bottom-0 left-0 right-0 md:bottom-[88px] md:left-[72px] lg:left-[104px] md:right-auto z-[90] animate-fade-up">
      <div className="w-full md:w-[360px] bg-[#0a0a0a] border-t md:border border-white/15 md:rounded-2xl shadow-2xl overflow-hidden flex flex-col h-[75vh] md:h-auto md:max-h-[420px]">
        {/* Header */}
        <div className="flex items-center justify-between p-3 sm:p-4 border-b border-white/10">
          <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0">
              <MessageCircle size={12} className="text-white/80 sm:w-3.5 sm:h-3.5" />
            </div>
            <div className="min-w-0">
              <h3 className="text-xs sm:text-sm font-medium text-white font-sans truncate">
                <span className="sm:hidden">Le'Voyage Assistant</span>
                <span className="hidden sm:inline">Events by Le'Voyage Assistant</span>
              </h3>
              <p className="text-[9px] sm:text-[10px] text-white/50 font-sans truncate">Ask me anything about your trip</p>
            </div>
          </div>
          <div className="flex items-center gap-0.5 sm:gap-1 flex-shrink-0">
            <button 
              onClick={onMinimize}
              className="p-1.5 sm:p-2 hover:bg-white/10 rounded-lg transition-colors"
              aria-label="Minimize chat"
            >
              <Minus size={14} className="text-white/60 hover:text-white" />
            </button>
            <button 
              onClick={onClose}
              className="p-1.5 sm:p-2 hover:bg-white/10 rounded-lg transition-colors"
              aria-label="Close chat"
            >
              <X size={14} className="text-white/60 hover:text-white" />
            </button>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 min-h-[200px] md:min-h-[280px] md:max-h-[320px] custom-scrollbar">
          {messages.length === 0 && (
            <div className="text-center py-6 sm:py-8">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/5 flex items-center justify-center mx-auto mb-3 sm:mb-4">
                <MessageCircle size={18} className="text-white/40 sm:w-5 sm:h-5" />
              </div>
              <p className="text-white/60 text-xs sm:text-sm font-sans mb-1.5 sm:mb-2">Welcome to Events by Le'Voyage!</p>
              <p className="text-white/40 text-[10px] sm:text-xs font-sans px-4">Ask about destinations, pricing, or anything else.</p>
            </div>
          )}
          
          {messages.map((msg, idx) => (
            <div 
              key={idx} 
              className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div 
                className={`max-w-[85%] px-4 py-2.5 rounded-2xl text-sm font-sans ${
                  msg.role === 'user' 
                    ? 'bg-white/20 text-white rounded-br-md' 
                    : 'bg-white/5 text-white/90 rounded-bl-md border border-white/10'
                }`}
              >
                {msg.content}
              </div>
            </div>
          ))}
          
          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-white/5 border border-white/10 px-4 py-3 rounded-2xl rounded-bl-md">
                <div className="flex gap-1">
                  <span className="w-2 h-2 bg-white/40 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                  <span className="w-2 h-2 bg-white/40 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                  <span className="w-2 h-2 bg-white/40 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
                </div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <form 
          className="p-3 sm:p-4 border-t border-white/10 safe-area-bottom"
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
        >
          <div className="flex items-center gap-2 bg-white/5 rounded-xl px-3 sm:px-4 py-2 sm:py-2.5 border border-white/10 focus-within:border-white/20 transition-colors">
            <input
              ref={inputRef}
              type="text"
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type a message..."
              className="flex-1 bg-transparent text-white text-sm font-sans placeholder:text-white/30 focus:outline-none min-w-0"
            />
            <button 
              type="submit"
              className="p-2 hover:bg-white/10 rounded-lg transition-colors flex-shrink-0"
              aria-label="Send message"
            >
              <Send size={16} className="text-white/80" />
            </button>
          </div>
          <p className="text-[8px] sm:text-[9px] text-white/30 text-center mt-2 font-sans">
            Ask me anything about your trip!
          </p>
        </form>
      </div>
    </div>
  );
};

export default ChatModal;

