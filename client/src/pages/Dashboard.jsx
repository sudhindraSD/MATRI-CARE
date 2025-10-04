import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Heart, Activity, Calendar, TrendingUp, Baby, Weight, Droplet, AlertCircle } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import useAuthStore from '../store/authStore';
import api from '../utils/api';

const Dashboard = () => {
  const { user } = useAuthStore();
  const [profile, setProfile] = useState(null);
  const [upcomingEvents, setUpcomingEvents] = useState([]);

  useEffect(() => {
    fetchProfile();
    fetchUpcomingEvents();
  }, []);

  const fetchProfile = async () => {
    try {
      const response = await api.get('/users/profile');
      setProfile(response.data.data);
    } catch (error) {
      console.error('Error fetching profile:', error);
    }
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
      label: 'Gestational Age',
      value: profile?.gestationalAgeWeeks ? `${profile.gestationalAgeWeeks} weeks` : 'N/A',
      color: 'from-pink-500 to-rose-500',
      bgColor: 'bg-pink-50'
    },
    {
      icon: Weight,
      label: 'Weight',
      value: profile?.weight ? `${profile.weight} kg` : 'N/A',
      color: 'from-purple-500 to-indigo-500',
      bgColor: 'bg-purple-50'
    },
    {
      icon: Activity,
      label: 'Blood Pressure',
      value: profile?.bloodPressure ? `${profile.bloodPressure.systolic}/${profile.bloodPressure.diastolic}` : 'N/A',
      color: 'from-blue-500 to-cyan-500',
      bgColor: 'bg-blue-50'
    },
    {
      icon: Droplet,
      label: 'Blood Sugar',
      value: profile?.bloodSugar?.fasting ? `${profile.bloodSugar.fasting} mg/dL` : 'N/A',
      color: 'from-teal-500 to-emerald-500',
      bgColor: 'bg-teal-50'
    }
  ];

  const mockChartData = [
    { week: 'Week 20', weight: 65 },
    { week: 'Week 22', weight: 66 },
    { week: 'Week 24', weight: 68 },
    { week: 'Week 26', weight: 69 },
    { week: 'Week 28', weight: 70 },
  ];

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
                Welcome back, {user?.name?.split(' ')[0]}! 👋
              </h1>
              <p className="text-gray-600">Here's your health overview today</p>
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
                <div className={`${metric.bgColor} w-12 h-12 rounded-xl flex items-center justify-center mb-4`}>
                  <Icon className={`w-6 h-6 bg-gradient-to-r ${metric.color} bg-clip-text text-transparent`} />
                </div>
                <p className="text-gray-600 text-sm mb-1">{metric.label}</p>
                <p className="text-2xl font-bold text-gray-800">{metric.value}</p>
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
              <h2 className="text-xl font-bold text-gray-800">Weight Progress</h2>
              <TrendingUp className="w-5 h-5 text-green-500" />
            </div>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={mockChartData}>
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
          </motion.div>

          {/* Upcoming Events */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="glass-card rounded-2xl p-6"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-800">Upcoming</h2>
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
                    className="bg-gradient-to-r from-pink-50 to-purple-50 p-4 rounded-xl"
                  >
                    <p className="font-semibold text-gray-800 mb-1">{event.title}</p>
                    <p className="text-sm text-gray-600">
                      {new Date(event.startDate).toLocaleDateString()}
                    </p>
                  </motion.div>
                ))
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <Calendar className="w-12 h-12 mx-auto mb-2 opacity-50" />
                  <p>No upcoming events</p>
                </div>
              )}
            </div>
          </motion.div>
        </div>

        {/* Health Tips */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card rounded-2xl p-6"
        >
          <div className="flex items-start space-x-4">
            <div className="bg-blue-50 p-3 rounded-xl">
              <AlertCircle className="w-6 h-6 text-blue-500" />
            </div>
            <div>
              <h3 className="font-bold text-gray-800 mb-2">Today's Health Tip</h3>
              <p className="text-gray-600">
                Stay hydrated! Drink at least 8-10 glasses of water daily. Proper hydration supports your baby's development and helps prevent common pregnancy discomforts.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;
