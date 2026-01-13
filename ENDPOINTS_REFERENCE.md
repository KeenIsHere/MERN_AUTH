# GHUMMGHAMM API - Endpoints Quick Reference

## Base URL
```
http://localhost:4000/api
```

---

## 🔐 AUTHENTICATION ENDPOINTS

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/auth/register` | No | Register new user |
| POST | `/auth/register-admin` | No | Register admin (requires secret) |
| POST | `/auth/login` | No | User login |
| POST | `/auth/logout` | No | User logout |
| POST | `/auth/send-verify-otp` | User | Send email verification OTP |
| POST | `/auth/verify-account` | User | Verify account with OTP |
| POST | `/auth/is-auth` | User | Check authentication status |
| POST | `/auth/send-reset-otp` | No | Send password reset OTP |
| POST | `/auth/reset-password` | No | Reset password with OTP |

---

## 👤 USER MANAGEMENT ENDPOINTS

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/user/data` | User | Get user profile data |
| GET | `/user/admin/all-users` | Admin | Get all users (with filters) |
| PUT | `/user/admin/update-role` | Admin | Update user role |
| DELETE | `/user/admin/delete/:userId` | Admin | Delete user |
| GET | `/user/admin/stats` | Admin | Get user statistics |

---

## 📦 PACKAGE ENDPOINTS

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/packages/all` | No | Browse all packages (with filters) |
| GET | `/packages/search` | No | Search packages by keyword |
| GET | `/packages/featured` | No | Get featured packages |
| GET | `/packages/:id` | No | Get package details by ID |
| POST | `/packages/create` | Admin | Create new package |
| PUT | `/packages/update/:id` | Admin | Update package |
| DELETE | `/packages/delete/:id` | Admin | Delete (archive) package |

---

## 🎫 BOOKING ENDPOINTS

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/bookings/create` | User | Create new booking |
| GET | `/bookings/my-bookings` | User | Get user's bookings |
| GET | `/bookings/:id` | User | Get booking details |
| PUT | `/bookings/cancel/:id` | User | Cancel booking |
| GET | `/bookings/admin/all` | Admin | Get all bookings |
| PUT | `/bookings/admin/update-status/:id` | Admin | Update booking status |
| GET | `/bookings/admin/stats` | Admin | Get booking statistics |

---

## 💳 PAYMENT ENDPOINTS

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/payments/initiate` | User | Initiate payment |
| POST | `/payments/verify` | Gateway | Verify payment (callback) |
| GET | `/payments/my-payments` | User | Get payment history |
| GET | `/payments/:id` | User | Get payment details |
| GET | `/payments/admin/all` | Admin | Get all payments |
| POST | `/payments/admin/manual-verify` | Admin | Manually verify payment |
| POST | `/payments/admin/refund` | Admin | Process refund |
| GET | `/payments/admin/stats` | Admin | Get payment statistics |

---

## ⭐ FEEDBACK ENDPOINTS

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/feedbacks/submit` | User | Submit feedback/review |
| GET | `/feedbacks/my-feedbacks` | User | Get user's feedbacks |
| GET | `/feedbacks/package/:packageId` | No | Get package feedbacks (public) |
| GET | `/feedbacks/admin/all` | Admin | Get all feedbacks |
| PUT | `/feedbacks/admin/update-status/:id` | Admin | Update feedback status |
| DELETE | `/feedbacks/admin/delete/:id` | Admin | Delete feedback |
| GET | `/feedbacks/admin/stats` | Admin | Get feedback statistics |

---

## 📊 TOTAL ENDPOINTS: 43

### By Category:
- Authentication: 9 endpoints
- User Management: 5 endpoints
- Packages: 7 endpoints
- Bookings: 7 endpoints
- Payments: 8 endpoints
- Feedback: 7 endpoints

### By Access Level:
- Public (No Auth): 12 endpoints
- User Protected: 17 endpoints
- Admin Protected: 14 endpoints

---

## 🔑 Authentication Types

| Type | Description | Header/Cookie |
|------|-------------|---------------|
| **No Auth** | Public endpoints | None required |
| **User** | Requires login | Cookie: token=JWT |
| **Admin** | Requires admin role | Cookie: token=JWT (admin) |
| **Gateway** | Payment gateway callback | Special validation |

---

## 📋 Common Query Parameters

### Pagination
- `page` - Page number (default: 1)
- `limit` - Items per page (default: 10 or 20)

### Sorting
- `sort` - Sort field (default: -createdAt)

### Filtering (Packages)
- `category` - Filter by category
- `minPrice` - Minimum price
- `maxPrice` - Maximum price
- `destination` - Filter by destination
- `availability` - Filter by availability (true/false)

### Filtering (Bookings)
- `status` - Filter by booking status

### Filtering (Payments)
- `status` - Filter by payment status

### Search
- `keyword` - Search term (for package search)
- `search` - Search term (for user search)

---

## 🎯 Example Requests

### Register User
```bash
POST /api/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "Password123"
}
```

### Login
```bash
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "Password123"
}
```

### Browse Packages
```bash
GET /api/packages/all?page=1&limit=10&category=beach&minPrice=10000
```

### Create Booking
```bash
POST /api/bookings/create
Cookie: token=JWT_TOKEN
Content-Type: application/json

{
  "packageId": "507f1f77bcf86cd799439011",
  "travelDate": "2026-03-15",
  "numberOfPersons": {
    "adults": 2,
    "children": 1
  },
  "contactDetails": {
    "phone": "+919876543210",
    "email": "john@example.com"
  }
}
```

### Submit Feedback
```bash
POST /api/feedbacks/submit
Cookie: token=JWT_TOKEN
Content-Type: application/json

{
  "packageId": "507f1f77bcf86cd799439011",
  "bookingId": "507f1f77bcf86cd799439012",
  "rating": 5,
  "review": "Excellent experience!"
}
```

---

## 📝 Response Format

### Success Response
```json
{
  "success": true,
  "message": "Operation successful",
  "data": {}
}
```

### Error Response
```json
{
  "success": false,
  "message": "Error description"
}
```

### Paginated Response
```json
{
  "success": true,
  "items": [],
  "totalPages": 10,
  "currentPage": 1,
  "totalItems": 100
}
```

---

## 🚀 Quick Test Sequence

1. Register Admin → Login → Create Package
2. Register User → Login → Browse Packages
3. User: Create Booking → Initiate Payment
4. User: Submit Feedback (after booking completion)
5. Admin: View Statistics

---

## ⚡ Status Codes

- `200` - OK
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden (Admin required)
- `404` - Not Found
- `500` - Internal Server Error

---

**For detailed request/response examples, see API_DOCUMENTATION.md**
