# MATRI-CARE Project Structure

## Directory Overview

```
MATRI-CARE/
├── src/                              # Source code directory
│   ├── config/                       # Configuration files (future use)
│   ├── controllers/                  # Request handlers
│   │   ├── authController.js         # Authentication logic
│   │   ├── userProfileController.js  # User profile management
│   │   ├── calendarController.js     # Calendar/events management
│   │   └── chatbotController.js      # Chatbot message handling
│   ├── middleware/                   # Custom middleware
│   │   ├── auth.js                   # JWT authentication & authorization
│   │   └── validation.js             # Validation error handler
│   ├── models/                       # Mongoose schemas
│   │   ├── User.js                   # User authentication model
│   │   ├── UserProfile.js            # User health profile model
│   │   ├── CalendarEvent.js          # Calendar events model
│   │   └── ChatMessage.js            # Chat messages model
│   ├── routes/                       # API route definitions
│   │   ├── auth.js                   # Authentication routes
│   │   ├── users.js                  # User profile routes
│   │   ├── calendar.js               # Calendar routes
│   │   └── chatbot.js                # Chatbot routes
│   ├── utils/                        # Utility functions
│   │   └── errorResponse.js          # Custom error class
│   └── validators/                   # Validation schemas (future use)
├── node_modules/                     # Dependencies (auto-generated)
├── database.js                       # MongoDB connection setup
├── server.js                         # Application entry point
├── package.json                      # Project metadata & dependencies
├── package-lock.json                 # Dependency lock file
├── .env                              # Environment variables (DO NOT COMMIT)
├── .env.example                      # Environment template
├── .gitignore                        # Git ignore rules
├── README.md                         # Project documentation
├── SETUP_GUIDE.md                    # Setup instructions
├── API_TESTING_GUIDE.md              # API endpoint documentation
├── PROJECT_STRUCTURE.md              # This file
└── MATRI-CARE.postman_collection.json # Postman collection
```

## File Descriptions

### Root Files

#### `server.js`
- **Purpose**: Main application entry point
- **Responsibilities**:
  - Initialize Express app
  - Configure middleware (CORS, body parser, etc.)
  - Connect to MongoDB
  - Mount API routes
  - Error handling
  - Start server

#### `database.js`
- **Purpose**: MongoDB connection configuration
- **Responsibilities**:
  - Connect to MongoDB Atlas
  - Handle connection errors
  - Export connection function

#### `package.json`
- **Purpose**: Project configuration
- **Contains**:
  - Project metadata
  - Dependencies list
  - Scripts (start, dev)
  - ES Module configuration

### Models (`src/models/`)

#### `User.js`
**Purpose**: User authentication and basic info
**Fields**:
- name, email, phone, password
- role (pregnant_woman, health_worker)
- createdAt

**Methods**:
- `matchPassword()`: Compare passwords
- `getSignedJwtToken()`: Generate JWT token

**Middleware**:
- Pre-save: Hash password with bcrypt

#### `UserProfile.js`
**Purpose**: Comprehensive health profile
**Sections**:
- Basic Info: age, gestational age, height, weight
- Medical History: conditions, medications, allergies
- Current Pregnancy: vitals, symptoms, fetal movements
- Lifestyle: diet, exercise, habits
- Psychosocial: stress, support, living conditions

**Virtuals**:
- `bmi`: Calculated BMI

**Indexes**:
- user + createdAt
- Text search on multiple fields

#### `CalendarEvent.js`
**Purpose**: Schedule management
**Fields**:
- title, description, eventType
- startDate, endDate, location
- reminder settings
- recurrence settings
- status (scheduled, completed, cancelled, missed)

**Virtuals**:
- `durationMinutes`: Event duration

**Validation**:
- End date must be after start date

#### `ChatMessage.js`
**Purpose**: Chatbot conversation history
**Fields**:
- user, message, response
- intent, confidence, sentiment
- isUrgent, flaggedForReview
- tags for categorization

**Indexes**:
- user + createdAt
- Text search on messages

### Controllers (`src/controllers/`)

#### `authController.js`
**Exports**:
- `register`: Create new user account
- `login`: Authenticate user
- `getMe`: Get current user info
- `logout`: Clear authentication

**Features**:
- Password hashing
- JWT token generation
- Cookie management

#### `userProfileController.js`
**Exports**:
- `getUserProfile`: Get own profile
- `updateUserProfile`: Create/update profile
- `getProfiles`: Get all profiles (health workers)
- `getProfile`: Get specific profile (health workers)
- `searchProfiles`: Search profiles

**Features**:
- Role-based access control
- Comprehensive health data management
- Search functionality

#### `calendarController.js`
**Exports**:
- `getEvents`: Get user events (with filters)
- `getEvent`: Get single event
- `createEvent`: Create new event
- `updateEvent`: Update event
- `deleteEvent`: Delete event
- `getUpcomingEvents`: Get upcoming events

**Features**:
- Date range filtering
- Event type filtering
- Status filtering
- Authorization checks

#### `chatbotController.js`
**Exports**:
- `sendMessage`: Send message to chatbot
- `getChatHistory`: Get conversation history
- `getUrgentMessages`: Get flagged messages (health workers)
- `reviewMessage`: Mark message as reviewed (health workers)

**Features**:
- Keyword-based response system
- Emergency detection
- Intent classification
- Urgency flagging
- Personalized responses using user profile

### Routes (`src/routes/`)

#### `auth.js`
**Base Path**: `/api/v1/auth`
**Endpoints**:
- `POST /register`: Register user
- `POST /login`: Login user
- `GET /me`: Get current user (protected)
- `GET /logout`: Logout (protected)

**Validation**:
- Email format
- Phone format
- Password length
- Role validation

#### `users.js`
**Base Path**: `/api/v1/users`
**Endpoints**:
- `GET /profile`: Get user profile (protected)
- `POST /profile`: Create/update profile (protected)
- `GET /profiles`: Get all profiles (health workers only)
- `GET /profiles/:id`: Get specific profile (health workers only)
- `GET /profiles/search`: Search profiles (protected)

**Validation**:
- Age range
- Gestational age range
- Height/weight ranges
- Blood pressure ranges
- Enum values for various fields

#### `calendar.js`
**Base Path**: `/api/v1/calendar`
**Endpoints**:
- `GET /events`: Get all events (protected)
- `POST /events`: Create event (protected)
- `GET /events/upcoming`: Get upcoming events (protected)
- `GET /events/:id`: Get single event (protected)
- `PUT /events/:id`: Update event (protected)
- `DELETE /events/:id`: Delete event (protected)

**Validation**:
- Date format (ISO 8601)
- Event type enum
- Status enum
- Reminder settings

#### `chatbot.js`
**Base Path**: `/api/v1/chatbot`
**Endpoints**:
- `POST /message`: Send message (protected)
- `GET /history`: Get chat history (protected)
- `GET /urgent`: Get urgent messages (health workers only)
- `PUT /review/:id`: Review message (health workers only)

**Validation**:
- Message length (1-1000 characters)
- Required fields

### Middleware (`src/middleware/`)

#### `auth.js`
**Exports**:
- `protect`: Verify JWT token
- `authorize(...roles)`: Check user role

**Features**:
- Token extraction from header or cookie
- Token verification
- User attachment to request
- Role-based access control

#### `validation.js`
**Exports**:
- `handleValidationErrors`: Process validation results

**Features**:
- Extract validation errors
- Format error messages
- Return 400 status with errors

### Utilities (`src/utils/`)

#### `errorResponse.js`
**Purpose**: Custom error class
**Features**:
- Extends Error class
- Includes status code
- Maintains stack trace

## API Route Structure

```
/api/v1
├── /auth
│   ├── POST   /register
│   ├── POST   /login
│   ├── GET    /me
│   └── GET    /logout
├── /users
│   ├── GET    /profile
│   ├── POST   /profile
│   ├── GET    /profiles (health workers)
│   ├── GET    /profiles/:id (health workers)
│   └── GET    /profiles/search
├── /calendar
│   ├── GET    /events
│   ├── POST   /events
│   ├── GET    /events/upcoming
│   ├── GET    /events/:id
│   ├── PUT    /events/:id
│   └── DELETE /events/:id
└── /chatbot
    ├── POST   /message
    ├── GET    /history
    ├── GET    /urgent (health workers)
    └── PUT    /review/:id (health workers)
```

## Data Flow

### Authentication Flow
1. User sends credentials to `/auth/login`
2. Controller validates credentials
3. User model verifies password
4. JWT token generated and returned
5. Client stores token
6. Token sent in Authorization header for protected routes
7. Middleware verifies token and attaches user to request

### Profile Update Flow
1. User sends profile data to `/users/profile`
2. Validation middleware checks data
3. Controller checks if profile exists
4. Create new or update existing profile
5. Return updated profile

### Event Creation Flow
1. User sends event data to `/calendar/events`
2. Validation middleware checks data
3. Controller adds user ID to event
4. Event saved to database
5. Return created event

### Chatbot Flow
1. User sends message to `/chatbot/message`
2. Controller generates response based on keywords
3. Checks user profile for personalization
4. Detects urgency and flags if needed
5. Saves message and response
6. Returns response to user

## Database Schema Relationships

```
User (1) ─────── (1) UserProfile
  │
  ├─────── (many) CalendarEvent
  │
  └─────── (many) ChatMessage

CalendarEvent
  ├── user (ref: User)
  └── createdBy (ref: User)

ChatMessage
  ├── user (ref: User)
  └── reviewedBy (ref: User)
```

## Environment Variables

```env
NODE_ENV          # development | production
PORT              # Server port (default: 5000)
MONGO_URI         # MongoDB connection string
JWT_SECRET        # JWT signing secret
JWT_EXPIRE        # Token expiration (e.g., 30d)
JWT_COOKIE_EXPIRE # Cookie expiration in days
CLIENT_URL        # Frontend URL for CORS
```

## Security Features

1. **Password Security**
   - Bcrypt hashing (10 rounds)
   - Never returned in queries

2. **JWT Authentication**
   - Secure token generation
   - Token expiration
   - HTTP-only cookies

3. **Authorization**
   - Role-based access control
   - Resource ownership verification

4. **Input Validation**
   - express-validator on all routes
   - Type checking
   - Range validation
   - Format validation

5. **Error Handling**
   - Custom error class
   - Mongoose error handling
   - Validation error formatting
   - Production vs development error details

## Best Practices Implemented

- ✅ ES6 modules
- ✅ Async/await pattern
- ✅ Error handling middleware
- ✅ Input validation
- ✅ Password hashing
- ✅ JWT authentication
- ✅ Role-based authorization
- ✅ MongoDB indexing
- ✅ Mongoose virtuals
- ✅ Pre-save hooks
- ✅ Environment variables
- ✅ CORS configuration
- ✅ Logging (Morgan)
- ✅ RESTful API design
- ✅ Comprehensive documentation

## Future Enhancements

- [ ] Rate limiting
- [ ] Email notifications
- [ ] SMS reminders
- [ ] File upload (images, documents)
- [ ] Advanced AI chatbot (NLP)
- [ ] Data analytics
- [ ] Export reports (PDF)
- [ ] Multi-language support
- [ ] Real-time notifications (WebSocket)
- [ ] Two-factor authentication
- [ ] OAuth integration
- [ ] API versioning
- [ ] Caching (Redis)
- [ ] Unit tests
- [ ] Integration tests

## Maintenance Notes

### Adding New Routes
1. Create controller in `src/controllers/`
2. Create route file in `src/routes/`
3. Add validation middleware
4. Import and mount in `server.js`
5. Update documentation

### Adding New Models
1. Create model in `src/models/`
2. Define schema with validation
3. Add indexes for performance
4. Add virtuals if needed
5. Add pre/post hooks if needed

### Modifying Existing Features
1. Update model schema if needed
2. Update controller logic
3. Update validation rules
4. Test all affected endpoints
5. Update documentation

## Support & Resources

- **Express.js**: https://expressjs.com/
- **Mongoose**: https://mongoosejs.com/
- **JWT**: https://jwt.io/
- **MongoDB**: https://docs.mongodb.com/
- **Node.js**: https://nodejs.org/
