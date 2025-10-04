import express from 'express';
import { body } from 'express-validator';
import {
  getUserProfile,
  updateUserProfile,
  getProfiles,
  getProfile,
  searchProfiles
} from '../controllers/userProfileController.js';
import { protect, authorize } from '../middleware/auth.js';
import { handleValidationErrors } from '../middleware/validation.js';

const router = express.Router({ mergeParams: true });

// Middleware to protect all routes
router.use(protect);

// Basic info validation
const validateBasicInfo = [
  body('age').optional().isInt({ min: 10, max: 60 }),
  body('gestationalAgeWeeks').optional().isInt({ min: 1, max: 42 }),
  body('gravidity').optional().isInt({ min: 0 }),
  body('parity').optional().isInt({ min: 0 }),
  body('height').optional().isFloat({ min: 100, max: 250 }),
  body('weight').optional().isFloat({ min: 30, max: 200 }),
  body('emergencyContact.name').optional().trim(),
  body('emergencyContact.phone').optional().matches(/^\+?[0-9]{10,15}$/),
  body('emergencyContact.relationship').optional().trim()
];

// Medical history validation
const validateMedicalHistory = [
  body('hasHypertension').optional().isBoolean(),
  body('hasDiabetes').optional().isBoolean(),
  body('previousComplications').optional().isArray(),
  body('chronicIllnesses').optional().isArray(),
  body('allergies').optional().isArray(),
  body('currentMedications').optional().isArray(),
  body('currentMedications.*.name').optional().trim(),
  body('currentMedications.*.dosage').optional().trim(),
  body('currentMedications.*.frequency').optional().trim()
];

// Current pregnancy validation
const validatePregnancySpecifics = [
  body('bloodPressure.systolic').optional().isInt({ min: 70, max: 250 }),
  body('bloodPressure.diastolic').optional().isInt({ min: 40, max: 150 }),
  body('bloodPressure.lastChecked').optional().isISO8601(),
  body('bloodSugar.value').optional().isFloat({ min: 0 }),
  body('bloodSugar.unit').optional().isIn(['mg/dL', 'mmol/L']),
  body('bloodSugar.lastChecked').optional().isISO8601(),
  body('hemoglobin.value').optional().isFloat({ min: 0 }),
  body('hemoglobin.unit').optional().isIn(['g/dL', 'g/L']),
  body('hemoglobin.lastChecked').optional().isISO8601(),
  body('fetalMovements.count').optional().isInt({ min: 0 }),
  body('fetalMovements.date').optional().isISO8601(),
  body('urinarySymptoms').optional().isArray(),
  body('vaginalDischarge.hasDischarge').optional().isBoolean(),
  body('vaginalDischarge.color').optional().trim(),
  body('vaginalDischarge.amount').optional().trim(),
  body('vaginalDischarge.hasOdor').optional().isBoolean(),
  body('hasBleeding').optional().isBoolean(),
  body('swelling').optional().isArray(),
  body('swowing.*.location').optional().trim(),
  body('swelling.*.severity').optional().isIn(['mild', 'moderate', 'severe']),
  body('hasHeadache').optional().isBoolean(),
  body('hasVisionDisturbance').optional().isBoolean(),
  body('hasDizziness').optional().isBoolean(),
  body('abdominalPain.hasPain').optional().isBoolean(),
  body('abdominalPain.frequency').optional().trim(),
  body('abdominalPain.intensity').optional().isIn(['mild', 'moderate', 'severe']),
  body('abdominalPain.description').optional().trim(),
  body('weightGain.value').optional().isFloat({ min: 0 }),
  body('weightGain.unit').optional().isIn(['kg', 'lbs']),
  body('weightGain.sinceLastVisit').optional().isBoolean(),
  body('hasFever').optional().isBoolean(),
  body('recentInfections').optional().isArray()
];

// Lifestyle validation
const validateLifestyle = [
  body('smokes').optional().isBoolean(),
  body('consumesAlcohol').optional().isBoolean(),
  body('usesTobacco').optional().isBoolean(),
  body('nutritionalHabits.dietType').optional().trim(),
  body('nutritionalHabits.supplements').optional().isArray(),
  body('nutritionalHabits.mealsPerDay').optional().isInt({ min: 1, max: 10 }),
  body('physicalActivity.level')
    .optional()
    .isIn(['sedentary', 'light', 'moderate', 'active', 'very_active']),
  body('physicalActivity.minutesPerWeek').optional().isInt({ min: 0 }),
  body('physicalActivity.type').optional().isArray()
];

// Psychosocial validation
const validatePsychosocial = [
  body('stressLevel').optional().isInt({ min: 1, max: 10 }),
  body('hasSupportSystem').optional().isBoolean(),
  body('healthcareAccess.hasInsurance').optional().isBoolean(),
  body('healthcareAccess.regularProvider').optional().isBoolean(),
  body('healthcareAccess.transportation').optional().trim(),
  body('livingConditions.housingType').optional().trim(),
  body('livingConditions.hasRunningWater').optional().isBoolean(),
  body('livingConditions.hasElectricity').optional().isBoolean(),
  body('livingConditions.sanitation').optional().trim()
];

// User profile routes
router
  .route('/profile')
  .get(getUserProfile)
  .post(
    [
      ...validateBasicInfo,
      ...validateMedicalHistory,
      ...validatePregnancySpecifics,
      ...validateLifestyle,
      ...validatePsychosocial
    ],
    handleValidationErrors,
    updateUserProfile
  );

// Health worker routes
router.use(authorize('health_worker'));

router
  .route('/profiles')
  .get(getProfiles);

router
  .route('/profiles/search')
  .get(searchProfiles);

router
  .route('/profiles/:id')
  .get(getProfile);

export default router;
