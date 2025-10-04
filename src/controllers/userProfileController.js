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
      // Create a basic profile with some sample data for new users
      profile = await UserProfile.create({
        user: req.user.id,
        age: 28,
        gestationalAgeWeeks: 24,
        height: 165,
        weight: 68,
        bloodPressure: {
          systolic: 115,
          diastolic: 75,
          lastChecked: new Date()
        },
        bloodSugar: {
          value: 95,
          unit: 'mg/dL',
          lastChecked: new Date()
        },
        hemoglobin: {
          value: 12.5,
          unit: 'g/dL',
          lastChecked: new Date()
        },
        hasHypertension: false,
        hasDiabetes: false,
        stressLevel: 4,
        hasSupportSystem: true
      });
      
      // Populate the user data for the newly created profile
      profile = await UserProfile.findById(profile._id)
        .populate('user', 'name email phone role');
        
      // Create some sample calendar events for new users
      await createSampleCalendarEvents(req.user.id);
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
