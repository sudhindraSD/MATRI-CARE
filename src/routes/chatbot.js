import express from 'express';
import { body } from 'express-validator';
import {
  sendMessage,
  getChatHistory,
  getUrgentMessages,
  reviewMessage
} from '../controllers/chatbotController.js';
import { protect, authorize } from '../middleware/auth.js';
import { handleValidationErrors } from '../middleware/validation.js';

const router = express.Router();

// Protect all routes
router.use(protect);

// Validation middleware
const validateMessage = [
  body('message')
    .not()
    .isEmpty()
    .withMessage('Message is required')
    .trim()
    .isLength({ min: 1, max: 1000 })
    .withMessage('Message must be between 1 and 1000 characters')
];

// User routes
router.post('/message', validateMessage, handleValidationErrors, sendMessage);
router.get('/history', getChatHistory);

// Health worker routes
router.get('/urgent', authorize('health_worker'), getUrgentMessages);
router.put('/review/:id', authorize('health_worker'), reviewMessage);

export default router;
