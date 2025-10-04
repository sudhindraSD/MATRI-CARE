# 🤖 How to Get Your Free Google Gemini API Key

## Step-by-Step Instructions:

### 1. **Go to Google AI Studio**
   - Visit: https://aistudio.google.com/

### 2. **Sign in with Google Account**
   - Use your Google account to sign in

### 3. **Get API Key**
   - Click "Get API key" button
   - Click "Create API key" 
   - Select "Create API key in new project" (recommended)
   - Copy the generated API key

### 4. **Update Your Environment File**
   - Open `.env` file in your MATRI-CARE folder
   - Replace the current `GEMINI_API_KEY` value with your new key:
   ```
   GEMINI_API_KEY=YOUR_ACTUAL_API_KEY_HERE
   ```

### 5. **Restart Your Backend Server**
   - Stop your backend server (Ctrl+C)
   - Start it again: `npm run dev`

## 🆓 **It's Completely FREE!**
- Google Gemini API has a generous free tier
- 15 requests per minute
- 1,500 requests per day
- Perfect for your MATRI-CARE application!

## 🔒 **Keep Your API Key Safe**
- Never share your API key publicly
- Don't commit it to version control
- Keep it in your `.env` file only

## ✅ **Test the AI Chatbot**
After updating the API key and restarting the server:
1. Go to the Chatbot page in your app
2. Ask questions like:
   - "What should I eat during pregnancy?"
   - "Is exercise safe during pregnancy?"
   - "What are early pregnancy symptoms?"
   - "How much weight should I gain?"

The AI will give you personalized, specific answers based on your profile!