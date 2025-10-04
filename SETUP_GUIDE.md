# MATRI-CARE Setup Guide

Complete step-by-step guide to set up and run the MATRI-CARE backend server.

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v14 or higher) - [Download](https://nodejs.org/)
- **npm** (comes with Node.js) or **yarn**
- **MongoDB Atlas Account** - [Sign up](https://www.mongodb.com/cloud/atlas)
- **Git** (optional, for version control)

## Step 1: MongoDB Atlas Setup

### 1.1 Create a MongoDB Atlas Account
1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Sign up for a free account
3. Verify your email address

### 1.2 Create a New Cluster
1. Click "Build a Database"
2. Choose the **FREE** tier (M0 Sandbox)
3. Select your preferred cloud provider and region
4. Click "Create Cluster"
5. Wait for the cluster to be created (2-5 minutes)

### 1.3 Create a Database User
1. Go to "Database Access" in the left sidebar
2. Click "Add New Database User"
3. Choose "Password" authentication
4. Enter a username (e.g., `matri-care-admin`)
5. Generate a secure password and **save it**
6. Set privileges to "Read and write to any database"
7. Click "Add User"

### 1.4 Configure Network Access
1. Go to "Network Access" in the left sidebar
2. Click "Add IP Address"
3. For development, click "Allow Access from Anywhere" (0.0.0.0/0)
   - **Note:** For production, restrict to specific IP addresses
4. Click "Confirm"

### 1.5 Get Connection String
1. Go to "Database" in the left sidebar
2. Click "Connect" on your cluster
3. Choose "Connect your application"
4. Select "Node.js" as the driver
5. Copy the connection string
6. Replace `<password>` with your database user password
7. Replace `<dbname>` with `matri-care` (or your preferred database name)

Example connection string:
```
mongodb+srv://matri-care-admin:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/matri-care?retryWrites=true&w=majority
```

## Step 2: Project Setup

### 2.1 Navigate to Project Directory
```bash
cd c:\Users\soumy\MATRI-CARE
```

### 2.2 Install Dependencies

**Option 1: Using npm**
```bash
npm install
```

**Option 2: If you encounter PowerShell execution policy issues**
```bash
# Run PowerShell as Administrator and execute:
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser

# Then try npm install again
npm install
```

**Option 3: Using Command Prompt (cmd)**
```cmd
npm install
```

### 2.3 Configure Environment Variables

1. Copy the example environment file:
   ```bash
   copy .env.example .env
   ```

2. Open `.env` file in a text editor

3. Update the following variables:

```env
# Server Configuration
NODE_ENV=development
PORT=5000

# MongoDB Configuration - REPLACE WITH YOUR CONNECTION STRING
MONGO_URI=mongodb+srv://YOUR_USERNAME:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/matri-care?retryWrites=true&w=majority

# JWT Configuration - GENERATE A SECURE SECRET
JWT_SECRET=your_very_secure_random_string_here_at_least_32_characters
JWT_EXPIRE=30d
JWT_COOKIE_EXPIRE=30

# Client Configuration
CLIENT_URL=http://localhost:3000
```

### 2.4 Generate JWT Secret

**Option 1: Using Node.js**
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

**Option 2: Online Generator**
- Visit: https://www.grc.com/passwords.htm
- Copy the "63 random alpha-numeric characters" string

**Option 3: Manual**
- Use a long random string (at least 32 characters)
- Mix uppercase, lowercase, numbers, and special characters

## Step 3: Verify Installation

### 3.1 Check Node.js and npm
```bash
node --version
npm --version
```

Expected output:
```
v18.x.x (or higher)
9.x.x (or higher)
```

### 3.2 Verify Dependencies
```bash
npm list --depth=0
```

You should see all dependencies listed without errors.

## Step 4: Start the Server

### 4.1 Development Mode (with auto-reload)
```bash
npm run dev
```

### 4.2 Production Mode
```bash
npm start
```

### 4.3 Expected Output
```
Server running in development mode on port 5000
MongoDB connected successfully
```

## Step 5: Test the API

### 5.1 Test Basic Endpoint

**Using Browser:**
- Open: http://localhost:5000/

**Using cURL:**
```bash
curl http://localhost:5000/
```

**Expected Response:**
```json
{
  "message": "Welcome to MATRI-CARE API"
}
```

### 5.2 Test User Registration

```bash
curl -X POST http://localhost:5000/api/v1/auth/register ^
  -H "Content-Type: application/json" ^
  -d "{\"name\":\"Test User\",\"email\":\"test@example.com\",\"phone\":\"+1234567890\",\"password\":\"password123\",\"role\":\"pregnant_woman\"}"
```

**Expected Response:**
```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

## Troubleshooting

### Issue 1: MongoDB Connection Error

**Error Message:**
```
MongoDB connection error: MongoServerError: bad auth
```

**Solution:**
- Verify your MongoDB username and password in `.env`
- Ensure the password doesn't contain special characters that need URL encoding
- Check that your IP address is whitelisted in MongoDB Atlas Network Access

### Issue 2: Port Already in Use

**Error Message:**
```
Error: listen EADDRINUSE: address already in use :::5000
```

**Solution:**
- Change the PORT in `.env` to a different number (e.g., 5001)
- Or kill the process using port 5000:
  ```bash
  # Windows PowerShell
  Get-Process -Id (Get-NetTCPConnection -LocalPort 5000).OwningProcess | Stop-Process
  ```

### Issue 3: Module Not Found

**Error Message:**
```
Error: Cannot find module 'express'
```

**Solution:**
- Delete `node_modules` folder and `package-lock.json`
- Run `npm install` again
- Ensure you're in the correct directory

### Issue 4: JWT Secret Not Set

**Error Message:**
```
TypeError: Cannot read property 'sign' of undefined
```

**Solution:**
- Ensure `JWT_SECRET` is set in your `.env` file
- Restart the server after updating `.env`

### Issue 5: Validation Errors

**Error Message:**
```
{
  "success": false,
  "errors": [...]
}
```

**Solution:**
- Check the error messages for specific field requirements
- Ensure all required fields are provided
- Verify data formats (email, phone, dates)

## Project Structure Overview

```
MATRI-CARE/
├── src/
│   ├── controllers/     # Business logic
│   ├── middleware/      # Auth & validation
│   ├── models/          # Database schemas
│   ├── routes/          # API endpoints
│   └── utils/           # Helper functions
├── database.js          # DB connection
├── server.js            # Entry point
├── .env                 # Environment variables (DO NOT COMMIT)
├── .env.example         # Environment template
├── package.json         # Dependencies
└── README.md            # Documentation
```

## Next Steps

1. **Read the API Documentation:**
   - See `API_TESTING_GUIDE.md` for detailed endpoint documentation

2. **Test All Endpoints:**
   - Use Postman, Insomnia, or cURL to test each endpoint
   - Follow the examples in the API testing guide

3. **Integrate with Frontend:**
   - Use the base URL: `http://localhost:5000/api/v1`
   - Include JWT token in Authorization header for protected routes

4. **Deploy to Production:**
   - Set `NODE_ENV=production` in `.env`
   - Use a process manager like PM2
   - Set up proper security measures
   - Use environment-specific MongoDB clusters

## Security Checklist

- [ ] Strong JWT secret (32+ characters)
- [ ] Secure MongoDB password
- [ ] Environment variables not committed to Git
- [ ] CORS configured for specific origins in production
- [ ] MongoDB Network Access restricted to specific IPs in production
- [ ] HTTPS enabled in production
- [ ] Rate limiting implemented (future enhancement)

## Support

If you encounter any issues:

1. Check the troubleshooting section above
2. Review the error messages carefully
3. Ensure all prerequisites are installed
4. Verify environment variables are set correctly
5. Check MongoDB Atlas connection and credentials

## Additional Resources

- [Express.js Documentation](https://expressjs.com/)
- [MongoDB Documentation](https://docs.mongodb.com/)
- [Mongoose Documentation](https://mongoosejs.com/)
- [JWT Documentation](https://jwt.io/)
- [Node.js Best Practices](https://github.com/goldbergyoni/nodebestpractices)

## Development Tips

1. **Use nodemon for development:**
   - Already configured with `npm run dev`
   - Auto-restarts server on file changes

2. **Monitor MongoDB:**
   - Use MongoDB Atlas dashboard to view data
   - Check "Collections" tab to see stored documents

3. **Test with Postman:**
   - Create a collection for all endpoints
   - Use environment variables for base URL and token
   - Save example requests for future reference

4. **Version Control:**
   - Commit your changes regularly
   - Never commit `.env` file
   - Use meaningful commit messages

## Production Deployment

For production deployment, consider:

1. **Hosting Options:**
   - Heroku
   - AWS EC2
   - DigitalOcean
   - Google Cloud Platform
   - Azure

2. **Environment Setup:**
   - Set `NODE_ENV=production`
   - Use production MongoDB cluster
   - Configure proper CORS origins
   - Enable HTTPS
   - Set up monitoring and logging

3. **Process Management:**
   - Use PM2 for process management
   - Configure auto-restart on crashes
   - Set up log rotation

4. **Security:**
   - Use helmet.js for security headers
   - Implement rate limiting
   - Enable HTTPS only
   - Regular security audits

Happy coding! 🚀
