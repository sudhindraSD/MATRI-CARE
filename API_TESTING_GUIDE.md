# API Testing Guide

This guide provides examples for testing all API endpoints using cURL, Postman, or any HTTP client.

## Base URL
```
http://localhost:5000/api/v1
```

## Authentication

### 1. Register a New User

**Endpoint:** `POST /auth/register`

**Request Body:**
```json
{
  "name": "Jane Doe",
  "email": "jane@example.com",
  "phone": "+1234567890",
  "password": "password123",
  "role": "pregnant_woman"
}
```

**cURL:**
```bash
curl -X POST http://localhost:5000/api/v1/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Jane Doe",
    "email": "jane@example.com",
    "phone": "+1234567890",
    "password": "password123",
    "role": "pregnant_woman"
  }'
```

**Response:**
```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### 2. Login

**Endpoint:** `POST /auth/login`

**Request Body:**
```json
{
  "email": "jane@example.com",
  "password": "password123"
}
```

**cURL:**
```bash
curl -X POST http://localhost:5000/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "jane@example.com",
    "password": "password123"
  }'
```

**Response:**
```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Note:** Save the token for authenticated requests.

### 3. Get Current User

**Endpoint:** `GET /auth/me`

**Headers:**
```
Authorization: Bearer YOUR_TOKEN_HERE
```

**cURL:**
```bash
curl -X GET http://localhost:5000/api/v1/auth/me \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

## User Profile Management

### 4. Create/Update User Profile

**Endpoint:** `POST /users/profile`

**Headers:**
```
Authorization: Bearer YOUR_TOKEN_HERE
Content-Type: application/json
```

**Request Body (Basic Info):**
```json
{
  "age": 28,
  "gestationalAgeWeeks": 24,
  "gravidity": 2,
  "parity": 1,
  "height": 165,
  "weight": 68,
  "emergencyContact": {
    "name": "John Doe",
    "phone": "+1234567891",
    "relationship": "Husband"
  }
}
```

**cURL:**
```bash
curl -X POST http://localhost:5000/api/v1/users/profile \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -H "Content-Type: application/json" \
  -d '{
    "age": 28,
    "gestationalAgeWeeks": 24,
    "height": 165,
    "weight": 68
  }'
```

### 5. Update Medical History

**Request Body:**
```json
{
  "hasHypertension": false,
  "hasDiabetes": false,
  "previousComplications": ["preterm birth"],
  "chronicIllnesses": [],
  "allergies": ["penicillin"],
  "currentMedications": [
    {
      "name": "Prenatal Vitamins",
      "dosage": "1 tablet",
      "frequency": "daily"
    }
  ]
}
```

### 6. Update Current Pregnancy Specifics

**Request Body:**
```json
{
  "bloodPressure": {
    "systolic": 120,
    "diastolic": 80,
    "lastChecked": "2025-10-04T10:00:00Z"
  },
  "bloodSugar": {
    "value": 95,
    "unit": "mg/dL",
    "lastChecked": "2025-10-04T10:00:00Z"
  },
  "hemoglobin": {
    "value": 12.5,
    "unit": "g/dL",
    "lastChecked": "2025-10-04T10:00:00Z"
  },
  "fetalMovements": {
    "count": 15,
    "date": "2025-10-04T10:00:00Z"
  },
  "hasBleeding": false,
  "hasHeadache": false,
  "hasVisionDisturbance": false,
  "hasDizziness": false
}
```

### 7. Update Lifestyle Factors

**Request Body:**
```json
{
  "smokes": false,
  "consumesAlcohol": false,
  "usesTobacco": false,
  "nutritionalHabits": {
    "dietType": "Balanced",
    "supplements": ["Folic Acid", "Iron"],
    "mealsPerDay": 5
  },
  "physicalActivity": {
    "level": "moderate",
    "minutesPerWeek": 150,
    "type": ["walking", "prenatal yoga"]
  }
}
```

### 8. Update Psychosocial Factors

**Request Body:**
```json
{
  "stressLevel": 4,
  "hasSupportSystem": true,
  "healthcareAccess": {
    "hasInsurance": true,
    "regularProvider": true,
    "transportation": "Personal vehicle"
  },
  "livingConditions": {
    "housingType": "Apartment",
    "hasRunningWater": true,
    "hasElectricity": true,
    "sanitation": "Modern plumbing"
  }
}
```

### 9. Get User Profile

**Endpoint:** `GET /users/profile`

**cURL:**
```bash
curl -X GET http://localhost:5000/api/v1/users/profile \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

## Calendar & Events

### 10. Create Calendar Event

**Endpoint:** `POST /calendar/events`

**Request Body:**
```json
{
  "title": "Prenatal Checkup",
  "description": "Regular monthly checkup with Dr. Smith",
  "eventType": "checkup",
  "startDate": "2025-10-15T10:00:00Z",
  "endDate": "2025-10-15T11:00:00Z",
  "location": "City Hospital, Room 302",
  "isAllDay": false,
  "reminder": {
    "enabled": true,
    "minutesBefore": 60
  },
  "status": "scheduled"
}
```

**cURL:**
```bash
curl -X POST http://localhost:5000/api/v1/calendar/events \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Prenatal Checkup",
    "eventType": "checkup",
    "startDate": "2025-10-15T10:00:00Z",
    "endDate": "2025-10-15T11:00:00Z"
  }'
```

### 11. Get All Events

**Endpoint:** `GET /calendar/events`

**Query Parameters:**
- `startDate` - Filter by start date (ISO 8601)
- `endDate` - Filter by end date (ISO 8601)
- `eventType` - Filter by event type
- `status` - Filter by status

**cURL:**
```bash
curl -X GET "http://localhost:5000/api/v1/calendar/events?status=scheduled" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

### 12. Get Upcoming Events

**Endpoint:** `GET /calendar/events/upcoming`

**Query Parameters:**
- `limit` - Number of events to return (default: 10)

**cURL:**
```bash
curl -X GET "http://localhost:5000/api/v1/calendar/events/upcoming?limit=5" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

### 13. Update Event

**Endpoint:** `PUT /calendar/events/:id`

**Request Body:**
```json
{
  "status": "completed",
  "notes": "Checkup went well. All vitals normal."
}
```

**cURL:**
```bash
curl -X PUT http://localhost:5000/api/v1/calendar/events/EVENT_ID \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -H "Content-Type: application/json" \
  -d '{
    "status": "completed"
  }'
```

### 14. Delete Event

**Endpoint:** `DELETE /calendar/events/:id`

**cURL:**
```bash
curl -X DELETE http://localhost:5000/api/v1/calendar/events/EVENT_ID \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

## Chatbot

### 15. Send Message to Chatbot

**Endpoint:** `POST /chatbot/message`

**Request Body:**
```json
{
  "message": "What should I eat during pregnancy?"
}
```

**cURL:**
```bash
curl -X POST http://localhost:5000/api/v1/chatbot/message \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -H "Content-Type: application/json" \
  -d '{
    "message": "What should I eat during pregnancy?"
  }'
```

**Response:**
```json
{
  "success": true,
  "data": {
    "message": "What should I eat during pregnancy?",
    "response": "During pregnancy, focus on a balanced diet rich in...",
    "intent": "nutrition",
    "isUrgent": false,
    "timestamp": "2025-10-04T11:00:00.000Z"
  }
}
```

### 16. Get Chat History

**Endpoint:** `GET /chatbot/history`

**Query Parameters:**
- `limit` - Number of messages (default: 50)
- `page` - Page number (default: 1)

**cURL:**
```bash
curl -X GET "http://localhost:5000/api/v1/chatbot/history?limit=20&page=1" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

## Health Worker Routes

### 17. Get All Profiles (Health Workers Only)

**Endpoint:** `GET /users/profiles`

**cURL:**
```bash
curl -X GET http://localhost:5000/api/v1/users/profiles \
  -H "Authorization: Bearer HEALTH_WORKER_TOKEN"
```

### 18. Get Urgent Messages (Health Workers Only)

**Endpoint:** `GET /chatbot/urgent`

**cURL:**
```bash
curl -X GET http://localhost:5000/api/v1/chatbot/urgent \
  -H "Authorization: Bearer HEALTH_WORKER_TOKEN"
```

### 19. Review Message (Health Workers Only)

**Endpoint:** `PUT /chatbot/review/:id`

**Request Body:**
```json
{
  "reviewNotes": "Patient contacted. Advised to visit ER immediately."
}
```

**cURL:**
```bash
curl -X PUT http://localhost:5000/api/v1/chatbot/review/MESSAGE_ID \
  -H "Authorization: Bearer HEALTH_WORKER_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "reviewNotes": "Patient contacted and advised."
  }'
```

## Testing with Postman

1. **Import Collection:**
   - Create a new collection in Postman
   - Add environment variables:
     - `base_url`: `http://localhost:5000/api/v1`
     - `token`: (will be set after login)

2. **Set Authorization:**
   - Go to Authorization tab
   - Type: Bearer Token
   - Token: `{{token}}`

3. **Test Flow:**
   - Register a user
   - Login and save the token
   - Create/update profile
   - Create events
   - Send chatbot messages

## Common Error Responses

### 400 Bad Request
```json
{
  "success": false,
  "errors": [
    {
      "field": "email",
      "message": "Please include a valid email"
    }
  ]
}
```

### 401 Unauthorized
```json
{
  "success": false,
  "error": "Not authorized to access this route"
}
```

### 404 Not Found
```json
{
  "success": false,
  "error": "Resource not found"
}
```

### 500 Server Error
```json
{
  "success": false,
  "error": "Server Error"
}
```

## Tips

1. **Always include the Authorization header** for protected routes
2. **Use ISO 8601 format** for dates: `2025-10-15T10:00:00Z`
3. **Check validation errors** in the response for field-specific issues
4. **Save tokens** after login for subsequent requests
5. **Use query parameters** for filtering and pagination
