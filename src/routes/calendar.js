import express from 'express';
import { body } from 'express-validator';
import {
  getEvents,
  getEvent,
  createEvent,
  updateEvent,
  deleteEvent,
  getUpcomingEvents
} from '../controllers/calendarController.js';
import { protect } from '../middleware/auth.js';
import { handleValidationErrors } from '../middleware/validation.js';

const router = express.Router();

// Protect all routes
router.use(protect);

// Validation middleware
const validateEvent = [
  body('title').not().isEmpty().withMessage('Title is required'),
  body('startDate').isISO8601().withMessage('Valid start date is required'),
  body('endDate').optional().isISO8601().withMessage('Valid end date required'),
  body('eventType')
    .optional()
    .isIn([
      'appointment',
      'medication',
      'checkup',
      'ultrasound',
      'lab_test',
      'vaccination',
      'reminder',
      'other'
    ])
    .withMessage('Invalid event type'),
  body('status')
    .optional()
    .isIn(['scheduled', 'completed', 'cancelled', 'missed'])
    .withMessage('Invalid status'),
  body('isAllDay').optional().isBoolean(),
  body('reminder.enabled').optional().isBoolean(),
  body('reminder.minutesBefore').optional().isInt({ min: 0 }),
  body('recurrence.enabled').optional().isBoolean(),
  body('recurrence.frequency')
    .optional()
    .isIn(['daily', 'weekly', 'monthly', 'yearly']),
  body('recurrence.interval').optional().isInt({ min: 1 })
];

// Routes
router
  .route('/events')
  .get(getEvents)
  .post(validateEvent, handleValidationErrors, createEvent);

router
  .route('/events/upcoming')
  .get(getUpcomingEvents);

router
  .route('/events/:id')
  .get(getEvent)
  .put(validateEvent, handleValidationErrors, updateEvent)
  .delete(deleteEvent);

export default router;
