import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Save, Heart, Activity, Calendar, FileText, Trash2, AlertTriangle } from 'lucide-react';
import api from '../utils/api';
import toast from 'react-hot-toast';
import useAuthStore from '../store/authStore';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('basic');
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [profile, setProfile] = useState({
    // Basic Info
    age: null,
    gestationalAgeWeeks: null,
    height: null,
    weight: null,
    gravidity: null,
    parity: null,
    
    // Health Metrics - Simple structure
    bloodPressure: { 
      systolic: null, 
      diastolic: null
    },
    bloodSugar: { 
      value: null, 
      unit: 'mg/dL'
    },
    hemoglobin: {
      value: null,
      unit: 'g/dL'
    },
    
    // Medical History
    hasHypertension: false,
    hasDiabetes: false,
    
    // Lifestyle - Simple fields only
    stressLevel: 5,
    hasSupportSystem: null,
    smokes: false,
    consumesAlcohol: false
  });

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const response = await api.get('/users/profile');
      if (response.data.data) {
        setProfile({ ...profile, ...response.data.data });
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Simple data structure that works with the model
      const profileData = {
        // Basic Info - convert empty strings to null
        age: profile.age || null,
        gestationalAgeWeeks: profile.gestationalAgeWeeks || null,
        height: profile.height || null,
        weight: profile.weight || null,
        gravidity: profile.gravidity || null,
        parity: profile.parity || null,
        
        // Health Metrics - only include if values exist
        ...(profile.bloodPressure?.systolic || profile.bloodPressure?.diastolic ? {
          bloodPressure: {
            systolic: profile.bloodPressure.systolic || null,
            diastolic: profile.bloodPressure.diastolic || null,
            lastChecked: new Date()
          }
        } : {}),
        
        ...(profile.bloodSugar?.value ? {
          bloodSugar: {
            value: profile.bloodSugar.value,
            unit: 'mg/dL',
            lastChecked: new Date()
          }
        } : {}),
        
        ...(profile.hemoglobin?.value ? {
          hemoglobin: {
            value: profile.hemoglobin.value,
            unit: 'g/dL',
            lastChecked: new Date()
          }
        } : {}),
        
        // Medical History
        hasHypertension: profile.hasHypertension || false,
        hasDiabetes: profile.hasDiabetes || false,
        
        // Lifestyle
        stressLevel: profile.stressLevel || null,
        hasSupportSystem: profile.hasSupportSystem,
        smokes: profile.smokes || false,
        consumesAlcohol: profile.consumesAlcohol || false
      };
      
      console.log('🚀 Sending clean profile data:', profileData);
      await api.post('/users/profile', profileData);
      toast.success('Profile saved successfully! 🎉');
    } catch (error) {
      console.error('❌ Profile update error:', error.response?.data);
      const errorMessage = error.response?.data?.error || 'Failed to save profile';
      toast.error(errorMessage);
    }
  };

  const handleChange = (field, value) => {
    setProfile({ ...profile, [field]: value });
  };

  const handleNestedChange = (parent, field, value) => {
    setProfile({
      ...profile,
      [parent]: { ...profile[parent], [field]: value }
    });
  };

  const handleDeleteAccount = async () => {
    try {
      toast.loading('Deleting account and all data...');
      
      await api.delete('/auth/delete-account');
      
      toast.dismiss();
      toast.success('Account deleted successfully. You will be redirected to login.');
      
      // Logout user and redirect
      logout();
      navigate('/login');
    } catch (error) {
      toast.dismiss();
      toast.error(error.response?.data?.error || 'Failed to delete account');
    }
  };

  const tabs = [
    { id: 'basic', label: 'Basic Info', icon: User },
    { id: 'health', label: 'Health Metrics', icon: Activity },
    { id: 'medical', label: 'Medical History', icon: FileText },
    { id: 'lifestyle', label: 'Lifestyle', icon: Heart },
    { id: 'account', label: 'Account Settings', icon: Trash2 }
  ];

  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card rounded-2xl p-6 mb-6"
        >
          <div className="flex items-center space-x-4">
            <div className="gradient-primary p-4 rounded-2xl">
              <User className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold gradient-text">My Profile</h1>
              <p className="text-gray-600">{user?.email}</p>
            </div>
          </div>
        </motion.div>

        {/* Tabs */}
        <div className="glass-card rounded-2xl p-2 mb-6">
          <div className="flex space-x-2 overflow-x-auto">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 px-4 py-3 rounded-xl transition-all whitespace-nowrap ${
                    activeTab === tab.id
                      ? 'bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 text-white'
                      : 'text-gray-700 hover:bg-white/50'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Form */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="glass-card rounded-2xl p-6"
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Basic Info */}
            {activeTab === 'basic' && (
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Age <span className="text-gray-500">(optional)</span></label>
                    <input
                      type="number"
                      min="10"
                      max="60"
                      value={profile.age || ''}
                      onChange={(e) => handleChange('age', e.target.value)}
                      className="input-field"
                      placeholder="28"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Gestational Age (weeks) <span className="text-gray-500">(optional)</span></label>
                    <input
                      type="number"
                      min="1"
                      max="42"
                      value={profile.gestationalAgeWeeks || ''}
                      onChange={(e) => handleChange('gestationalAgeWeeks', e.target.value)}
                      className="input-field"
                      placeholder="24"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Height (cm) <span className="text-gray-500">(optional)</span></label>
                    <input
                      type="number"
                      min="100"
                      max="250"
                      value={profile.height || ''}
                      onChange={(e) => handleChange('height', e.target.value)}
                      className="input-field"
                      placeholder="165"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Weight (kg) <span className="text-gray-500">(optional)</span></label>
                    <input
                      type="number"
                      min="30"
                      max="200"
                      value={profile.weight || ''}
                      onChange={(e) => handleChange('weight', e.target.value)}
                      className="input-field"
                      placeholder="68"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Health Metrics */}
            {activeTab === 'health' && (
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Blood Pressure Systolic <span className="text-gray-500">(optional)</span></label>
                    <input
                      type="number"
                      min="70"
                      max="250"
                      value={profile.bloodPressure?.systolic || ''}
                      onChange={(e) => handleNestedChange('bloodPressure', 'systolic', e.target.value)}
                      className="input-field"
                      placeholder="120"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Blood Pressure Diastolic <span className="text-gray-500">(optional)</span></label>
                    <input
                      type="number"
                      min="40"
                      max="150"
                      value={profile.bloodPressure?.diastolic || ''}
                      onChange={(e) => handleNestedChange('bloodPressure', 'diastolic', e.target.value)}
                      className="input-field"
                      placeholder="80"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Blood Sugar Level <span className="text-gray-500">(optional)</span></label>
                    <input
                      type="number"
                      min="0"
                      value={profile.bloodSugar?.value || ''}
                      onChange={(e) => handleNestedChange('bloodSugar', 'value', e.target.value)}
                      className="input-field"
                      placeholder="95"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Hemoglobin Level <span className="text-gray-500">(optional)</span></label>
                    <input
                      type="number"
                      min="0"
                      step="0.1"
                      value={profile.hemoglobin?.value || ''}
                      onChange={(e) => handleNestedChange('hemoglobin', 'value', e.target.value)}
                      className="input-field"
                      placeholder="12.5"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Medical History */}
            {activeTab === 'medical' && (
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Gravidity (Total Pregnancies) <span className="text-gray-500">(optional)</span></label>
                    <input
                      type="number"
                      min="0"
                      value={profile.gravidity || ''}
                      onChange={(e) => handleChange('gravidity', e.target.value ? parseInt(e.target.value) : null)}
                      className="input-field"
                      placeholder="0"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Parity (Live Births) <span className="text-gray-500">(optional)</span></label>
                    <input
                      type="number"
                      min="0"
                      value={profile.parity || ''}
                      onChange={(e) => handleChange('parity', e.target.value ? parseInt(e.target.value) : null)}
                      className="input-field"
                      placeholder="0"
                    />
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="font-medium text-gray-800">Medical Conditions <span className="text-gray-500">(optional)</span></h4>
                  <label className="flex items-center space-x-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={profile.hasHypertension || false}
                      onChange={(e) => handleChange('hasHypertension', e.target.checked)}
                      className="w-5 h-5 text-purple-500 rounded focus:ring-purple-500"
                    />
                    <span className="text-gray-700">Hypertension</span>
                  </label>
                  <label className="flex items-center space-x-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={profile.hasDiabetes || false}
                      onChange={(e) => handleChange('hasDiabetes', e.target.checked)}
                      className="w-5 h-5 text-purple-500 rounded focus:ring-purple-500"
                    />
                    <span className="text-gray-700">Diabetes</span>
                  </label>
                </div>
              </div>
            )}

            {/* Lifestyle */}
            {activeTab === 'lifestyle' && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Stress Level (1-10) <span className="text-gray-500">(optional)</span></label>
                    <input
                      type="range"
                      min="1"
                      max="10"
                      value={profile.stressLevel || 5}
                      onChange={(e) => handleChange('stressLevel', parseInt(e.target.value))}
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                    />
                    <div className="flex justify-between text-xs text-gray-500 mt-1">
                      <span>Low (1)</span>
                      <span className="font-medium">{profile.stressLevel || 5}</span>
                      <span>High (10)</span>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Do you have a support system? <span className="text-gray-500">(optional)</span></label>
                    <div className="flex space-x-4">
                      <label className="flex items-center">
                        <input
                          type="radio"
                          name="hasSupportSystem"
                          value="true"
                          checked={profile.hasSupportSystem === true}
                          onChange={() => handleChange('hasSupportSystem', true)}
                          className="mr-2"
                        />
                        Yes
                      </label>
                      <label className="flex items-center">
                        <input
                          type="radio"
                          name="hasSupportSystem"
                          value="false"
                          checked={profile.hasSupportSystem === false}
                          onChange={() => handleChange('hasSupportSystem', false)}
                          className="mr-2"
                        />
                        No
                      </label>
                    </div>
                  </div>
                </div>
                
                {/* Simple Lifestyle Questions */}
                <div className="space-y-4">
                  <h4 className="font-medium text-gray-800">Lifestyle Questions <span className="text-gray-500">(optional)</span></h4>
                  <label className="flex items-center space-x-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={profile.smokes || false}
                      onChange={(e) => handleChange('smokes', e.target.checked)}
                      className="w-5 h-5 text-purple-500 rounded focus:ring-purple-500"
                    />
                    <span className="text-gray-700">Do you smoke?</span>
                  </label>
                  <label className="flex items-center space-x-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={profile.consumesAlcohol || false}
                      onChange={(e) => handleChange('consumesAlcohol', e.target.checked)}
                      className="w-5 h-5 text-purple-500 rounded focus:ring-purple-500"
                    />
                    <span className="text-gray-700">Do you consume alcohol?</span>
                  </label>
                </div>
              </div>
            )}

            {/* Account Settings */}
            {activeTab === 'account' && (
              <div className="space-y-6">
                {/* Account Info */}
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-xl border border-blue-200">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="bg-blue-100 p-2 rounded-lg">
                      <User className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-blue-900">Account Information</h3>
                      <p className="text-sm text-blue-600">Your account details</p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Name:</span>
                      <span className="font-medium">{user?.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Email:</span>
                      <span className="font-medium">{user?.email}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Role:</span>
                      <span className="font-medium capitalize">{user?.role?.replace('_', ' ')}</span>
                    </div>
                  </div>
                </div>

                {/* Danger Zone */}
                <div className="bg-gradient-to-r from-red-50 to-pink-50 p-6 rounded-xl border border-red-200">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="bg-red-100 p-2 rounded-lg">
                      <AlertTriangle className="w-5 h-5 text-red-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-red-900">Danger Zone</h3>
                      <p className="text-sm text-red-600">Irreversible actions</p>
                    </div>
                  </div>
                  
                  <div className="bg-white p-4 rounded-lg border border-red-200">
                    <h4 className="font-medium text-gray-900 mb-2">Delete Account</h4>
                    <p className="text-sm text-gray-600 mb-4">
                      Once you delete your account, there is no going back. Please be certain.
                      This will permanently delete:
                    </p>
                    <ul className="text-sm text-gray-600 mb-4 ml-4">
                      <li>• Your profile and health data</li>
                      <li>• All calendar events and appointments</li>
                      <li>• Chat history and conversations</li>
                      <li>• All personal information</li>
                    </ul>
                    <button
                      onClick={() => setShowDeleteConfirm(true)}
                      className="flex items-center space-x-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                      <span>Delete My Account</span>
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Submit Button - Only show for non-account tabs */}
            {activeTab !== 'account' && (
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="btn-primary w-full flex items-center justify-center space-x-2"
              >
                <Save className="w-5 h-5" />
                <span>Save Profile</span>
              </motion.button>
            )}
          </form>
        </motion.div>

        {/* Delete Confirmation Modal */}
        <AnimatePresence>
          {showDeleteConfirm && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-white rounded-2xl max-w-md w-full p-6"
              >
                <div className="flex items-center space-x-3 mb-4">
                  <div className="bg-red-100 p-2 rounded-full">
                    <AlertTriangle className="w-6 h-6 text-red-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">Delete Account</h3>
                    <p className="text-sm text-gray-600">This action cannot be undone</p>
                  </div>
                </div>
                
                <div className="mb-6">
                  <p className="text-gray-700 mb-4">
                    Are you absolutely sure you want to delete your account? This will:
                  </p>
                  <div className="bg-red-50 p-4 rounded-lg border border-red-200 mb-4">
                    <ul className="text-sm text-red-700 space-y-1">
                      <li>⚠️ Permanently delete all your health data</li>
                      <li>⚠️ Remove all calendar events and appointments</li>
                      <li>⚠️ Delete all chat history and conversations</li>
                      <li>⚠️ Cannot be recovered or restored</li>
                    </ul>
                  </div>
                  <p className="text-sm text-gray-600">
                    Type <strong>DELETE</strong> to confirm:
                  </p>
                  <input
                    type="text"
                    placeholder="Type DELETE to confirm"
                    className="input-field mt-2"
                    id="deleteConfirm"
                  />
                </div>
                
                <div className="flex space-x-3">
                  <button
                    onClick={() => setShowDeleteConfirm(false)}
                    className="flex-1 px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => {
                      const confirmInput = document.getElementById('deleteConfirm');
                      if (confirmInput.value === 'DELETE') {
                        setShowDeleteConfirm(false);
                        handleDeleteAccount();
                      } else {
                        toast.error('Please type DELETE to confirm');
                      }
                    }}
                    className="flex-1 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors flex items-center justify-center space-x-2"
                  >
                    <Trash2 className="w-4 h-4" />
                    <span>Delete Account</span>
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Profile;
