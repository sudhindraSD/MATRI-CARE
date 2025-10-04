import UserProfile from '../models/UserProfile.js';
import ErrorResponse from '../utils/errorResponse.js';

// @desc    Get user profile
// @route   GET /api/v1/users/profile
// @access  Private
export const getUserProfile = async (req, res, next) => {
  try {
    const profile = await UserProfile.findOne({ user: req.user.id })
      .populate('user', 'name email phone role');

    if (!profile) {
      return next(new ErrorResponse('Profile not found', 404));
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
    // Only allow users to update their own profile
    if (req.params.userId !== req.user.id && req.user.role !== 'health_worker') {
      return next(
        new ErrorResponse('Not authorized to update this profile', 403)
      );
    }

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
