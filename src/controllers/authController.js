import jwt from "jsonwebtoken";
import User from "../models/User.js";
import ErrorResponse from "../utils/errorResponse.js";

// @desc    Register user
// @route   POST /api/v1/auth/register
// @access  Public
export const register = async (req, res, next) => {
  try {
    const { name, email, phone, password, role } = req.body;

    // Create user
    const user = await User.create({
      name,
      email,
      phone,
      password,
      role,
    });

    sendTokenResponse(user, 200, res);
  } catch (err) {
    next(err);
  }
};

// @desc    Login user
// @route   POST /api/v1/auth/login
// @access  Public
export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Validate email & password
    if (!email || !password) {
      return next(
        new ErrorResponse("Please provide an email and password", 400)
      );
    }

    // Check for user
    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      return next(new ErrorResponse("Invalid credentials", 401));
    }

    // Check if password matches
    const isMatch = await user.matchPassword(password);

    if (!isMatch) {
      return next(new ErrorResponse("Invalid credentials", 401));
    }

    sendTokenResponse(user, 200, res);
  } catch (err) {
    next(err);
  }
};

// @desc    Get current logged in user
// @route   GET /api/v1/auth/me
// @access  Private
export const getMe = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Log user out / clear cookie
// @route   GET /api/v1/auth/logout
// @access  Private
export const logout = async (req, res, next) => {
  res.cookie("token", "none", {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true,
  });

  res.status(200).json({
    success: true,
    data: {},
  });
};

// @desc    Delete user account and all associated data
// @route   DELETE /api/v1/auth/delete-account
// @access  Private
export const deleteAccount = async (req, res, next) => {
  try {
    const userId = req.user.id;
    console.log(`🗑️ Starting account deletion for user ID: ${userId}`);

    // Import models dynamically to avoid circular dependencies
    const UserProfile = (await import('../models/UserProfile.js')).default;
    const CalendarEvent = (await import('../models/CalendarEvent.js')).default;
    const ChatMessage = (await import('../models/ChatMessage.js')).default;

    // Delete all associated data first
    console.log('🔄 Deleting user profile...');
    await UserProfile.deleteMany({ user: userId });

    console.log('🔄 Deleting calendar events...');
    await CalendarEvent.deleteMany({ user: userId });

    console.log('🔄 Deleting chat messages...');
    await ChatMessage.deleteMany({ user: userId });

    // Delete the main user account
    console.log('🔄 Deleting user account...');
    await User.findByIdAndDelete(userId);

    console.log('✅ Account deletion completed successfully');

    // Clear the auth cookie
    res.cookie("token", "none", {
      expires: new Date(Date.now() + 10 * 1000),
      httpOnly: true,
    });

    res.status(200).json({
      success: true,
      message: 'Account and all associated data have been permanently deleted'
    });
  } catch (err) {
    console.error('❌ Error during account deletion:', err);
    next(err);
  }
};

// Get token from model, create cookie and send response
const sendTokenResponse = (user, statusCode, res) => {
  const token = user.getSignedJwtToken();

  const options = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
  };

  res
    .status(statusCode)
    .cookie("token", token, options)
    .json({
      success: true,
      token,
      user: {
        // ADD THIS
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
};
