# MATRI-CARE - Maternal Health Monitoring Backend

A comprehensive Express.js backend server for a maternal health monitoring application with user authentication, health tracking, calendar management, and AI chatbot integration.

## Features

### 🔐 Authentication & Authorization
- User registration and login with JWT tokens
- Role-based access control (pregnant_woman, health_worker)
- Secure password hashing with bcrypt
- Protected routes with middleware

### 👤 User Profile Management
- Comprehensive user profiles with health information
- Basic info (age, gestational age, height, weight, etc.)
- Medical and obstetric history tracking
- Current pregnancy specifics monitoring
- Lifestyle and behavioral factors
- Psychosocial factors assessment

### 📅 Calendar & Event Management
- Create, read, update, and delete events
- Multiple event types (appointments, medications, checkups, etc.)
- Recurring events support
- Reminders and notifications
- Filter events by date range, type, and status

### 💬 AI Chatbot Integration
- Intelligent pregnancy-related Q&A
- Emergency detection and flagging
- Chat history tracking
- Urgent message review system for health workers
- Context-aware responses

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB Atlas with Mongoose ODM
- **Authentication**: JWT (JSON Web Tokens)
- **Validation**: express-validator
- **Security**: bcryptjs for password hashing
- **Logging**: Morgan

## Project Structure

```
MATRI-CARE/
├── src/
│   ├── config/          # Configuration files
│   ├── controllers/     # Route controllers
│   │   ├── authController.js
│   │   ├── userProfileController.js
│   │   ├── calendarController.js
│   │   └── chatbotController.js
│   ├── middleware/      # Custom middleware
│   │   ├── auth.js
│   │   └── validation.js
│   ├── models/          # Mongoose models
│   │   ├── User.js
│   │   ├── UserProfile.js
│   │   ├── CalendarEvent.js
│   │   └── ChatMessage.js
│   ├── routes/          # API routes
│   │   ├── auth.js
│   │   ├── users.js
│   │   ├── calendar.js
│   │   └── chatbot.js
│   ├── utils/           # Utility functions
│   │   └── errorResponse.js
│   └── validators/      # Validation schemas
├── database.js          # Database connection
├── server.js            # Application entry point
├── package.json
├── .env.example
└── README.md
```

## Installation

### Prerequisites
- Node.js (v14 or higher)
- MongoDB Atlas account
- npm or yarn

### Setup Steps

1. **Clone the repository**
   ```bash
   git clone https://github.com/sudhindraSD/MATRI-CARE.git
   cd MATRI-CARE
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   - Copy `.env.example` to `.env`
   - Update the following variables:
     ```env
     MONGO_URI=your_mongodb_atlas_connection_string
     JWT_SECRET=your_secure_jwt_secret
     PORT=5000
     NODE_ENV=development
     ```

4. **Start the server**
   ```bash
   # Development mode with auto-reload
   npm run dev
   
   # Production mode
   npm start
   ```

## API Endpoints

### Authentication Routes (`/api/v1/auth`)

| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| POST | `/register` | Register new user | Public |
| POST | `/login` | User login | Public |
| GET | `/me` | Get current user | Private |
| GET | `/logout` | Logout user | Private |

### User Profile Routes (`/api/v1/users`)

| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| GET | `/profile` | Get user profile | Private |
| POST | `/profile` | Create/Update profile | Private |
| GET | `/profiles` | Get all profiles | Private/Health Worker |
| GET | `/profiles/:id` | Get single profile | Private/Health Worker |
| GET | `/profiles/search` | Search profiles | Private |

### Calendar Routes (`/api/v1/calendar`)

| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| GET | `/events` | Get all user events | Private |
| POST | `/events` | Create new event | Private |
| GET | `/events/upcoming` | Get upcoming events | Private |
| GET | `/events/:id` | Get single event | Private |
| PUT | `/events/:id` | Update event | Private |
| DELETE | `/events/:id` | Delete event | Private |

### Chatbot Routes (`/api/v1/chatbot`)

| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| POST | `/message` | Send message to chatbot | Private |
| GET | `/history` | Get chat history | Private |
| GET | `/urgent` | Get urgent messages | Private/Health Worker |
| PUT | `/review/:id` | Mark message as reviewed | Private/Health Worker |

## Request/Response Examples

### Register User
```json
POST /api/v1/auth/register
{
  "name": "Jane Doe",
  "email": "jane@example.com",
  "phone": "+1234567890",
  "password": "securePassword123",
  "role": "pregnant_woman"
}
```

### Update User Profile
```json
POST /api/v1/users/profile
{
  "age": 28,
  "gestationalAgeWeeks": 24,
  "height": 165,
  "weight": 68,
  "bloodPressure": {
    "systolic": 120,
    "diastolic": 80,
    "lastChecked": "2025-10-04T10:00:00Z"
  },
  "hasHypertension": false,
  "hasDiabetes": false
}
```

### Create Calendar Event
```json
POST /api/v1/calendar/events
{
  "title": "Prenatal Checkup",
  "description": "Regular monthly checkup",
  "eventType": "checkup",
  "startDate": "2025-10-15T10:00:00Z",
  "endDate": "2025-10-15T11:00:00Z",
  "location": "City Hospital",
  "reminder": {
    "enabled": true,
    "minutesBefore": 60
  }
}
```

### Send Chatbot Message
```json
POST /api/v1/chatbot/message
{
  "message": "What should I eat during pregnancy?"
}
```

## Validation

All routes include comprehensive input validation using express-validator:
- Email format validation
- Phone number format validation
- Required fields checking
- Data type validation
- Range validation for numeric values

## Error Handling

The API uses consistent error responses:
```json
{
  "success": false,
  "error": "Error message here"
}
```

HTTP Status Codes:
- `200` - Success
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `500` - Server Error

## Security Features

- Password hashing with bcrypt
- JWT token authentication
- HTTP-only cookies
- CORS configuration
- Input validation and sanitization
- Role-based access control
- MongoDB injection prevention

## Database Models

### User
- Basic authentication info
- Role management
- Password encryption

### UserProfile
- Comprehensive health information
- Medical history
- Current pregnancy data
- Lifestyle factors
- Psychosocial information

### CalendarEvent
- Event scheduling
- Reminders
- Recurring events
- Multiple event types

### ChatMessage
- User messages
- AI responses
- Intent classification
- Urgency flagging

## Development

### Running Tests
```bash
npm test
```

### Code Style
Follow JavaScript ES6+ standards with ESLint configuration.

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the ISC License.

## Support

For support, email support@matri-care.com or open an issue in the repository.

## Roadmap

- [ ] Email notifications for appointments
- [ ] SMS reminders
- [ ] Advanced AI chatbot with NLP
- [ ] Data analytics dashboard
- [ ] Mobile app integration
- [ ] Telemedicine integration
- [ ] Multi-language support
- [ ] Export health reports

## Authors

- MATRI-CARE Development Team

## Acknowledgments

- Express.js community
- MongoDB documentation
- Maternal health experts who provided domain knowledge
