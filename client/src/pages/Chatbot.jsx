import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Bot, User, Sparkles, AlertCircle, ThumbsUp, ThumbsDown, Copy, Share2 } from 'lucide-react';
import api from '../utils/api';
import toast from 'react-hot-toast';
import { getSmartResponse } from '../utils/newSmartChatbot.js';
import MarkdownText from '../components/MarkdownText.jsx';

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

  // 👍 Handle message feedback
  const handleFeedback = async (messageId, isPositive) => {
    try {
      console.log(`📊 User ${isPositive ? 'liked' : 'disliked'} message:`, messageId);
      
      // Update message in state to show feedback was given
      setMessages(prev => prev.map(msg => 
        msg._id === messageId 
          ? { ...msg, userFeedback: isPositive ? 'positive' : 'negative' }
          : msg
      ));
      
      toast.success(
        isPositive 
          ? '😊 Thank you! Your feedback helps us improve.' 
          : '😔 Thanks for the feedback. We\'ll work on improving our responses.'
      );
      
      // TODO: Send feedback to backend for analytics
    } catch (error) {
      console.error('Error submitting feedback:', error);
    }
  };

  // 📋 Copy message to clipboard
  const copyMessage = async (text) => {
    try {
      // Remove markdown formatting for plain text copy
      const plainText = text
        .replace(/\*\*(.*?)\*\*/g, '$1')
        .replace(/• /g, '- ')
        .replace(/📚 \*\*From Our Medical Database\*\*\n\n/, '');
      
      await navigator.clipboard.writeText(plainText);
      toast.success('📋 Copied to clipboard!');
    } catch (error) {
      toast.error('Failed to copy text');
    }
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

    // Add user message to UI immediately
    const tempUserMsg = {
      message: userMessage,
      sender: 'user',
      timestamp: new Date(),
      _id: Date.now()
    };
    setMessages(prev => [...prev, tempUserMsg]);

    // 🎭 Realistic typing delay based on message complexity
    const estimatedReadingTime = Math.min(Math.max(userMessage.length * 50, 1000), 3000);
    await new Promise(resolve => setTimeout(resolve, estimatedReadingTime));

    try {
      // 🎯 HYBRID APPROACH: Try client-side smart chatbot first, then save to MongoDB
      const smartResponse = await getSmartResponse(userMessage);
      
      // Create bot message for UI
      const botMessage = {
        message: userMessage,
        response: smartResponse.response,
        sender: 'bot',
        timestamp: new Date(),
        isUrgent: smartResponse.isUrgent || false,
        source: smartResponse.source,
        confidence: smartResponse.confidence,
        category: smartResponse.category,
        tier: smartResponse.tier,
        _id: Date.now() + 1
      };
      
      setMessages(prev => [...prev, botMessage]);
      
      // 💾 SAVE TO MONGODB: Send to backend API for persistence
      try {
        console.log('💾 Saving chat message to MongoDB...');
        await api.post('/chatbot/message', {
          message: userMessage,
          response: smartResponse.response,
          intent: smartResponse.category || 'general',
          confidence: smartResponse.confidence || 0.85,
          source: smartResponse.source,
          isUrgent: smartResponse.isUrgent || false,
          tags: [smartResponse.category, smartResponse.source].filter(Boolean)
        });
        console.log('✅ Chat message saved to MongoDB');
      } catch (saveError) {
        console.error('❌ Failed to save to MongoDB:', saveError);
        // Don't show error to user - message still works
      }
      
      // Show notifications
      if (smartResponse.isUrgent) {
        toast.error('🚨 Urgent message detected! Please consult a healthcare provider immediately.', {
          duration: 6000
        });
      }
      
      // Show source indicator
      if (smartResponse.tier === 1) {
        toast.success(`📚 Answer from verified medical database (${Math.round(smartResponse.confidence * 100)}% confidence)`, {
          duration: 3000
        });
      } else if (smartResponse.tier === 2) {
        toast('🤖 AI-generated response - Please consult healthcare provider for specific medical advice', {
          duration: 4000,
          icon: 'ℹ️'
        });
      }
      
    } catch (error) {
      console.error('❌ Smart chatbot error:', error);
      
      // Fallback error message
      const errorMessage = {
        response: "I apologize, but I'm having trouble right now. For urgent pregnancy concerns, please contact your healthcare provider immediately. 💝",
        sender: 'bot',
        timestamp: new Date(),
        isUrgent: false,
        source: 'error',
        _id: Date.now() + 1
      };
      
      setMessages(prev => [...prev, errorMessage]);
      toast.error('Failed to process message');
    } finally {
      setIsLoading(false);
    }
  };

  const quickQuestions = [
    "What should I eat during pregnancy?", // Custom dataset
    "I'm feeling nauseous and tired", // Custom dataset  
    "Is exercise safe during pregnancy?", // Custom dataset
    "When should I call my doctor?", // Custom dataset
    "Can I take paracetamol?", // Will test AI fallback
    "What foods should I avoid?" // Custom dataset
  ];

  // 🚀 Smart contextual suggestions based on last bot response
  const getSmartSuggestions = (lastBotMessage) => {
    if (!lastBotMessage) return [];
    
    const response = lastBotMessage.response?.toLowerCase() || '';
    const suggestions = [];
    
    // Context-based suggestions
    if (response.includes('nutrition') || response.includes('eat')) {
      suggestions.push('What foods should I avoid?', 'Tell me about prenatal vitamins');
    }
    if (response.includes('exercise') || response.includes('activity')) {
      suggestions.push('Safe exercises in third trimester?', 'Can I do yoga while pregnant?');
    }
    if (response.includes('symptom') || response.includes('pain')) {
      suggestions.push('When should I call my doctor?', 'Is this normal?');
    }
    if (response.includes('tight') || response.includes('contractions')) {
      suggestions.push('Signs of real labor?', 'Braxton Hicks vs real contractions?');
    }
    
    // Always include these general ones
    if (suggestions.length < 3) {
      suggestions.push('Tell me more', 'What else should I know?');
    }
    
    return suggestions.slice(0, 3); // Max 3 suggestions
  };

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
              <h1 className="text-2xl md:text-3xl font-bold gradient-text">🧠 Smart AI Assistant</h1>
              <p className="text-gray-600">Pregnancy experts + AI power - Ask me anything!</p>
              <p className="text-xs text-purple-500 mt-1">✨ Verified answers first, AI backup for everything else</p>
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
                          {msg.sender === 'user' ? (
                            <p className="text-white">{msg.message}</p>
                          ) : (
                            <MarkdownText 
                              text={msg.response || msg.message}
                              className={`text-gray-800 ${msg.source === 'gemini_ai' ? 'ai-response' : 'database-response'}`}
                            />
                          )}
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
                        
                        {/* 👍 Message Actions (only for bot messages) */}
                        {msg.sender === 'bot' && (
                          <motion.div 
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5 }}
                            className="mt-2 flex items-center space-x-2"
                          >
                            {/* Feedback Buttons */}
                            <div className="flex items-center space-x-1 bg-gray-50 rounded-lg p-1">
                              <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={() => handleFeedback(msg._id, true)}
                                className={`p-1.5 rounded text-xs transition-colors ${
                                  msg.userFeedback === 'positive' 
                                    ? 'bg-green-100 text-green-600' 
                                    : 'hover:bg-green-100 hover:text-green-600 text-gray-500'
                                }`}
                                title="This was helpful"
                              >
                                <ThumbsUp className="w-3 h-3" />
                              </motion.button>
                              <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={() => handleFeedback(msg._id, false)}
                                className={`p-1.5 rounded text-xs transition-colors ${
                                  msg.userFeedback === 'negative' 
                                    ? 'bg-red-100 text-red-600' 
                                    : 'hover:bg-red-100 hover:text-red-600 text-gray-500'
                                }`}
                                title="This needs improvement"
                              >
                                <ThumbsDown className="w-3 h-3" />
                              </motion.button>
                            </div>
                            
                            {/* Copy Button */}
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={() => copyMessage(msg.response || msg.message)}
                              className="p-1.5 rounded bg-gray-50 hover:bg-blue-100 hover:text-blue-600 text-gray-500 transition-colors"
                              title="Copy message"
                            >
                              <Copy className="w-3 h-3" />
                            </motion.button>
                            
                            {/* Source Badge */}
                            {msg.source && (
                              <span className="text-xs bg-purple-50 text-purple-600 px-2 py-1 rounded-full">
                                {msg.source === 'gemini_ai' ? '🤖 AI' : '📚 DB'}
                              </span>
                            )}
                          </motion.div>
                        )}
                        
                        <div className="flex items-center justify-between mt-2 px-1">
                          <p className="text-xs text-gray-500">
                            {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </p>
                          {msg.sender === 'user' && (
                            <div className="flex items-center space-x-1">
                              <div className="w-1.5 h-1.5 bg-green-400 rounded-full"></div>
                              <span className="text-xs text-green-500">sent</span>
                            </div>
                          )}
                          {msg.sender === 'bot' && msg.confidence && (
                            <span className="text-xs text-purple-500">
                              {Math.round(msg.confidence * 100)}% confident
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            )}
            
            {/* 🤖 Enhanced Typing Indicator */}
            {isLoading && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex justify-start"
              >
                <div className="flex items-center space-x-3">
                  <div className="bg-gradient-to-r from-purple-100 to-blue-100 p-2 rounded-xl">
                    <Bot className="w-5 h-5 text-purple-600" />
                  </div>
                  <div className="bg-white/90 backdrop-blur-sm p-4 rounded-2xl rounded-tl-sm border border-purple-100">
                    <div className="flex items-center space-x-2">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" />
                        <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                        <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }} />
                      </div>
                      <span className="text-xs text-gray-500 ml-2">MatriCare is thinking...</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
            
            {/* 🚀 Smart Suggestion Chips */}
            {messages.length > 0 && !isLoading && (() => {
              const lastBotMessage = messages.filter(m => m.sender === 'bot').pop();
              const suggestions = getSmartSuggestions(lastBotMessage);
              
              return suggestions.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1 }}
                  className="flex flex-wrap gap-2 justify-center mt-4"
                >
                  {suggestions.map((suggestion, index) => (
                    <motion.button
                      key={index}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 1.2 + index * 0.1 }}
                      whileHover={{ scale: 1.05, backgroundColor: 'rgba(147, 51, 234, 0.1)' }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setInput(suggestion)}
                      className="px-3 py-2 bg-white/70 backdrop-blur-sm text-sm text-gray-600 rounded-full border border-purple-200 hover:border-purple-300 transition-all duration-200 shadow-sm"
                    >
                      ✨ {suggestion}
                    </motion.button>
                  ))}
                </motion.div>
              );
            })()}
            
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
