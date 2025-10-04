import CalendarEvent from '../models/CalendarEvent.js';
import ErrorResponse from '../utils/errorResponse.js';

// @desc    Get all events for logged in user
// @route   GET /api/v1/calendar/events
// @access  Private
export const getEvents = async (req, res, next) => {
  try {
    const { startDate, endDate, eventType, status } = req.query;
    
    // Build query
    const query = { user: req.user.id };
    
    // Filter by date range
    if (startDate || endDate) {
      query.startDate = {};
      if (startDate) {
        query.startDate.$gte = new Date(startDate);
      }
      if (endDate) {
        query.startDate.$lte = new Date(endDate);
      }
    }
    
    // Filter by event type
    if (eventType) {
      query.eventType = eventType;
    }
    
    // Filter by status
    if (status) {
      query.status = status;
    }

    const events = await CalendarEvent.find(query)
      .populate('createdBy', 'name role')
      .sort({ startDate: 1 });

    res.status(200).json({
      success: true,
      count: events.length,
      data: events
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Get single event
// @route   GET /api/v1/calendar/events/:id
// @access  Private
export const getEvent = async (req, res, next) => {
  try {
    const event = await CalendarEvent.findById(req.params.id)
      .populate('user', 'name email phone')
      .populate('createdBy', 'name role');

    if (!event) {
      return next(
        new ErrorResponse(`Event not found with id of ${req.params.id}`, 404)
      );
    }

    // Make sure user is event owner or health worker
    if (event.user.toString() !== req.user.id && req.user.role !== 'health_worker') {
      return next(
        new ErrorResponse(`Not authorized to access this event`, 403)
      );
    }

    res.status(200).json({
      success: true,
      data: event
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Create new event
// @route   POST /api/v1/calendar/events
// @access  Private
export const createEvent = async (req, res, next) => {
  try {
    // Add user to req.body
    req.body.user = req.user.id;
    req.body.createdBy = req.user.id;

    const event = await CalendarEvent.create(req.body);

    res.status(201).json({
      success: true,
      data: event
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Update event
// @route   PUT /api/v1/calendar/events/:id
// @access  Private
export const updateEvent = async (req, res, next) => {
  try {
    let event = await CalendarEvent.findById(req.params.id);

    if (!event) {
      return next(
        new ErrorResponse(`Event not found with id of ${req.params.id}`, 404)
      );
    }

    // Make sure user is event owner or health worker
    if (event.user.toString() !== req.user.id && req.user.role !== 'health_worker') {
      return next(
        new ErrorResponse(`Not authorized to update this event`, 403)
      );
    }

    event = await CalendarEvent.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    );

    res.status(200).json({
      success: true,
      data: event
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Delete event
// @route   DELETE /api/v1/calendar/events/:id
// @access  Private
export const deleteEvent = async (req, res, next) => {
  try {
    const event = await CalendarEvent.findById(req.params.id);

    if (!event) {
      return next(
        new ErrorResponse(`Event not found with id of ${req.params.id}`, 404)
      );
    }

    // Make sure user is event owner or health worker
    if (event.user.toString() !== req.user.id && req.user.role !== 'health_worker') {
      return next(
        new ErrorResponse(`Not authorized to delete this event`, 403)
      );
    }

    await event.deleteOne();

    res.status(200).json({
      success: true,
      data: {}
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Get upcoming events
// @route   GET /api/v1/calendar/events/upcoming
// @access  Private
export const getUpcomingEvents = async (req, res, next) => {
  try {
    const limit = parseInt(req.query.limit) || 10;
    const now = new Date();

    const events = await CalendarEvent.find({
      user: req.user.id,
      startDate: { $gte: now },
      status: 'scheduled'
    })
      .sort({ startDate: 1 })
      .limit(limit)
      .populate('createdBy', 'name role');

    res.status(200).json({
      success: true,
      count: events.length,
      data: events
    });
  } catch (err) {
    next(err);
  }
};
