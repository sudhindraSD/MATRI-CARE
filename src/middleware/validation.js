import { validationResult } from 'express-validator';

// Middleware to handle validation errors
export const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  
  console.log('⚙️ Validation Check for Profile Update');
  console.log('Request URL:', req.originalUrl);
  console.log('Request Method:', req.method);
  
  if (!errors.isEmpty()) {
    console.log('❌ Validation Errors Found:');
    console.log(JSON.stringify(errors.array(), null, 2));
    
    const errorMessages = errors.array().map(error => ({
      field: error.path || error.param,
      message: error.msg,
      value: error.value
    }));
    
    return res.status(400).json({
      success: false,
      errors: errorMessages
    });
  }
  
  console.log('✅ Validation passed, proceeding to controller');
  next();
};
