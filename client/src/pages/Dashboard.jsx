import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Heart, Activity, Calendar, TrendingUp, Baby, Weight, Droplet, AlertCircle, Scale, Zap, Stethoscope, TestTube } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import useAuthStore from '../store/authStore';
import api from '../utils/api';
import { getDailyHealthTip } from '../utils/dailyTips';
import PrescriptionInput from '../components/PrescriptionInput';

const Dashboard = () => {
  const { user } = useAuthStore();
  const [profile, setProfile] = useState(null);
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [dailyTip, setDailyTip] = useState(null);
  const [showPrescriptionInput, setShowPrescriptionInput] = useState(false);
  const [prescriptionAnalysis, setPrescriptionAnalysis] = useState(null);

  useEffect(() => {
    fetchProfile();
    fetchUpcomingEvents();
  }, []);
  
  // Refresh data when user comes back to dashboard (to show updated weight)
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (!document.hidden) {
        fetchProfile(); // Refresh profile data when tab becomes visible
      }
    };
    
    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, []);

  const fetchProfile = async () => {
    try {
      const response = await api.get('/users/profile');
      setProfile(response.data.data);
      // Update daily tip when profile loads
      updateDailyTip(response.data.data?.gestationalAgeWeeks);
    } catch (error) {
      console.error('Error fetching profile:', error);
    }
  };
  
  const updateDailyTip = (gestationalWeeks) => {
    const tip = getDailyHealthTip(gestationalWeeks || 24);
    setDailyTip(tip);
  };
  
  const handlePrescriptionAnalyzed = (analysisResult) => {
    setPrescriptionAnalysis(analysisResult);
    setShowPrescriptionInput(false);
    // You could also save this to the user's profile via API
    console.log('🎯 Prescription Analysis Result:', analysisResult);
  };

  const fetchUpcomingEvents = async () => {
    try {
      const response = await api.get('/calendar/events/upcoming');
      setUpcomingEvents(response.data.data.slice(0, 3));
    } catch (error) {
      console.error('Error fetching events:', error);
    }
  };

  const healthMetrics = [
    {
      icon: Baby,
      emoji: '👶',
      label: '🤰 Gestational Age',
      value: profile?.gestationalAgeWeeks ? `${profile.gestationalAgeWeeks} weeks` : 'N/A',
      color: 'from-pink-500 to-rose-500',
      bgColor: 'bg-gradient-to-br from-pink-50 to-rose-50',
      desc: 'Your baby\'s development'
    },
    {
      icon: Scale,
      emoji: '⚖️',
      label: '💪 Weight Progress',
      value: profile?.weight ? `${profile.weight} kg` : 'N/A',
      color: 'from-purple-500 to-indigo-500',
      bgColor: 'bg-gradient-to-br from-purple-50 to-indigo-50',
      desc: 'Your healthy weight journey'
    },
    {
      icon: Stethoscope,
      emoji: '🩺',
      label: '❤️ Blood Pressure',
      value: profile?.bloodPressure ? `${profile.bloodPressure.systolic}/${profile.bloodPressure.diastolic}` : 'N/A',
      color: 'from-red-500 to-pink-500',
      bgColor: 'bg-gradient-to-br from-red-50 to-pink-50',
      desc: 'Heart health monitoring'
    },
    {
      icon: TestTube,
      emoji: '🧪',
      label: '🍯 Blood Sugar',
      value: profile?.bloodSugar?.value ? `${profile.bloodSugar.value} ${profile.bloodSugar.unit || 'mg/dL'}` : 'N/A',
      color: 'from-amber-500 to-orange-500',
      bgColor: 'bg-gradient-to-br from-amber-50 to-orange-50',
      desc: 'Glucose level tracking'
    }
  ];

  // Generate chart data from user's actual weight history
  const generateChartData = () => {
    if (!profile || !profile.weightHistory || profile.weightHistory.length === 0) {
      // If no weight history and no current weight, return empty data
      if (!profile?.weight || !profile?.gestationalAgeWeeks) {
        return []; // Empty chart for new users
      }
      
      // If weight exists but no history, create a single point
      return [
        { 
          week: `Week ${profile.gestationalAgeWeeks}`, 
          weight: profile.weight,
          date: new Date().toLocaleDateString()
        }
      ];
    }
    
    // Use actual weight history
    return profile.weightHistory.map((entry, index) => {
      const weeks = entry.gestationalWeeks || (profile.gestationalAgeWeeks - profile.weightHistory.length + index + 1);
      return {
        week: `Week ${weeks}`,
        weight: entry.weight,
        date: new Date(entry.date).toLocaleDateString()
      };
    }).slice(-6); // Show last 6 entries for better visualization
  };
  
  const chartData = generateChartData();

  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Welcome Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card rounded-2xl p-6 md:p-8"
        >
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold gradient-text mb-2">
                🌸 Welcome back, {user?.name?.split(' ')[0]}! 👋✨
              </h1>
              <p className="text-gray-600">📊 Here's your health overview today 💖</p>
              {!prescriptionAnalysis && (
                <button
                  onClick={() => setShowPrescriptionInput(true)}
                  className="mt-4 inline-flex items-center px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:from-purple-600 hover:to-pink-600 transition-colors shadow-lg"
                >
                  💊 Add Prescription for AI Analysis
                </button>
              )}
            </div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="gradient-primary p-4 rounded-2xl"
            >
              <Heart className="w-8 h-8 text-white" />
            </motion.div>
          </div>
        </motion.div>

        {/* Health Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {healthMetrics.map((metric, index) => {
            const Icon = metric.icon;
            return (
              <motion.div
                key={metric.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="glass-card rounded-2xl p-6"
              >
                <div className={`${metric.bgColor} w-16 h-16 rounded-2xl flex items-center justify-center mb-4 relative overflow-hidden`}>
                  <div className="absolute inset-0 bg-gradient-to-br opacity-20" style={{background: `linear-gradient(135deg, ${metric.color.split(' ').slice(1).join(' ')})`.replace('from-', '').replace('to-', ', ')}}></div>
                  <span className="text-2xl relative z-10">{metric.emoji}</span>
                  <Icon className={`w-4 h-4 absolute bottom-1 right-1 text-gray-400`} />
                </div>
                <p className="text-gray-700 text-sm mb-1 font-medium">{metric.label}</p>
                <p className="text-2xl font-bold gradient-text mb-1">{metric.value}</p>
                <p className="text-xs text-gray-500">{metric.desc}</p>
              </motion.div>
            );
          })}
        </div>

        {/* Charts and Events */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Weight Progress Chart */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-2 glass-card rounded-2xl p-6"
          >
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-3">
                <div className="bg-gradient-to-br from-purple-100 to-indigo-100 p-2 rounded-xl">
                  <span className="text-xl">📊</span>
                </div>
                <div>
                  <h2 className="text-xl font-bold gradient-text">🏃‍♀️ Weight Progress</h2>
                  <p className="text-sm text-gray-500">Your healthy journey</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <TrendingUp className="w-5 h-5 text-green-500" />
                <span className="text-sm font-medium text-green-600">📈 Tracking</span>
              </div>
            </div>
            {chartData.length > 0 ? (
              <ResponsiveContainer width="100%" height={250}>
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="week" stroke="#6b7280" />
                  <YAxis stroke="#6b7280" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'rgba(255, 255, 255, 0.9)', 
                      borderRadius: '12px',
                      border: 'none',
                      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
                    }}
                    formatter={(value, name, props) => [
                      `${value} kg`,
                      'Weight'
                    ]}
                    labelFormatter={(label) => {
                      const dataPoint = chartData.find(d => d.week === label);
                      return dataPoint ? `${label} (${dataPoint.date})` : label;
                    }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="weight" 
                    stroke="url(#colorGradient)" 
                    strokeWidth={3}
                    dot={{ fill: '#8b5cf6', r: 5 }}
                  />
                  <defs>
                    <linearGradient id="colorGradient" x1="0" y1="0" x2="1" y2="0">
                      <stop offset="0%" stopColor="#ec4899" />
                      <stop offset="50%" stopColor="#8b5cf6" />
                      <stop offset="100%" stopColor="#3b82f6" />
                    </linearGradient>
                  </defs>
                </LineChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-[250px] flex flex-col items-center justify-center text-gray-500">
                <div className="bg-gray-100 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                  <span className="text-2xl">📊</span>
                </div>
                <p className="font-medium text-gray-600 mb-2">No weight data yet</p>
                <p className="text-sm text-gray-500 text-center">
                  📝 Add your weight and pregnancy info in Profile<br/>
                  to see your progress tracking!
                </p>
              </div>
            )}
          </motion.div>

          {/* Upcoming Events */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="glass-card rounded-2xl p-6"
          >
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-3">
                <div className="bg-gradient-to-br from-purple-100 to-pink-100 p-2 rounded-xl">
                  <span className="text-xl">📅</span>
                </div>
                <div>
                  <h2 className="text-xl font-bold gradient-text">🕰️ Upcoming Events</h2>
                  <p className="text-sm text-gray-500">Your appointments</p>
                </div>
              </div>
              <Calendar className="w-5 h-5 text-purple-500" />
            </div>
            <div className="space-y-4">
              {upcomingEvents.length > 0 ? (
                upcomingEvents.map((event, index) => (
                  <motion.div
                    key={event._id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-gradient-to-r from-pink-50 to-purple-50 p-4 rounded-xl border border-purple-100"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-center space-x-3">
                        <span className="text-lg">
                          {event.eventType === 'checkup' && '🩺'}
                          {event.eventType === 'medication' && '💊'}
                          {event.eventType === 'ultrasound' && '🖼️'}
                          {event.eventType === 'appointment' && '📅'}
                          {event.eventType === 'lab_test' && '🧪'}
                          {event.eventType === 'other' && '✨'}
                        </span>
                        <div>
                          <p className="font-semibold text-gray-800">{event.title}</p>
                          <p className="text-sm text-gray-600 flex items-center">
                            📆 {new Date(event.startDate).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        event.eventType === 'checkup' ? 'bg-blue-100 text-blue-600' :
                        event.eventType === 'medication' ? 'bg-green-100 text-green-600' :
                        event.eventType === 'ultrasound' ? 'bg-purple-100 text-purple-600' :
                        'bg-gray-100 text-gray-600'
                      }`}>
                        {event.eventType}
                      </span>
                    </div>
                  </motion.div>
                ))
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <div className="bg-gray-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-2xl">📅</span>
                  </div>
                  <p className="font-medium text-gray-600">🌱 No upcoming events</p>
                  <p className="text-sm text-gray-500 mt-1">Your schedule is clear!</p>
                </div>
              )}
            </div>
          </motion.div>
        </div>

        {/* Prescription Analysis Results */}
        {prescriptionAnalysis && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-card rounded-2xl p-6 bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200"
          >
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-3">
                <div className="bg-gradient-to-br from-purple-100 to-pink-100 p-3 rounded-xl">
                  <span className="text-2xl">{prescriptionAnalysis.theme.emoji}</span>
                </div>
                <div>
                  <h2 className="text-xl font-bold gradient-text">🤖 AI Prescription Analysis</h2>
                  <p className="text-sm text-purple-600">{prescriptionAnalysis.greeting}</p>
                </div>
              </div>
              <button
                onClick={() => setPrescriptionAnalysis(null)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                ✕
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <div className="text-2xl mb-2">💊</div>
                <div className="text-sm text-gray-600">Medications</div>
                <div className="text-xl font-bold">{prescriptionAnalysis.medications.length} detected</div>
              </div>
              
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <div className="text-2xl mb-2">⚠️</div>
                <div className="text-sm text-gray-600">Risk Level</div>
                <div className="text-xl font-bold">{prescriptionAnalysis.riskAnalysis.riskLevel}</div>
              </div>
              
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <div className="text-2xl mb-2">{prescriptionAnalysis.theme.emoji}</div>
                <div className="text-sm text-gray-600">Health Persona</div>
                <div className="text-xl font-bold">{prescriptionAnalysis.theme.name}</div>
              </div>
            </div>
            
            <div className="mb-4">
              <h4 className="font-bold text-gray-800 mb-3">🔍 Detected Medications:</h4>
              <div className="space-y-2">
                {prescriptionAnalysis.medications.map((med, index) => (
                  <div key={index} className="bg-white p-3 rounded-lg flex justify-between items-center shadow-sm">
                    <div>
                      <span className="font-medium">{med.name}</span>
                      <span className="text-gray-600 text-sm ml-2">({med.dosage})</span>
                    </div>
                    <span className="text-sm bg-green-100 text-green-800 px-2 py-1 rounded">{med.confidence}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
        
        {/* Daily Health Tips */}
        {dailyTip && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`glass-card rounded-2xl p-6 border ${
              dailyTip.category === 'Medical' ? 'bg-gradient-to-r from-red-50 to-pink-50 border-red-100' :
              dailyTip.category === 'Nutrition' ? 'bg-gradient-to-r from-green-50 to-emerald-50 border-green-100' :
              dailyTip.category === 'Lifestyle' ? 'bg-gradient-to-r from-purple-50 to-indigo-50 border-purple-100' :
              dailyTip.category === 'Preparation' ? 'bg-gradient-to-r from-orange-50 to-amber-50 border-orange-100' :
              'bg-gradient-to-r from-blue-50 to-cyan-50 border-blue-100'
            }`}
          >
            <div className="flex items-start space-x-4">
              <div className={`p-3 rounded-2xl ${
                dailyTip.category === 'Medical' ? 'bg-gradient-to-br from-red-100 to-pink-100' :
                dailyTip.category === 'Nutrition' ? 'bg-gradient-to-br from-green-100 to-emerald-100' :
                dailyTip.category === 'Lifestyle' ? 'bg-gradient-to-br from-purple-100 to-indigo-100' :
                dailyTip.category === 'Preparation' ? 'bg-gradient-to-br from-orange-100 to-amber-100' :
                'bg-gradient-to-br from-blue-100 to-cyan-100'
              }`}>
                <span className="text-2xl">{dailyTip.emoji}</span>
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-2">
                    <h3 className="font-bold text-gray-800">✨ {dailyTip.title}</h3>
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                      dailyTip.isPersonalized ? 
                      'bg-purple-100 text-purple-600' : 'bg-gray-100 text-gray-600'
                    }`}>
                      {dailyTip.isPersonalized ? `Trimester ${dailyTip.trimester}` : 'General'}
                    </span>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-gray-500">{dailyTip.date}</p>
                    <p className="text-xs font-medium text-gray-600">{dailyTip.category}</p>
                  </div>
                </div>
                <p className="text-gray-700 leading-relaxed mb-4">
                  {dailyTip.tip}
                </p>
                <div className="flex items-center space-x-4 text-sm text-gray-600">
                  {dailyTip.goals.map((goal, index) => (
                    <span key={index} className="flex items-center space-x-1">
                      <span>{goal.icon}</span>
                      <span>{goal.text}</span>
                    </span>
                  ))}
                </div>
                {dailyTip.gestationalWeeks && (
                  <div className="mt-3 pt-3 border-t border-gray-200">
                    <p className="text-xs text-gray-500">
                      📅 Week {dailyTip.gestationalWeeks} of pregnancy • Tip updates daily at midnight
                    </p>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
        
        {/* Prescription Input Modal */}
        {showPrescriptionInput && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <div className="sticky top-0 bg-white border-b px-6 py-4 flex items-center justify-between">
                <h2 className="text-2xl font-bold gradient-text">🤖 AI Prescription Analysis</h2>
                <button
                  onClick={() => setShowPrescriptionInput(false)}
                  className="text-gray-400 hover:text-gray-600 transition-colors text-2xl"
                >
                  ✕
                </button>
              </div>
              <div className="p-6">
                <PrescriptionInput 
                  onPrescriptionAnalyzed={handlePrescriptionAnalyzed}
                  currentWeek={profile?.gestationalAgeWeeks || 24}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
