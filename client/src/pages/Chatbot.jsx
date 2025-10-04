import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Bot, User, Sparkles, AlertCircle } from 'lucide-react';
import api from '../utils/api';
import toast from 'react-hot-toast';

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    fetchHistory();
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const fetchHistory = async () => {
    try {
      const response = await api.get('/chatbot/history');
      setMessages(response.data.data);
    } catch (error) {
      console.error('Error fetching chat history:', error);
    }
  };

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = input;
    setInput('');
    setIsLoading(true);

    // Add user message to UI
    const tempUserMsg = {
      message: userMessage,
      sender: 'user',
      timestamp: new Date(),
      _id: Date.now()
    };
    setMessages(prev => [...prev, tempUserMsg]);

    try {
      const response = await api.post('/chatbot/message', { message: userMessage });
      const botMessage = response.data.data;
      
      setMessages(prev => [...prev, botMessage]);
      
      if (botMessage.isUrgent) {
        toast.error('⚠️ Urgent message detected! Please consult a healthcare provider.', {
          duration: 5000
        });
      }
    } catch (error) {
      toast.error('Failed to send message');
      console.error('Error sending message:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const quickQuestions = [
    "What foods should I eat during pregnancy?",
    "How much exercise is safe?",
    "What are normal pregnancy symptoms?",
    "When should I call my doctor?"
  ];

  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="max-w-5xl mx-auto h-[calc(100vh-8rem)]">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card rounded-2xl p-6 mb-6"
        >
          <div className="flex items-center space-x-4">
            <div className="gradient-primary p-3 rounded-2xl">
              <Bot className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold gradient-text">AI Health Assistant</h1>
              <p className="text-gray-600">Ask me anything about your pregnancy journey</p>
            </div>
          </div>
        </motion.div>

        {/* Chat Container */}
        <div className="glass-card rounded-2xl flex flex-col h-[calc(100%-8rem)]">
          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {messages.length === 0 ? (
              <div className="text-center py-12">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="inline-block gradient-primary p-6 rounded-full mb-4"
                >
                  <Sparkles className="w-12 h-12 text-white" />
                </motion.div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">Start a Conversation</h3>
                <p className="text-gray-600 mb-6">Ask me anything about your pregnancy health</p>
                
                {/* Quick Questions */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-w-2xl mx-auto">
                  {quickQuestions.map((question, index) => (
                    <motion.button
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ scale: 1.02 }}
                      onClick={() => setInput(question)}
                      className="text-left p-4 bg-gradient-to-r from-pink-50 to-purple-50 rounded-xl hover:from-pink-100 hover:to-purple-100 transition-all"
                    >
                      <p className="text-sm text-gray-700">{question}</p>
                    </motion.button>
                  ))}
                </div>
              </div>
            ) : (
              <AnimatePresence>
                {messages.map((msg, index) => (
                  <motion.div
                    key={msg._id || index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`flex items-start space-x-3 max-w-[80%] ${msg.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                      {/* Avatar */}
                      <div className={`${msg.sender === 'user' ? 'gradient-primary' : 'bg-gray-200'} p-2 rounded-xl flex-shrink-0`}>
                        {msg.sender === 'user' ? (
                          <User className="w-5 h-5 text-white" />
                        ) : (
                          <Bot className="w-5 h-5 text-gray-600" />
                        )}
                      </div>

                      {/* Message */}
                      <div>
                        <div className={`${
                          msg.sender === 'user' 
                            ? 'bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 text-white' 
                            : 'bg-white/80'
                        } p-4 rounded-2xl ${msg.sender === 'user' ? 'rounded-tr-sm' : 'rounded-tl-sm'}`}>
                          <p className={msg.sender === 'user' ? 'text-white' : 'text-gray-800'}>
                            {msg.response || msg.message}
                          </p>
                        </div>
                        
                        {/* Urgent Warning */}
                        {msg.isUrgent && (
                          <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="mt-2 flex items-center space-x-2 bg-red-50 text-red-600 p-3 rounded-xl"
                          >
                            <AlertCircle className="w-4 h-4" />
                            <span className="text-sm font-medium">Urgent - Consult healthcare provider</span>
                          </motion.div>
                        )}
                        
                        <p className="text-xs text-gray-500 mt-1 px-1">
                          {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            )}
            
            {isLoading && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex justify-start"
              >
                <div className="flex items-center space-x-3">
                  <div className="bg-gray-200 p-2 rounded-xl">
                    <Bot className="w-5 h-5 text-gray-600" />
                  </div>
                  <div className="bg-white/80 p-4 rounded-2xl rounded-tl-sm">
                    <div className="flex space-x-2">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }} />
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="border-t border-white/20 p-4">
            <form onSubmit={handleSend} className="flex space-x-3">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your question..."
                className="input-field flex-1"
                disabled={isLoading}
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="submit"
                disabled={isLoading || !input.trim()}
                className="gradient-primary p-3 rounded-xl text-white disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send className="w-5 h-5" />
              </motion.button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;
