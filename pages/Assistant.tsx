import React, { useState, useRef, useEffect } from 'react';
import { Send, User, Sparkles } from 'lucide-react';
import { chatWithHealthCoach } from '../services/geminiService';
import { ChatMessage } from '../types';

export const Assistant: React.FC = () => {
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      role: 'model',
      text: "Hello! I'm Aura. How can I help you with your health goals today?",
      timestamp: new Date()
    }
  ]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      text: input,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    // Convert messages to Gemini history format (excluding last user message which is sent as prompt)
    const history = messages.map(m => ({
        role: m.role,
        parts: [{ text: m.text }]
    }));

    try {
      const responseText = await chatWithHealthCoach(userMessage.text, history);
      
      const botMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'model',
        text: responseText,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
       console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-[calc(100vh-140px)] md:h-[calc(100vh-80px)] flex flex-col bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
      
      {/* Header */}
      <div className="p-4 border-b border-gray-100 bg-white/50 backdrop-blur-sm z-10 flex items-center justify-between">
         <div className="flex items-center gap-3">
             <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-purple-500 to-indigo-500 flex items-center justify-center text-white">
                <Sparkles size={20} />
             </div>
             <div>
                 <h2 className="font-bold text-gray-900">Aura Assistant</h2>
                 <p className="text-xs text-green-500 font-medium flex items-center gap-1">
                    <span className="w-2 h-2 bg-green-500 rounded-full"></span> Online
                 </p>
             </div>
         </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6 bg-[#F5F5F7]">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`flex max-w-[80%] md:max-w-[70%] gap-2 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                <div className={`
                    w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center text-white shadow-sm
                    ${msg.role === 'user' ? 'bg-gray-900' : 'bg-gradient-to-tr from-purple-500 to-indigo-500'}
                `}>
                    {msg.role === 'user' ? <User size={14} /> : <Sparkles size={14} />}
                </div>
                
                <div className={`
                    px-5 py-3 rounded-2xl text-[15px] leading-relaxed shadow-sm
                    ${msg.role === 'user' 
                        ? 'bg-[#007AFF] text-white rounded-tr-none' 
                        : 'bg-white text-gray-800 rounded-tl-none'}
                `}>
                    {msg.text}
                </div>
            </div>
          </div>
        ))}
        {isLoading && (
            <div className="flex justify-start">
                 <div className="flex gap-2 max-w-[80%]">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-purple-500 to-indigo-500 flex-shrink-0 flex items-center justify-center text-white">
                        <Sparkles size={14} />
                    </div>
                    <div className="bg-white px-5 py-4 rounded-2xl rounded-tl-none shadow-sm flex gap-1">
                        <span className="w-2 h-2 bg-gray-300 rounded-full animate-bounce"></span>
                        <span className="w-2 h-2 bg-gray-300 rounded-full animate-bounce delay-100"></span>
                        <span className="w-2 h-2 bg-gray-300 rounded-full animate-bounce delay-200"></span>
                    </div>
                 </div>
            </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-4 bg-white border-t border-gray-100">
        <div className="relative flex items-center">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Ask about your health metrics..."
            className="w-full bg-gray-100 text-gray-900 placeholder-gray-500 rounded-full pl-5 pr-12 py-4 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
          />
          <button 
            onClick={handleSend}
            disabled={!input.trim() || isLoading}
            className="absolute right-2 p-2 bg-[#007AFF] text-white rounded-full hover:bg-blue-600 disabled:opacity-50 disabled:bg-gray-400 transition-colors"
          >
            <Send size={18} className={isLoading ? 'opacity-0' : 'opacity-100'} />
          </button>
        </div>
      </div>
    </div>
  );
};
