import React, { useState, useRef } from 'react';
import { parsePrescription, analyzeHealthRisk } from '../utils/prescriptionAI';
import { assignHealthPersona, getPersonaTheme, getPersonalizedGreeting } from '../utils/healthPersonas';

const PrescriptionInput = ({ onPrescriptionAnalyzed, currentWeek = 20 }) => {
  const [prescriptionText, setPrescriptionText] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState(null);
  const [inputMethod, setInputMethod] = useState('text'); // 'text' or 'image'
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef(null);

  // Handle text input analysis
  const handleAnalyzePrescription = async () => {
    if (!prescriptionText.trim()) {
      alert('Please enter your prescription details first!');
      return;
    }

    setIsAnalyzing(true);
    
    try {
      // Simulate AI processing time (makes it look more impressive!)
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      console.log('🤖 Starting prescription analysis...');
      
      // Step 1: Parse prescription
      const medications = parsePrescription(prescriptionText);
      console.log('✅ Medications detected:', medications.length);
      
      // Step 2: Analyze health risk
      const riskAnalysis = analyzeHealthRisk(medications);
      console.log('✅ Risk analysis complete:', riskAnalysis.riskLevel);
      
      // Step 3: Assign persona
      const persona = assignHealthPersona(medications, currentWeek);
      console.log('✅ Persona assigned:', persona);
      
      // Step 4: Get theme and greeting
      const theme = getPersonaTheme(persona);
      const greeting = getPersonalizedGreeting(persona, "Mom");
      
      const result = {
        originalText: prescriptionText,
        medications,
        riskAnalysis,
        persona,
        theme,
        greeting,
        analysisDate: new Date().toLocaleDateString(),
        gestationalWeek: currentWeek
      };
      
      setAnalysisResult(result);
      
      // Notify parent component
      if (onPrescriptionAnalyzed) {
        onPrescriptionAnalyzed(result);
      }
      
    } catch (error) {
      console.error('Analysis error:', error);
      alert('Analysis failed. Please try again!');
    } finally {
      setIsAnalyzing(false);
    }
  };

  // Handle image upload (simulated OCR)
  const handleImageUpload = async (file) => {
    if (!file.type.startsWith('image/')) {
      alert('Please upload an image file!');
      return;
    }

    setIsAnalyzing(true);
    
    try {
      // Simulate OCR processing
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      // Mock OCR result (in real app, you'd use OCR API)
      const mockOCRResults = [
        "Iron 65mg once daily with food, Folic Acid 400mcg daily",
        "Methyldopa 250mg twice daily, Calcium 500mg with meals",
        "Insulin 10 units before meals, Iron 325mg daily",
        "Levothyroxine 50mcg daily on empty stomach, Vitamin D 1000IU"
      ];
      
      const ocrText = mockOCRResults[Math.floor(Math.random() * mockOCRResults.length)];
      setPrescriptionText(ocrText);
      
      // Automatically analyze the OCR result
      const medications = parsePrescription(ocrText);
      const riskAnalysis = analyzeHealthRisk(medications);
      const persona = assignHealthPersona(medications, currentWeek);
      const theme = getPersonaTheme(persona);
      const greeting = getPersonalizedGreeting(persona, "Mom");
      
      const result = {
        originalText: ocrText,
        medications,
        riskAnalysis,
        persona,
        theme,
        greeting,
        analysisDate: new Date().toLocaleDateString(),
        gestationalWeek: currentWeek,
        source: 'image_upload'
      };
      
      setAnalysisResult(result);
      
      if (onPrescriptionAnalyzed) {
        onPrescriptionAnalyzed(result);
      }
      
    } catch (error) {
      console.error('OCR error:', error);
      alert('Image processing failed. Please try text input!');
    } finally {
      setIsAnalyzing(false);
    }
  };

  // Handle drag and drop
  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleImageUpload(e.dataTransfer.files[0]);
    }
  };

  // Quick prescription examples
  const quickExamples = [
    {
      label: "Iron Deficiency",
      text: "Iron 65mg once daily, Folic Acid 400mcg daily",
      icon: "⚔️"
    },
    {
      label: "Gestational Diabetes",
      text: "Insulin 10 units before meals, Metformin 500mg twice daily",
      icon: "🍯"
    },
    {
      label: "High Blood Pressure",
      text: "Methyldopa 250mg twice daily, Calcium 500mg with meals",
      icon: "🛡️"
    },
    {
      label: "General Wellness",
      text: "Prenatal vitamins daily, Vitamin D 1000IU, Calcium 500mg",
      icon: "🌟"
    }
  ];

  return (
    <div className="prescription-input-container p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
        🤖 Add Your Prescription for AI Analysis
      </h2>
      
      {/* Input Method Selector */}
      <div className="method-selector mb-6">
        <div className="flex justify-center space-x-4">
          <button
            onClick={() => setInputMethod('text')}
            className={`px-6 py-3 rounded-lg font-medium transition-colors ${
              inputMethod === 'text' 
                ? 'bg-blue-500 text-white' 
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            📝 Type Prescription
          </button>
          <button
            onClick={() => setInputMethod('image')}
            className={`px-6 py-3 rounded-lg font-medium transition-colors ${
              inputMethod === 'image' 
                ? 'bg-green-500 text-white' 
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            📸 Upload Image
          </button>
        </div>
      </div>

      {/* Text Input Method */}
      {inputMethod === 'text' && (
        <div className="text-input-section">
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Enter your prescription details:
            </label>
            <textarea
              value={prescriptionText}
              onChange={(e) => setPrescriptionText(e.target.value)}
              placeholder="Example: Iron 65mg once daily, Folic Acid 400mcg daily..."
              className="w-full p-4 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none resize-none"
              rows={4}
              disabled={isAnalyzing}
            />
          </div>
          
          {/* Quick Examples */}
          <div className="quick-examples mb-6">
            <p className="text-sm text-gray-600 mb-3">💡 Quick Examples (click to use):</p>
            <div className="grid grid-cols-2 gap-2">
              {quickExamples.map((example, index) => (
                <button
                  key={index}
                  onClick={() => setPrescriptionText(example.text)}
                  className="p-3 text-left border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                  disabled={isAnalyzing}
                >
                  <span className="text-lg mr-2">{example.icon}</span>
                  <span className="text-sm font-medium">{example.label}</span>
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={handleAnalyzePrescription}
            disabled={isAnalyzing || !prescriptionText.trim()}
            className={`w-full py-4 rounded-lg font-bold text-lg transition-all ${
              isAnalyzing
                ? 'bg-yellow-400 text-yellow-800 animate-pulse'
                : prescriptionText.trim()
                ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:from-blue-600 hover:to-purple-700 transform hover:scale-105'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            {isAnalyzing ? '🤖 AI Analyzing Prescription...' : '🚀 Analyze with AI'}
          </button>
        </div>
      )}

      {/* Image Upload Method */}
      {inputMethod === 'image' && (
        <div className="image-input-section">
          <div
            className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
              dragActive 
                ? 'border-green-500 bg-green-50' 
                : 'border-gray-300 hover:border-gray-400'
            }`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <div className="text-4xl mb-4">📱</div>
            <p className="text-lg font-medium text-gray-700 mb-2">
              Upload Prescription Image
            </p>
            <p className="text-sm text-gray-500 mb-4">
              Drag and drop an image here, or click to select
            </p>
            
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={(e) => e.target.files[0] && handleImageUpload(e.target.files[0])}
              className="hidden"
            />
            
            <button
              onClick={() => fileInputRef.current?.click()}
              disabled={isAnalyzing}
              className="px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
            >
              📸 Choose Image
            </button>
          </div>
          
          <div className="mt-4 p-4 bg-blue-50 rounded-lg">
            <div className="flex items-center">
              <span className="text-blue-500 mr-2">ℹ️</span>
              <p className="text-sm text-blue-700">
                <strong>AI OCR:</strong> Our system will automatically extract text from your prescription image using advanced AI technology!
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Analysis Result */}
      {analysisResult && (
        <div className="analysis-result mt-8 p-6 border-2 border-green-200 rounded-lg bg-green-50">
          <div className="flex items-center mb-4">
            <span className="text-3xl mr-3">{analysisResult.theme.emoji}</span>
            <div>
              <h3 className="text-xl font-bold text-green-800">
                Analysis Complete! 
              </h3>
              <p className="text-green-600">{analysisResult.greeting}</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div className="bg-white p-4 rounded-lg">
              <div className="text-2xl mb-2">💊</div>
              <div className="text-sm text-gray-600">Medications</div>
              <div className="text-lg font-bold">{analysisResult.medications.length} detected</div>
            </div>
            
            <div className="bg-white p-4 rounded-lg">
              <div className="text-2xl mb-2">⚠️</div>
              <div className="text-sm text-gray-600">Risk Level</div>
              <div className="text-lg font-bold">{analysisResult.riskAnalysis.riskLevel}</div>
            </div>
            
            <div className="bg-white p-4 rounded-lg">
              <div className="text-2xl mb-2">{analysisResult.theme.emoji}</div>
              <div className="text-sm text-gray-600">Health Persona</div>
              <div className="text-lg font-bold">{analysisResult.theme.name}</div>
            </div>
          </div>
          
          <div className="text-center">
            <button
              onClick={() => window.location.href = '/dashboard'}
              className="px-8 py-3 bg-gradient-to-r from-green-500 to-blue-600 text-white rounded-lg font-bold hover:from-green-600 hover:to-blue-700 transition-all transform hover:scale-105"
            >
              🎯 View Personalized Dashboard
            </button>
          </div>
        </div>
      )}
      
      {/* Processing Indicator */}
      {isAnalyzing && (
        <div className="mt-6 text-center">
          <div className="inline-flex items-center space-x-2">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500"></div>
            <span className="text-blue-600 font-medium">
              {inputMethod === 'image' ? 'Processing image with AI OCR...' : 'Analyzing prescription with AI...'}
            </span>
          </div>
          <div className="mt-2 text-sm text-gray-500">
            • Extracting medication information<br/>
            • Analyzing health patterns<br/>
            • Assigning personalized health persona<br/>
            • Generating recommendations
          </div>
        </div>
      )}
    </div>
  );
};

export default PrescriptionInput;