# 🤖 AI Setup Guide for MATRI-CARE

Your MATRI-CARE app now supports **real AI integration** with Google Gemini, Groq (Llama), and other providers instead of placeholder responses!

## 🚀 Quick Setup

### 1. Get Your Gemini API Key (Recommended - Free Tier)
- Visit: https://makersuite.google.com/app/apikey
- Sign in with your Google account
- Click "Create API Key"
- Copy the key

### 2. Setup Environment File
```bash
# In your client folder:
cd client
cp .env.example .env
```

### 3. Add Your API Key to .env
Open `.env` and add your key:
```
REACT_APP_GEMINI_API_KEY=your_actual_key_here
```

### 4. Restart Your App
```bash
npm start
```

## 🎯 What Changed?

### ✅ Real AI Integration
- **Gemini Pro** as primary AI (Google's latest model)
- **Groq** for fast Llama models (optional)
- Smart fallbacks if APIs fail

### 🧠 Intelligent Responses
Your chatbot now provides:
- Real AI-generated pregnancy advice
- Context-aware responses
- Medical disclaimers when appropriate
- Warm, caring tone with emojis

### 🔄 Fallback System
1. **Custom Dataset** (your curated responses) - First priority
2. **Gemini AI** - When no custom match found
3. **Intelligent Fallback** - If API fails
4. **Error Handling** - Graceful degradation

## 🌟 Available AI Providers

### 🥇 Google Gemini (Recommended)
- **Free Tier**: Generous limits
- **Quality**: Excellent for pregnancy advice
- **Speed**: Fast responses
- **Setup**: Easiest to get API key

### 🦙 Groq (Optional - Fast Llama)
- **Free Tier**: Available
- **Speed**: Ultra-fast inference
- **Models**: Llama-3-8B and others
- **Get Key**: https://console.groq.com/keys

### 🔧 OpenAI (Optional)
- **Quality**: Excellent
- **Cost**: Paid only
- **Note**: Currently redirects to Gemini

## 🧪 Testing Your Setup

### Test in Browser Console
```javascript
// Test the chatbot with real AI
import { getSmartResponse } from './src/utils/smartChatbot.js';

// This should use real AI if no custom match
getSmartResponse("What supplements should I take during pregnancy?")
  .then(response => console.log(response));
```

### Check Logs
Watch for these console messages:
- ✅ `Found in custom dataset` - Using your curated responses
- 📡 `Falling back to external AI` - Using real AI
- ⚠️ `API key not found` - Add your key to .env

## 🔒 Security Notes

### Environment Files
- ✅ `.env` is in `.gitignore` (secure)
- ❌ Never commit API keys to Git
- ✅ Use environment variables only

### API Key Management
- Keep keys secret and secure
- Regenerate if compromised
- Monitor usage on provider dashboards

## 🐛 Troubleshooting

### Common Issues

#### "API key not found" Warning
- Check `.env` file exists in `/client/` folder
- Verify key format: `REACT_APP_GEMINI_API_KEY=your_key`
- Restart React app after adding key

#### CORS Errors
- Gemini API supports browser calls
- If issues persist, move API calls to backend

#### Rate Limits
- Free tiers have daily limits
- Monitor usage in provider dashboards
- Consider upgrading for production

### Testing Without API Keys
The app gracefully falls back to intelligent responses even without API keys, so it won't break your hackathon demo!

## 🏆 Demo Tips

### Impress Judges
1. **Show real AI responses** - Ask complex pregnancy questions
2. **Demonstrate fallbacks** - Show custom dataset responses too
3. **Highlight innovation** - Real AI + custom pregnancy data

### Example Questions That Show AI Power
- "I'm 32 weeks pregnant and feeling anxious about labor"
- "What are some healthy meal prep ideas for third trimester?"
- "How do I know if my baby is moving enough?"

## 🎉 You're All Set!

Your MATRI-CARE app now has real AI capabilities that will definitely impress hackathon judges. The system is smart, responsive, and provides genuine value to pregnant women!

Need help? The fallback system ensures your demo works even if APIs have issues. 🚀