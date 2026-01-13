# MERN Authentication System - Backend Documentation

## 📋 Project Overview

This is a comprehensive **User Authentication System** built with the MERN stack (MongoDB, Express.js, React.js, Node.js). Currently, the **backend implementation is complete** and fully functional, providing robust authentication and authorization features. The frontend implementation will be integrated in future development phases.

The system provides secure user authentication with email verification, password reset functionality, and JWT-based session management.

---

## ✨ Features

### Completed Backend Features

- ✅ **User Registration** with email verification
- ✅ **User Login** with secure password authentication
- ✅ **User Logout** with session management
- ✅ **Email Verification** using OTP (One-Time Password)
- ✅ **Password Reset** with OTP-based verification
- ✅ **JWT Token Authentication** with 7-day validity
- ✅ **Secure Cookie Management** with httpOnly flags
- ✅ **Password Hashing** using bcrypt
- ✅ **Email Service Integration** using Nodemailer
- ✅ **Protected Routes** with authentication middleware
- ✅ **User Profile Data** retrieval
- ✅ **Authentication Status** checking
- ✅ **Environment-based Security** (Development/Production)

### Future Work

- 🔄 **Frontend UI Development** (React.js)
- 🔄 **Responsive Design** for all devices
- 🔄 **User Dashboard** implementation
- 🔄 **Profile Management** interface
- 🔄 **Social Authentication** (Google, Facebook)

---

## 🛠 Technology Stack

### Backend Technologies

| Technology | Version | Purpose |
|------------|---------|---------|
| **Node.js** | Latest | Runtime environment |
| **Express.js** | 4.x | Web application framework |
| **MongoDB** | Latest | NoSQL database |
| **Mongoose** | Latest | MongoDB object modeling |
| **JWT (jsonwebtoken)** | Latest | Token-based authentication |
| **bcryptjs** | Latest | Password hashing |
| **Nodemailer** | Latest | Email service |
| **Cookie-Parser** | Latest | Cookie handling |
| **CORS** | Latest | Cross-origin resource sharing |
| **Dotenv** | Latest | Environment variable management |

---

## 📁 Project Structure

```
MERN_AUTH/
├── server/
│   ├── config/
│   │   ├── mongodb.js          # Database connection configuration
│   │   └── nodemailer.js       # Email service configuration
│   ├── controllers/
│   │   ├── authController.js   # Authentication logic (register, login, logout, OTP)
│   │   └── userController.js   # User data management
│   ├── middleware/
│   │   └── userAuth.js         # JWT authentication middleware
│   ├── models/
│   │   └── userModel.js        # User schema and model
│   ├── routes/
│   │   ├── authRoutes.js       # Authentication endpoints
│   │   └── userRoutes.js       # User data endpoints
│   ├── server.js               # Main server file
│   └── package.json            # Dependencies and scripts
├── client/                      # Frontend (Future Implementation)
    └── [To be developed]
```

---

## 🔐 Authentication Flow

### 1. User Registration Flow

```
User → Register Endpoint → Validate Input → Check Existing User
  ↓
Hash Password → Create User → Save to Database
  ↓
Generate JWT Token → Set Cookie → Send Welcome Email
  ↓
Return Success Response
```

### 2. User Login Flow

```
User → Login Endpoint → Validate Credentials
  ↓
Find User in Database → Compare Password Hash
  ↓
Generate JWT Token → Set Cookie
  ↓
Return Success Response
```

### 3. Email Verification Flow

```
User → Request OTP → Generate 6-digit OTP
  ↓
Save OTP (24hr expiry) → Send Email
  ↓
User Enters OTP → Verify OTP → Update Account Status
```

### 4. Password Reset Flow

```
User → Request Reset OTP → Generate 6-digit OTP
  ↓
Save OTP (15min expiry) → Send Email
  ↓
User Enters OTP + New Password → Verify OTP → Hash Password → Update Database
```

---

## 🌐 API Endpoints

### Authentication Routes (`/api/auth`)

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/register` | Register new user | No |
| POST | `/login` | Login existing user | No |
| POST | `/logout` | Logout current user | No |
| POST | `/send-verify-otp` | Send email verification OTP | Yes |
| POST | `/verify-account` | Verify account with OTP | Yes |
| POST | `/is-auth` | Check authentication status | Yes |
| POST | `/send-reset-otp` | Send password reset OTP | No |
| POST | `/reset-password` | Reset password with OTP | No |

### User Routes (`/api/user`)

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/data` | Get user profile data | Yes |

---

## 📊 Database Schema

### User Model

```javascript
{
  name: String (required),
  email: String (required, unique),
  password: String (required, hashed),
  isAccountVerified: Boolean (default: false),
  verifyOtp: String (default: ''),
  verifyOtpExpireAt: Number (default: 0),
  resetOtp: String (default: ''),
  resetOtpExpireAt: Number (default: 0),
  createdAt: Date (auto),
  updatedAt: Date (auto)
}
```

---

## 🚀 Installation & Setup

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or Atlas)
- SMTP email service credentials

### Step 1: Clone Repository

```bash
git clone https://github.com/KeenIsHere/MERN_AUTH.git
cd MERN_AUTH
```

### Step 2: Install Dependencies

```bash
cd server
npm install
```

### Step 3: Environment Configuration

Create a `.env` file in the `server` directory:

```env
# Server Configuration
PORT=4000
NODE_ENV=development

# MongoDB Configuration
MONGODB_URI=mongodb://localhost:27017/mern_auth
# Or use MongoDB Atlas:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/mern_auth

# JWT Configuration
JWT_SECRET=your_super_secret_jwt_key_here_change_in_production

# Email Configuration (Example: Gmail)
SENDER_EMAIL=your-email@gmail.com
SENDER_PASSWORD=your-app-specific-password
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587

# Frontend URL (for CORS)
CLIENT_URL=http://localhost:5173
```

### Step 4: Run the Server

```bash
# Development mode
npm run dev

# Production mode
npm start
```

The server will start on `http://localhost:4000`

---

## 📝 API Request Examples

### 1. Register User

**Endpoint:** `POST /api/auth/register`

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "SecurePassword123"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Registration successful"
}
```

### 2. Login User

**Endpoint:** `POST /api/auth/login`

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "SecurePassword123"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Login successful"
}
```

### 3. Send Verification OTP

**Endpoint:** `POST /api/auth/send-verify-otp`

**Headers:**
```
Cookie: token=<jwt_token>
```

**Request Body:**
```json
{
  "userId": "user_mongodb_id"
}
```

**Response:**
```json
{
  "success": true,
  "message": "OTP sent to your email"
}
```

### 4. Verify Account

**Endpoint:** `POST /api/auth/verify-account`

**Headers:**
```
Cookie: token=<jwt_token>
```

**Request Body:**
```json
{
  "userId": "user_mongodb_id",
  "otp": "123456"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Account verified successfully"
}
```

### 5. Send Password Reset OTP

**Endpoint:** `POST /api/auth/send-reset-otp`

**Request Body:**
```json
{
  "email": "john@example.com"
}
```

**Response:**
```json
{
  "success": true,
  "message": "OTP sent to your email"
}
```

### 6. Reset Password

**Endpoint:** `POST /api/auth/reset-password`

**Request Body:**
```json
{
  "email": "john@example.com",
  "otp": "123456",
  "newPassword": "NewSecurePassword123"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Password reset successful"
}
```

### 7. Get User Data

**Endpoint:** `GET /api/user/data`

**Headers:**
```
Cookie: token=<jwt_token>
```

**Response:**
```json
{
  "success": true,
  "user": {
    "_id": "user_mongodb_id",
    "name": "John Doe",
    "email": "john@example.com",
    "isAccountVerified": true
  }
}
```

### 8. Check Authentication Status

**Endpoint:** `POST /api/auth/is-auth`

**Headers:**
```
Cookie: token=<jwt_token>
```

**Response:**
```json
{
  "success": true,
  "message": "User is authenticated"
}
```

### 9. Logout

**Endpoint:** `POST /api/auth/logout`

**Response:**
```json
{
  "success": true,
  "message": "Logged Out successfully"
}
```

---

## 🔒 Security Features

### 1. Password Security
- **Bcrypt Hashing**: All passwords are hashed with bcrypt (salt rounds: 10)
- **No Plain Text Storage**: Passwords are never stored in plain text
- **Secure Comparison**: Password validation uses bcrypt's secure compare function

### 2. JWT Token Security
- **Signed Tokens**: All tokens are signed with a secret key
- **Expiration**: Tokens expire after 7 days
- **Payload Encryption**: User ID is encrypted in the token payload

### 3. Cookie Security
- **httpOnly Flag**: Prevents JavaScript access to cookies
- **Secure Flag**: Enabled in production for HTTPS-only transmission
- **SameSite Policy**: Protection against CSRF attacks
  - `strict` in development
  - `none` in production (for cross-origin requests)

### 4. OTP Security
- **Time-Limited**: 
  - Verification OTP: 24 hours validity
  - Reset OTP: 15 minutes validity
- **Single Use**: OTPs are cleared after successful verification
- **Random Generation**: 6-digit random OTPs

### 5. Route Protection
- **Middleware Authentication**: Protected routes require valid JWT
- **Token Verification**: Every protected request validates token signature
- **User Context**: User ID is extracted and validated from token

### 6. Input Validation
- **Required Field Checks**: All endpoints validate required fields
- **Email Uniqueness**: Prevents duplicate registrations
- **Error Handling**: Comprehensive try-catch blocks

---

## 🔧 Configuration Details

### MongoDB Connection

**File:** `server/config/mongodb.js`

```javascript
// Establishes connection to MongoDB database
// Uses Mongoose for object data modeling
// Handles connection errors and success logging
```

### Nodemailer Configuration

**File:** `server/config/nodemailer.js`

```javascript
// Configures SMTP transporter for email sending
// Supports Gmail and other SMTP services
// Used for welcome emails, OTP delivery, notifications
```

### Authentication Middleware

**File:** `server/middleware/userAuth.js`

```javascript
// Validates JWT tokens from cookies
// Extracts and verifies user ID
// Protects routes requiring authentication
// Handles unauthorized access attempts
```

---

## 📂 Code Structure Details

### Controllers

#### `authController.js`
Contains all authentication-related logic:
- `register()` - User registration with email sending
- `login()` - User authentication and token generation
- `logout()` - Session termination
- `sendVerifyOtp()` - Email verification OTP generation
- `verifyEmail()` - Account verification
- `isAuthenticated()` - Authentication status check
- `sendResetOtp()` - Password reset OTP generation
- `resetPassword()` - Password update with OTP verification

#### `userController.js`
Contains user data management:
- `getUserData()` - Retrieves user profile information

### Models

#### `userModel.js`
Defines the User schema with:
- User credentials (name, email, password)
- Verification status and OTP fields
- Password reset OTP fields
- Timestamps for record tracking

### Routes

#### `authRoutes.js`
Maps authentication endpoints to controller functions:
- Public routes: register, login, logout, send-reset-otp, reset-password
- Protected routes: send-verify-otp, verify-account, is-auth

#### `userRoutes.js`
Maps user data endpoints:
- Protected routes: user data retrieval

---

## 🧪 Testing

Comprehensive testing documentation is available in [TESTING_DOCUMENTATION.md](TESTING_DOCUMENTATION.md)

The testing documentation includes **56 test cases** covering:
- User Registration (4 tests)
- User Login (4 tests)
- User Logout (2 tests)
- Email Verification (8 tests)
- Password Reset (8 tests)
- Authentication Middleware (5 tests)
- Authentication Status (2 tests)
- User Data Retrieval (3 tests)
- Cookie Security (3 tests)
- Email Functionality (3 tests)
- Password Security (3 tests)
- JWT Token Management (3 tests)
- Error Handling (3 tests)
- Route Protection (2 tests)
- Input Validation (3 tests)

### Running Tests

```bash
# Manual testing using Postman, Thunder Client, or curl
# Import the API collection and test each endpoint

# Example curl command:
curl -X POST http://localhost:4000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@example.com","password":"Test123"}'
```

---

## 🌍 Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `PORT` | Server port number | `4000` |
| `NODE_ENV` | Environment mode | `development` or `production` |
| `MONGODB_URI` | MongoDB connection string | `mongodb://localhost:27017/mern_auth` |
| `JWT_SECRET` | Secret key for JWT signing | `your_secret_key_here` |
| `SENDER_EMAIL` | Email address for sending emails | `your-email@gmail.com` |
| `SENDER_PASSWORD` | Email account password/app password | `your_app_password` |
| `SMTP_HOST` | SMTP server host | `smtp.gmail.com` |
| `SMTP_PORT` | SMTP server port | `587` |
| `CLIENT_URL` | Frontend URL for CORS | `http://localhost:5173` |

---

## 📧 Email Setup Guide

### Gmail Configuration

1. **Enable 2-Factor Authentication** on your Gmail account
2. **Generate App Password**:
   - Go to Google Account Settings
   - Security → 2-Step Verification → App passwords
   - Generate password for "Mail" application
3. **Use App Password** in `.env` file as `SENDER_PASSWORD`

### Other Email Services

The system supports any SMTP-compatible email service:
- **Outlook**: smtp.office365.com:587
- **Yahoo**: smtp.mail.yahoo.com:587
- **SendGrid**: smtp.sendgrid.net:587
- **Mailgun**: smtp.mailgun.org:587

---

## 🐛 Error Handling

### Common Error Responses

**400 Bad Request:**
```json
{
  "success": false,
  "message": "Missing Details"
}
```

**401 Unauthorized:**
```json
{
  "success": false,
  "message": "Unauthorized, Try Again"
}
```

**500 Internal Server Error:**
```json
{
  "success": false,
  "message": "Error message details"
}
```

---

## 🚀 Deployment

### Deployment Checklist

- [ ] Set `NODE_ENV=production` in environment variables
- [ ] Use strong `JWT_SECRET` (minimum 32 characters)
- [ ] Configure MongoDB Atlas for cloud database
- [ ] Set up proper SMTP service credentials
- [ ] Enable CORS for frontend domain
- [ ] Configure secure cookie settings
- [ ] Set up proper logging mechanism
- [ ] Implement rate limiting (recommended)
- [ ] Add request validation middleware
- [ ] Configure environment-specific settings

### Recommended Platforms

- **Backend Hosting**: Heroku, Railway, Render, DigitalOcean
- **Database**: MongoDB Atlas
- **Email Service**: SendGrid, Mailgun, AWS SES

---

## 🔄 Future Enhancements

### Planned Features

1. **Frontend Development**
   - React.js implementation
   - User registration and login pages
   - Dashboard with profile management
   - Email verification interface
   - Password reset flow
   - Responsive design

2. **Additional Backend Features**
   - Rate limiting for API endpoints
   - Refresh token mechanism
   - Account deletion functionality
   - Profile picture upload
   - User activity logging
   - Admin panel integration

3. **Security Enhancements**
   - Two-factor authentication (2FA)
   - Biometric authentication support
   - IP-based access control
   - Suspicious activity detection
   - Account lockout after failed attempts

4. **Social Authentication**
   - Google OAuth integration
   - Facebook OAuth integration
   - GitHub OAuth integration

5. **Advanced Features**
   - Role-based access control (RBAC)
   - Multi-language support
   - Email templates with HTML
   - SMS-based OTP option
   - Account recovery questions

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

## 👨‍💻 Author

**KeenIsHere**
- GitHub: [@KeenIsHere](https://github.com/KeenIsHere)
- Repository: [MERN_AUTH](https://github.com/KeenIsHere/MERN_AUTH)

---

## 📞 Support

For support, email your-email@example.com or create an issue in the GitHub repository.

---

## 🙏 Acknowledgments

- Express.js for the web framework
- MongoDB for the database
- JWT for authentication
- Nodemailer for email service
- Bcrypt for password security
- All contributors and supporters

---

## 📝 Changelog

### Version 1.0.0 (Current)
- ✅ Complete backend implementation
- ✅ User authentication system
- ✅ Email verification with OTP
- ✅ Password reset functionality
- ✅ JWT-based session management
- ✅ Comprehensive testing documentation
- ✅ Security features implementation

### Version 2.0.0 (Planned)
- 🔄 Frontend React.js implementation
- 🔄 UI/UX design
- 🔄 Responsive layouts
- 🔄 Social authentication integration

---

*Last Updated: 28 December 2025*  
*Backend Status: ✅ Complete and Functional*  
*Frontend Status: 🔄 Planned for Future Development*
