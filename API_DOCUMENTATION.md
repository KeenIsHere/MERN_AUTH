# GHUMMGHAMM Travel Agency - API Documentation

## 🎯 Overview

Complete backend API documentation for GHUMMGHAMM Travel Agency System. This document covers all endpoints for user management, package browsing, booking management, payment processing, and feedback systems.

**Base URL**: `http://localhost:4000/api`

---

## 📋 Table of Contents

1. [Authentication Endpoints](#authentication-endpoints)
2. [User Management Endpoints](#user-management-endpoints)
3. [Package Endpoints](#package-endpoints)
4. [Booking Endpoints](#booking-endpoints)
5. [Payment Endpoints](#payment-endpoints)
6. [Feedback Endpoints](#feedback-endpoints)

---

## 🔐 Authentication Endpoints

### 1. User Registration
**POST** `/auth/register`

Register a new user account.

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securePassword123"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Registration successful"
}
```

---

### 2. Admin Registration
**POST** `/auth/register-admin`

Register a new admin account (requires admin secret key).

**Request Body:**
```json
{
  "name": "Admin User",
  "email": "admin@ghummghamm.com",
  "password": "adminPassword123",
  "adminSecret": "YOUR_ADMIN_SECRET_KEY"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Admin account created successfully"
}
```

**Note:** Set `ADMIN_SECRET_KEY` in your `.env` file.

---

### 3. User Login
**POST** `/auth/login`

Login to existing account.

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "securePassword123"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Login successful"
}
```

---

### 4. User Logout
**POST** `/auth/logout`

Logout from current session.

**Response:**
```json
{
  "success": true,
  "message": "Logged Out successfully"
}
```

---

### 5. Send Verification OTP
**POST** `/auth/send-verify-otp`

Send OTP to verify email (Protected Route).

**Headers:** Cookie with JWT token

**Request Body:**
```json
{
  "userId": "user_id_here"
}
```

---

### 6. Verify Account
**POST** `/auth/verify-account`

Verify account with OTP (Protected Route).

**Request Body:**
```json
{
  "otp": "123456"
}
```

---

### 7. Check Authentication Status
**POST** `/auth/is-auth`

Check if user is authenticated (Protected Route).

---

### 8. Send Reset Password OTP
**POST** `/auth/send-reset-otp`

Send OTP for password reset.

**Request Body:**
```json
{
  "email": "john@example.com"
}
```

---

### 9. Reset Password
**POST** `/auth/reset-password`

Reset password using OTP.

**Request Body:**
```json
{
  "email": "john@example.com",
  "otp": "123456",
  "newPassword": "newSecurePassword123"
}
```

---

## 👤 User Management Endpoints

### 1. Get User Data
**GET** `/user/data`

Get authenticated user's data (Protected Route).

**Response:**
```json
{
  "success": true,
  "userData": {
    "_id": "user_id",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "user",
    "isAccountVerified": true
  }
}
```

---

### 2. Get All Users (Admin)
**GET** `/user/admin/all-users`

Get all users with pagination (Admin Only).

**Query Parameters:**
- `page` (optional): Page number (default: 1)
- `limit` (optional): Items per page (default: 20)
- `role` (optional): Filter by role (user/admin)
- `search` (optional): Search by name or email

**Response:**
```json
{
  "success": true,
  "users": [...],
  "totalPages": 5,
  "currentPage": 1,
  "totalUsers": 100
}
```

---

### 3. Update User Role (Admin)
**PUT** `/user/admin/update-role`

Update user's role (Admin Only).

**Request Body:**
```json
{
  "userId": "user_id_here",
  "role": "admin"
}
```

---

### 4. Delete User (Admin)
**DELETE** `/user/admin/delete/:userId`

Delete a user (Admin Only).

---

### 5. Get User Statistics (Admin)
**GET** `/user/admin/stats`

Get user statistics (Admin Only).

**Response:**
```json
{
  "success": true,
  "stats": {
    "totalUsers": 150,
    "verifiedUsers": 120,
    "adminUsers": 5,
    "regularUsers": 145,
    "unverifiedUsers": 30
  }
}
```

---

## 📦 Package Endpoints

### 1. Get All Packages
**GET** `/packages/all`

Get all active packages with filters and pagination.

**Query Parameters:**
- `page` (optional): Page number
- `limit` (optional): Items per page
- `category` (optional): Filter by category
- `destination` (optional): Filter by destination
- `minPrice` (optional): Minimum price
- `maxPrice` (optional): Maximum price
- `availability` (optional): Filter by availability (true/false)
- `sort` (optional): Sort order (default: -createdAt)

**Response:**
```json
{
  "success": true,
  "packages": [...],
  "totalPages": 10,
  "currentPage": 1,
  "totalPackages": 100
}
```

---

### 2. Get Package by ID
**GET** `/packages/:id`

Get single package details.

**Response:**
```json
{
  "success": true,
  "package": {
    "_id": "package_id",
    "title": "Goa Beach Paradise",
    "description": "Amazing beach vacation",
    "destination": "Goa, India",
    "price": 15000,
    "duration": {
      "days": 5,
      "nights": 4
    },
    "rating": 4.5,
    "totalReviews": 25,
    ...
  }
}
```

---

### 3. Search Packages
**GET** `/packages/search`

Search packages by keyword.

**Query Parameters:**
- `keyword` (required): Search term
- `page` (optional): Page number
- `limit` (optional): Items per page

---

### 4. Get Featured Packages
**GET** `/packages/featured`

Get top-rated featured packages.

**Query Parameters:**
- `limit` (optional): Number of packages (default: 6)

---

### 5. Create Package (Admin)
**POST** `/packages/create`

Create a new package (Admin Only).

**Request Body:**
```json
{
  "title": "Rajasthan Heritage Tour",
  "description": "Explore the royal heritage of Rajasthan",
  "destination": "Jaipur, Udaipur, Jodhpur",
  "price": 25000,
  "duration": {
    "days": 7,
    "nights": 6
  },
  "maxCapacity": 30,
  "images": ["url1", "url2"],
  "inclusions": ["Hotel", "Meals", "Transport"],
  "exclusions": ["Air fare"],
  "category": "cultural",
  "difficulty": "easy",
  "startDates": ["2026-03-15", "2026-04-20"]
}
```

---

### 6. Update Package (Admin)
**PUT** `/packages/update/:id`

Update package details (Admin Only).

---

### 7. Delete Package (Admin)
**DELETE** `/packages/delete/:id`

Delete (archive) a package (Admin Only).

---

## 🎫 Booking Endpoints

### 1. Create Booking
**POST** `/bookings/create`

Create a new booking (Protected Route).

**Request Body:**
```json
{
  "packageId": "package_id_here",
  "travelDate": "2026-03-15",
  "numberOfPersons": {
    "adults": 2,
    "children": 1
  },
  "contactDetails": {
    "phone": "+919876543210",
    "email": "john@example.com",
    "alternatePhone": "+919876543211"
  },
  "specialRequests": "Need wheelchair accessibility"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Booking created successfully",
  "booking": {
    "_id": "booking_id",
    "totalAmount": 45000,
    "bookingStatus": "pending",
    "paymentStatus": "pending",
    ...
  }
}
```

---

### 2. Get User Bookings
**GET** `/bookings/my-bookings`

Get authenticated user's bookings (Protected Route).

**Query Parameters:**
- `status` (optional): Filter by booking status
- `page` (optional): Page number
- `limit` (optional): Items per page

---

### 3. Get Booking by ID
**GET** `/bookings/:id`

Get single booking details (Protected Route).

---

### 4. Cancel Booking
**PUT** `/bookings/cancel/:id`

Cancel a booking (Protected Route).

**Request Body:**
```json
{
  "reason": "Change of plans"
}
```

---

### 5. Get All Bookings (Admin)
**GET** `/bookings/admin/all`

Get all bookings (Admin Only).

**Query Parameters:**
- `status` (optional): Filter by status
- `page`, `limit`, `sort`

---

### 6. Update Booking Status (Admin)
**PUT** `/bookings/admin/update-status/:id`

Update booking status (Admin Only).

**Request Body:**
```json
{
  "status": "confirmed"
}
```

Valid statuses: `pending`, `confirmed`, `cancelled`, `completed`, `refunded`

---

### 7. Get Booking Statistics (Admin)
**GET** `/bookings/admin/stats`

Get booking statistics (Admin Only).

**Response:**
```json
{
  "success": true,
  "stats": {
    "totalBookings": 500,
    "confirmedBookings": 350,
    "cancelledBookings": 50,
    "pendingBookings": 100,
    "totalRevenue": 5000000
  }
}
```

---

## 💳 Payment Endpoints

### 1. Initiate Payment
**POST** `/payments/initiate`

Initiate payment for a booking (Protected Route).

**Request Body:**
```json
{
  "bookingId": "booking_id_here",
  "amount": 45000,
  "paymentMethod": "upi"
}
```

Valid payment methods: `credit_card`, `debit_card`, `upi`, `net_banking`, `wallet`, `cash`

---

### 2. Verify Payment
**POST** `/payments/verify`

Verify payment status (Payment Gateway Callback).

**Request Body:**
```json
{
  "paymentId": "payment_id",
  "transactionId": "TXN123456789",
  "status": "success",
  "paymentGatewayResponse": {}
}
```

---

### 3. Get User Payments
**GET** `/payments/my-payments`

Get user's payment history (Protected Route).

---

### 4. Get Payment Details
**GET** `/payments/:id`

Get single payment details (Protected Route).

---

### 5. Get All Payments (Admin)
**GET** `/payments/admin/all`

Get all payments (Admin Only).

---

### 6. Manual Payment Verification (Admin)
**POST** `/payments/admin/manual-verify`

Manually verify payment (Admin Only).

**Request Body:**
```json
{
  "paymentId": "payment_id",
  "transactionId": "MANUAL_TXN_123"
}
```

---

### 7. Process Refund (Admin)
**POST** `/payments/admin/refund`

Process refund (Admin Only).

**Request Body:**
```json
{
  "paymentId": "payment_id",
  "refundAmount": 45000,
  "refundTransactionId": "REFUND_123"
}
```

---

### 8. Get Payment Statistics (Admin)
**GET** `/payments/admin/stats`

Get payment statistics (Admin Only).

---

## ⭐ Feedback Endpoints

### 1. Submit Feedback
**POST** `/feedbacks/submit`

Submit feedback for a completed booking (Protected Route).

**Request Body:**
```json
{
  "packageId": "package_id",
  "bookingId": "booking_id",
  "rating": 5,
  "review": "Excellent experience! Highly recommended.",
  "images": ["image_url1", "image_url2"],
  "categories": {
    "serviceQuality": 5,
    "valueForMoney": 4,
    "cleanliness": 5,
    "amenities": 4
  }
}
```

---

### 2. Get Package Feedbacks
**GET** `/feedbacks/package/:packageId`

Get all approved feedbacks for a package (Public).

**Query Parameters:**
- `page`, `limit`, `rating`, `sort`

---

### 3. Get User Feedbacks
**GET** `/feedbacks/my-feedbacks`

Get user's feedback history (Protected Route).

---

### 4. Get All Feedbacks (Admin)
**GET** `/feedbacks/admin/all`

Get all feedbacks with filters (Admin Only).

---

### 5. Update Feedback Status (Admin)
**PUT** `/feedbacks/admin/update-status/:id`

Update feedback status (Admin Only).

**Request Body:**
```json
{
  "status": "approved",
  "adminResponse": "Thank you for your feedback!"
}
```

Valid statuses: `pending`, `approved`, `rejected`

---

### 6. Delete Feedback (Admin)
**DELETE** `/feedbacks/admin/delete/:id`

Delete feedback (Admin Only).

---

### 7. Get Feedback Statistics (Admin)
**GET** `/feedbacks/admin/stats`

Get feedback statistics (Admin Only).

---

## 🔒 Authentication

Most endpoints require authentication via JWT token stored in HTTP-only cookies. The token is automatically sent with requests after login.

### Protected Routes
Routes marked as "Protected Route" require valid JWT token.

### Admin Routes
Routes marked as "Admin Only" require JWT token with admin role.

---

## 📝 Environment Variables

Create a `.env` file in the server directory:

```env
PORT=4000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
ADMIN_SECRET_KEY=your_admin_secret_key
NODE_ENV=development

# Email Configuration
SENDER_EMAIL=your_email@gmail.com
EMAIL_PASSWORD=your_email_password
```

---

## 🚀 Getting Started

1. Install dependencies:
```bash
cd server
npm install
```

2. Set up environment variables in `.env` file

3. Start the server:
```bash
npm start
# or for development with auto-reload
npm run server
```

4. Create an admin account:
```bash
POST http://localhost:4000/api/auth/register-admin
```

---

## 📊 Response Codes

- `200` - Success
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `500` - Internal Server Error

---

## 🎉 Features Implemented

✅ User Registration & Authentication  
✅ Admin Role Management  
✅ Package CRUD Operations  
✅ Package Search & Filtering  
✅ Booking Management  
✅ Payment Processing  
✅ Feedback & Rating System  
✅ Admin Dashboard Statistics  
✅ Email Notifications  
✅ JWT Authentication  
✅ Role-based Access Control  

---

## 📌 Future Enhancements

- Payment Gateway Integration (Razorpay/Stripe)
- Image Upload to Cloud Storage
- Real-time Notifications
- Membership/Premium Features
- Advanced Analytics Dashboard
- Mobile App API Support

---

**GHUMMGHAMM Travel Agency © 2026**
