import UserProfile from '../models/UserProfile.js';
import CalendarEvent from '../models/CalendarEvent.js';
import ErrorResponse from '../utils/errorResponse.js';

// Helper function to create sample calendar events
const createSampleCalendarEvents = async (userId) => {
  try {
    const now = new Date();
    const sampleEvents = [
      {
        user: userId,
        createdBy: userId,
        title: 'Prenatal Checkup',
        description: 'Regular prenatal checkup with your healthcare provider',
        eventType: 'checkup',
        startDate: new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000), // 1 week from now
        endDate: new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000 + 60 * 60 * 1000), // 1 hour duration
        location: 'Medical Center',
        status: 'scheduled'
      },
      {
        user: userId,
        createdBy: userId,
        title: 'Take Prenatal Vitamins',
        description: 'Daily prenatal vitamin reminder',
        eventType: 'medication',
        startDate: new Date(now.getTime() + 24 * 60 * 60 * 1000), // Tomorrow
        isAllDay: true,
        status: 'scheduled'
      },
      {
        user: userId,
        createdBy: userId,
        title: 'Ultrasound Appointment',
        description: '20-week anatomy scan',
        eventType: 'ultrasound',
        startDate: new Date(now.getTime() + 14 * 24 * 60 * 60 * 1000), // 2 weeks from now
        endDate: new Date(now.getTime() + 14 * 24 * 60 * 60 * 1000 + 45 * 60 * 1000), // 45 minutes
        location: 'Imaging Department',
        status: 'scheduled'
      }
    ];
    
    // Only create if user has no events yet
    const existingEvents = await CalendarEvent.countDocuments({ user: userId });
    if (existingEvents === 0) {
      await CalendarEvent.insertMany(sampleEvents);
      console.log(`Created ${sampleEvents.length} sample events for user ${userId}`);
    }
  } catch (error) {
    console.error('Error creating sample events:', error);
    // Don't throw error - this is not critical
  }
};

// @desc    Get user profile
// @route   GET /api/v1/users/profile
// @access  Private
export const getUserProfile = async (req, res, next) => {
  try {
    let profile = await UserProfile.findOne({ user: req.user.id })
      .populate('user', 'name email phone role');

    if (!profile) {
      // Create a clean profile with zero/empty values for new users
      profile = await UserProfile.create({
        user: req.user.id,
        age: null, // User will enter their real age
        gestationalAgeWeeks: null, // User will enter current pregnancy week
        height: null, // User will enter their height
        weight: null, // User will enter their current weight
        bloodPressure: {
          systolic: null,
          diastolic: null,
          lastChecked: null
        },
        bloodSugar: {
          value: null,
          unit: 'mg/dL',
          lastChecked: null
        },
        hemoglobin: {
          value: null,
          unit: 'g/dL',
          lastChecked: null
        },
        hasHypertension: false,
        hasDiabetes: false,
        stressLevel: null, // User will set their stress level
        hasSupportSystem: null, // User will indicate if they have support
        weightHistory: [] // Empty weight history
      });
      
      // Populate the user data for the newly created profile
      profile = await UserProfile.findById(profile._id)
        .populate('user', 'name email phone role');
        
      // Don't create sample calendar events for new users - let them start fresh
      // await createSampleCalendarEvents(req.user.id);
      
      // Weight history is already initialized as empty array
      // No need to add initial weight entry since weight is null
    }

    res.status(200).json({
      success: true,
      data: profile
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Create or update user profile
// @route   POST /api/v1/users/profile
// @access  Private
export const updateUserProfile = async (req, res, next) => {
  try {
    // Users can always update their own profile
    let profile = await UserProfile.findOne({ user: req.user.id });

    if (!profile) {
      // Create new profile if it doesn't exist
      req.body.user = req.user.id;
      profile = await UserProfile.create(req.body);
      return res.status(201).json({
        success: true,
        data: profile
      });
    }

    // Check if weight is being updated and add to history
    if (req.body.weight && req.body.weight !== profile.weight) {
      const weightEntry = {
        weight: req.body.weight,
        date: new Date(),
        gestationalWeeks: req.body.gestationalAgeWeeks || profile.gestationalAgeWeeks
      };
      
      // Add to weight history (keep last 10 entries)
      if (!profile.weightHistory) {
        profile.weightHistory = [];
      }
      profile.weightHistory.push(weightEntry);
      
      // Keep only last 10 entries
      if (profile.weightHistory.length > 10) {
        profile.weightHistory = profile.weightHistory.slice(-10);
      }
      
      req.body.weightHistory = profile.weightHistory;
    }
    
    // Update existing profile
    profile = await UserProfile.findOneAndUpdate(
      { user: req.user.id },
      { $set: req.body },
      { new: true, runValidators: true }
    );

    res.status(200).json({
      success: true,
      data: profile
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Get all profiles (for health workers)
// @route   GET /api/v1/users/profiles
// @access  Private/HealthWorkers
export const getProfiles = async (req, res, next) => {
  try {
    const profiles = await UserProfile.find()
      .populate('user', 'name email phone role');

    res.status(200).json({
      success: true,
      count: profiles.length,
      data: profiles
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Get single profile by ID (for health workers)
// @route   GET /api/v1/users/profiles/:id
// @access  Private/HealthWorkers
export const getProfile = async (req, res, next) => {
  try {
    const profile = await UserProfile.findById(req.params.id)
      .populate('user', 'name email phone role');

    if (!profile) {
      return next(
        new ErrorResponse(`Profile not found with id of ${req.params.id}`, 404)
      );
    }

    res.status(200).json({
      success: true,
      data: profile
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Search profiles
// @route   GET /api/v1/users/profiles/search
// @access  Private
export const searchProfiles = async (req, res, next) => {
  try {
    const { q } = req.query;

    if (!q) {
      return next(new ErrorResponse('Please provide a search term', 400));
    }

    const profiles = await UserProfile.find(
      { $text: { $search: q } },
      { score: { $meta: 'textScore' } }
    )
      .sort({ score: { $meta: 'textScore' } })
      .populate('user', 'name email phone role');

    res.status(200).json({
      success: true,
      count: profiles.length,
      data: profiles
    });
  } catch (err) {
    next(err);
  }
};
