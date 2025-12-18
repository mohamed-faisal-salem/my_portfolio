import React, { useState, useRef, useEffect } from 'react';
import { getGroqResponse } from "../services/geminiService";

interface Message {
  text: string;
  isUser: boolean;
  timestamp?: string;
}

const Chatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { 
      text: "Hello! I'm Mohamed's AI assistant. Ask me", 
      isUser: false,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const getCurrentTime = () => {
    return new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg = input.trim();
    setInput('');
    
    const userMessage = { 
      text: userMsg, 
      isUser: true, 
      timestamp: getCurrentTime() 
    };
    setMessages(prev => [...prev, userMessage]);
    
    setIsLoading(true);

    try {
      const botMsg = await getGroqResponse(userMsg);
      const botMessage = { 
        text: botMsg, 
        isUser: false, 
        timestamp: getCurrentTime() 
      };
      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      const errorMessage = { 
        text: "Sorry, I'm having trouble connecting. Please try again.", 
        isUser: false, 
        timestamp: getCurrentTime() 
      };
      setMessages(prev => [...prev, errorMessage]);
    }
    
    setIsLoading(false);
  };

  const quickQuestions = [
    "What projects has Mohamed worked on?",
    "Tell me about Mohamed's skills",
    "How can I contact Mohamed?",
    "What's Mohamed's experience?",
    "Tell me about the Quran app",
    "What AI projects has he done?"
  ];

  // Handle Escape key to exit fullscreen
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isFullscreen) {
        setIsFullscreen(false);
      }
    };

    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [isFullscreen]);

  return (
    <>
      {/* Bot Toggle Button - Only show when not in fullscreen */}
      {!isFullscreen && (
        <div className="fixed bottom-6 right-6 z-[100]">
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="relative w-14 h-14 rounded-full bg-gradient-to-r from-indigo-700 to-purple-800 text-white text-xl shadow-2xl hover:scale-110 transition-all duration-300 flex items-center justify-center border-3 border-slate-900/50 group"
          >
            <i className={`fas ${isOpen ? 'fa-times' : 'fa-comment-dots'}`}></i>
            
            {/* Tooltip */}
            <div className="absolute -top-8 right-0 bg-slate-800/90 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap backdrop-blur-sm">
              AI Assistant
            </div>
          </button>
        </div>
      )}

      {/* Regular Chat Window */}
      {isOpen && !isFullscreen && (
        <div className="fixed bottom-24 right-6 z-[100] w-[350px] h-[450px] glass rounded-2xl overflow-hidden shadow-2xl flex flex-col animate-slide-up border border-slate-700/50 backdrop-blur-xl">
          {/* Header */}
          <div className="p-4 bg-gradient-to-r from-slate-800/90 to-slate-900/90 flex justify-between items-center border-b border-slate-600/50">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-indigo-600 to-purple-700 flex items-center justify-center">
                <i className="fas fa-robot text-sm text-white"></i>
              </div>
              <div>
                <h3 className="font-bold text-sm text-slate-200">AI Assistant</h3>
                <p className="text-xs text-slate-400">Online</p>
              </div>
            </div>
            
            {/* Control Buttons */}
            <div className="flex items-center gap-1">
              <button 
                onClick={() => setIsFullscreen(true)}
                className="w-7 h-7 rounded-full bg-slate-700/50 hover:bg-slate-600/50 flex items-center justify-center transition-colors text-slate-300"
                title="Fullscreen"
              >
                <i className="fas fa-expand-alt text-xs"></i>
              </button>
              <button 
                onClick={() => setMessages([messages[0]])}
                className="w-7 h-7 rounded-full bg-slate-700/50 hover:bg-slate-600/50 flex items-center justify-center transition-colors text-slate-300"
                title="Clear chat"
              >
                <i className="fas fa-trash-alt text-xs"></i>
              </button>
              <button 
                onClick={() => setIsOpen(false)}
                className="w-7 h-7 rounded-full bg-slate-700/50 hover:bg-slate-600/50 flex items-center justify-center transition-colors text-slate-300"
              >
                <i className="fas fa-times text-xs"></i>
              </button>
            </div>
          </div>

          {/* Chat Messages Area */}
          <div 
            ref={scrollRef} 
            className="flex-grow overflow-y-auto scroll-smooth bg-gradient-to-b from-slate-900/90 to-slate-950/90 p-3 space-y-2"
          >
            {/* Welcome Time Stamp */}
            <div className="text-center mb-3">
              <div className="inline-block px-3 py-1 rounded-full bg-gradient-to-r from-slate-700/30 to-slate-800/30 border border-slate-600/30">
                <p className="text-xs text-slate-400">Today • {getCurrentTime()}</p>
              </div>
            </div>

            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.isUser ? 'justify-end' : 'justify-start'} gap-2`}>
                {!m.isUser && (
                  <div className="w-7 h-7 rounded-full bg-gradient-to-r from-indigo-600/80 to-purple-600/80 flex items-center justify-center flex-shrink-0">
                    <i className="fas fa-robot text-xs text-slate-100"></i>
                  </div>
                )}
                
                <div className={`flex flex-col ${m.isUser ? 'items-end' : 'items-start'} max-w-[80%]`}>
                  <div 
                    className={`px-3 py-2 rounded-xl text-sm ${
                      m.isUser 
                        ? 'bg-gradient-to-r from-indigo-700 to-indigo-800 text-slate-50 rounded-br-none' 
                        : 'bg-gradient-to-r from-slate-800 to-slate-900 text-slate-100 rounded-bl-none border border-slate-700/50'
                    }`}
                  >
                    <p className="leading-relaxed">{m.text}</p>
                  </div>
                  
                  <div className="flex items-center gap-1 mt-0.5">
                    <span className="text-xs text-slate-500">{m.timestamp}</span>
                  </div>
                </div>

                {m.isUser && (
                  <div className="w-7 h-7 rounded-full bg-gradient-to-r from-slate-700 to-slate-800 flex items-center justify-center flex-shrink-0">
                    <i className="fas fa-user text-xs text-slate-200"></i>
                  </div>
                )}
              </div>
            ))}
            
            {/* Loading Indicator */}
            {isLoading && (
              <div className="flex justify-start items-center gap-2">
                <div className="w-7 h-7 rounded-full bg-gradient-to-r from-indigo-600/80 to-purple-600/80 flex items-center justify-center">
                  <i className="fas fa-robot text-xs text-slate-100"></i>
                </div>
                <div className="flex flex-col">
                  <div className="bg-gradient-to-r from-slate-800 to-slate-900 p-2 rounded-xl rounded-bl-none border border-slate-700/50">
                    <div className="flex items-center gap-1">
                      <div className="w-1.5 h-1.5 bg-indigo-400/80 rounded-full animate-pulse"></div>
                      <div className="w-1.5 h-1.5 bg-purple-400/80 rounded-full animate-pulse animation-delay-200"></div>
                      <div className="w-1.5 h-1.5 bg-indigo-400/80 rounded-full animate-pulse animation-delay-400"></div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Quick Questions Suggestions */}
            {messages.length === 1 && (
              <div className="mt-4">
                <p className="text-xs text-slate-500 mb-2 text-center">Try asking:</p>
                <div className="grid grid-cols-2 gap-2">
                  {quickQuestions.slice(0, 4).map((question, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        setInput(question);
                        setTimeout(() => handleSend(), 100);
                      }}
                      className="text-xs text-left p-2 rounded-lg bg-gradient-to-r from-slate-800/50 to-slate-900/50 border border-slate-700/50 hover:border-indigo-500/40 hover:bg-slate-800/70 transition-all duration-300 text-slate-300"
                    >
                      {question}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Input Area */}
          <div className="p-3 border-t border-slate-700/50 bg-gradient-to-r from-slate-900/95 to-slate-950/95">
            <div className="flex gap-2">
              <div className="relative flex-grow">
                <input 
                  type="text" 
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Type your message..."
                  className="w-full bg-slate-800/50 border border-slate-600/50 rounded-lg px-3 py-2 focus:outline-none focus:border-indigo-500/50 text-sm placeholder:text-slate-500/60 backdrop-blur-sm text-slate-200"
                />
              </div>
              <button 
                onClick={handleSend}
                disabled={isLoading || !input.trim()}
                className="w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-300 bg-gradient-to-r from-indigo-700 to-purple-800 hover:from-indigo-800 hover:to-purple-900 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <i className="fas fa-spinner fa-spin text-xs text-slate-200"></i>
                ) : (
                  <i className="fas fa-paper-plane text-xs text-slate-200"></i>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Fullscreen Chat Window */}
      {isFullscreen && (
        <div className="fixed inset-0 z-[9999] bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900">
          {/* Fullscreen Header */}
          <div className="h-16 bg-gradient-to-r from-slate-800 via-slate-900 to-slate-800 flex justify-between items-center px-6 border-b border-slate-700/50">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-indigo-600 to-purple-700 flex items-center justify-center">
                <i className="fas fa-robot text-lg text-white"></i>
              </div>
              <div>
                <h1 className="text-base font-bold text-slate-200">Mohamed Faisal (AI Assistant)</h1>
                <p className="text-xs text-slate-400">Press ESC to exit (Fullscreen Mode)</p>
              </div>
            </div>
            
            {/* Fullscreen Control Buttons */}
            <div className="flex items-center gap-2">
              <button 
                onClick={() => setMessages([messages[0]])}
                className="w-10 h-10 rounded-lg bg-slate-700/50 hover:bg-slate-600/50 flex items-center justify-center transition-colors text-slate-300"
                title="Clear chat"
              >
                <i className="fas fa-trash-alt text-sm"></i>
              </button>
              <button 
                onClick={() => setIsFullscreen(false)}
                className="w-10 h-10 rounded-lg bg-gradient-to-r from-indigo-700 to-purple-800 hover:from-indigo-800 hover:to-purple-900 flex items-center justify-center transition-all text-slate-200"
                title="Exit fullscreen"
              >
                <i className="fas fa-compress-alt text-sm"></i>
              </button>
            </div>
          </div>

          {/* Fullscreen Chat Container */}
          <div className="flex h-[calc(100vh-4rem)]">
            {/* Left Sidebar - Quick Questions */}
            <div className="w-64 border-r border-slate-700/50 bg-slate-900/40 p-4">
              <div className="mt-4">
                <h4 className="font-bold text-sm mb-3 text-slate-300">Quick Questions</h4>
                <div className="space-y-1.5">
                  {quickQuestions.map((question, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        setInput(question);
                        setTimeout(() => handleSend(), 100);
                      }}
                      className="w-full text-left p-2.5 rounded-lg bg-slate-800/40 hover:bg-slate-700/60 border border-slate-700/50 text-sm transition-all text-slate-300 hover:text-slate-100"
                    >
                      {question}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Main Chat Area */}
            <div className="flex-1 flex flex-col">
              {/* Chat Messages Area - Full Height */}
              <div 
                ref={scrollRef} 
                className="flex-1 overflow-y-auto scroll-smooth bg-gradient-to-b from-slate-900/30 to-slate-950/40 p-5 space-y-3"
              >
                {messages.map((m, i) => (
                  <div key={i} className={`flex ${m.isUser ? 'justify-end' : 'justify-start'} gap-3`}>
                    {!m.isUser && (
                      <div className="w-10 h-10 rounded-full bg-gradient-to-r from-indigo-600/80 to-purple-600/80 flex items-center justify-center flex-shrink-0 mt-1">
                        <i className="fas fa-robot text-sm text-slate-100"></i>
                      </div>
                    )}
                    
                    <div className={`flex flex-col ${m.isUser ? 'items-end' : 'items-start'} max-w-[70%]`}>
                      <div 
                        className={`px-4 py-2.5 rounded-xl text-sm ${
                          m.isUser 
                            ? 'bg-gradient-to-r from-indigo-700 to-indigo-800 text-slate-50 rounded-br-none' 
                            : 'bg-gradient-to-r from-slate-800 to-slate-900 text-slate-100 rounded-bl-none border border-slate-700/50'
                        }`}
                      >
                        <p className="leading-relaxed">{m.text}</p>
                      </div>
                      
                      <div className="flex items-center gap-1.5 mt-1">
                        <span className="text-xs text-slate-500">{m.timestamp}</span>
                        {m.isUser && (
                          <i className="fas fa-check text-emerald-500 text-xs"></i>
                        )}
                      </div>
                    </div>

                    {m.isUser && (
                      <div className="w-10 h-10 rounded-full bg-gradient-to-r from-slate-700 to-slate-800 flex items-center justify-center flex-shrink-0 mt-1">
                        <i className="fas fa-user text-sm text-slate-200"></i>
                      </div>
                    )}
                  </div>
                ))}
                
                {/* Loading Indicator */}
                {isLoading && (
                  <div className="flex justify-start items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-indigo-600/80 to-purple-600/80 flex items-center justify-center">
                      <i className="fas fa-robot text-sm text-slate-100"></i>
                    </div>
                    <div className="flex flex-col">
                      <div className="bg-gradient-to-r from-slate-800 to-slate-900 p-3 rounded-xl rounded-bl-none border border-slate-700/50">
                        <div className="flex items-center gap-1.5">
                          <div className="w-2 h-2 bg-indigo-400/80 rounded-full animate-pulse"></div>
                          <div className="w-2 h-2 bg-purple-400/80 rounded-full animate-pulse animation-delay-200"></div>
                          <div className="w-2 h-2 bg-indigo-400/80 rounded-full animate-pulse animation-delay-400"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Fullscreen Input Area */}
              <div className="p-4 border-t border-slate-700/50 bg-gradient-to-r from-slate-900/95 to-slate-950/95">
                <div className="max-w-5xl mx-auto">
                  <div className="flex gap-3">
                    <div className="relative flex-1">
                      <input 
                        type="text" 
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                        placeholder="Type your message..."
                        className="w-full bg-slate-800/40 border border-slate-600/50 rounded-lg px-4 py-2.5 focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/30 text-sm placeholder:text-slate-500/60 text-slate-200"
                      />
                    </div>
                    <button 
                      onClick={handleSend}
                      disabled={isLoading || !input.trim()}
                      className="w-12 h-12 rounded-lg flex items-center justify-center transition-all duration-300 bg-gradient-to-r from-indigo-700 to-purple-800 hover:from-indigo-800 hover:to-purple-900 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isLoading ? (
                        <i className="fas fa-spinner fa-spin text-base text-slate-200"></i>
                      ) : (
                        <i className="fas fa-paper-plane text-base text-slate-200"></i>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Chatbot;