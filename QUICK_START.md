# GHUMMGHAMM - Quick Start Guide

## 🚀 Quick Setup (5 Minutes)

### Step 1: Install Dependencies
```bash
cd server
npm install
```

### Step 2: Create Environment File
Create a `.env` file in the `server` directory:

```env
# Server
PORT=4000
NODE_ENV=development

# Database - Replace with your MongoDB connection string
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/ghummghamm

# Security Keys - Generate your own secure keys
JWT_SECRET=your_super_secret_jwt_key_here_make_it_long_and_random
ADMIN_SECRET_KEY=your_admin_secret_key_for_creating_admins

# Email Configuration - Use your Gmail
SENDER_EMAIL=your.email@gmail.com
EMAIL_PASSWORD=your_app_specific_password
```

**Note for Gmail**: 
- Enable 2-factor authentication
- Generate App Password: Google Account → Security → App Passwords
- Use the generated app password, not your Gmail password

### Step 3: Start the Server
```bash
npm start
# Or for development with auto-reload:
npm run server
```

You should see:
```
Server is running on PORT:4000
MongoDB connected successfully
```

---

## 📋 First-Time Setup Checklist

### 1. Create Admin Account
Use Postman or any API client:

**Endpoint**: `POST http://localhost:4000/api/auth/register-admin`

**Body** (JSON):
```json
{
  "name": "Admin User",
  "email": "admin@ghummghamm.com",
  "password": "Admin@123",
  "adminSecret": "your_admin_secret_key_from_env"
}
```

### 2. Login as Admin
**Endpoint**: `POST http://localhost:4000/api/auth/login`

**Body** (JSON):
```json
{
  "email": "admin@ghummghamm.com",
  "password": "Admin@123"
}
```

**Important**: Copy the cookie from response for authenticated requests.

### 3. Create Sample Package
**Endpoint**: `POST http://localhost:4000/api/packages/create`

**Headers**: Include the authentication cookie from login

**Body** (JSON):
```json
{
  "title": "Goa Beach Paradise",
  "description": "Experience the beautiful beaches of Goa with our exclusive package",
  "destination": "Goa, India",
  "price": 15000,
  "duration": {
    "days": 5,
    "nights": 4
  },
  "maxCapacity": 50,
  "images": [
    "https://example.com/goa1.jpg",
    "https://example.com/goa2.jpg"
  ],
  "inclusions": [
    "Hotel accommodation",
    "Breakfast and dinner",
    "Airport transfers",
    "Sightseeing tours"
  ],
  "exclusions": [
    "Airfare",
    "Personal expenses",
    "Travel insurance"
  ],
  "category": "beach",
  "difficulty": "easy",
  "startDates": [
    "2026-03-15",
    "2026-04-20",
    "2026-05-10"
  ]
}
```

### 4. Register Test User
**Endpoint**: `POST http://localhost:4000/api/auth/register`

**Body** (JSON):
```json
{
  "name": "Test User",
  "email": "user@example.com",
  "password": "User@123"
}
```

---

## 🧪 Test Basic Flow

### User Journey:
1. ✅ Register user
2. ✅ Login user
3. ✅ Browse packages: `GET /api/packages/all`
4. ✅ View package details: `GET /api/packages/:id`
5. ✅ Create booking: `POST /api/bookings/create`
6. ✅ Initiate payment: `POST /api/payments/initiate`
7. ✅ Submit feedback: `POST /api/feedbacks/submit`

### Admin Journey:
1. ✅ Login as admin
2. ✅ View all bookings: `GET /api/bookings/admin/all`
3. ✅ Update booking status: `PUT /api/bookings/admin/update-status/:id`
4. ✅ View statistics: `GET /api/bookings/admin/stats`
5. ✅ Manage packages: Create/Update/Delete

---

## 📱 Testing with Postman

### Import Collection Steps:
1. Open Postman
2. Create new collection "GHUMMGHAMM API"
3. Add requests from API_DOCUMENTATION.md
4. Set base URL as variable: `{{baseUrl}}` = `http://localhost:4000/api`

### Cookie Authentication:
- After login, cookie is automatically set
- For manual testing, copy cookie from login response
- Add to request headers: `Cookie: token=your_jwt_token`

---

## 🛠️ Common Issues & Solutions

### Issue 1: MongoDB Connection Failed
**Solution**: 
- Check MONGODB_URI in .env
- Verify MongoDB cluster is running
- Whitelist your IP in MongoDB Atlas

### Issue 2: Email Not Sending
**Solution**:
- Use App Password for Gmail (not regular password)
- Enable "Less secure app access" if needed
- Check SENDER_EMAIL and EMAIL_PASSWORD in .env

### Issue 3: Unauthorized Error
**Solution**:
- Ensure you're logged in
- Check cookie is being sent with request
- Token might be expired (7 day validity)

### Issue 4: Admin Routes Not Working
**Solution**:
- Verify user has admin role in database
- Check ADMIN_SECRET_KEY matches in .env
- Re-login after role change

---

## 📊 Database Collections

After setup, you'll have these collections in MongoDB:
- `users` - User accounts
- `packages` - Travel packages
- `bookings` - Booking records
- `payments` - Payment transactions
- `feedbacks` - Reviews and ratings

---

## 🔍 Useful API Endpoints for Testing

### Public Endpoints (No Auth Required):
- `GET /api/packages/all` - Browse packages
- `GET /api/packages/featured` - Featured packages
- `GET /api/packages/search?keyword=beach` - Search
- `GET /api/feedbacks/package/:packageId` - Package reviews

### User Endpoints (Requires Login):
- `GET /api/user/data` - Get profile
- `GET /api/bookings/my-bookings` - My bookings
- `GET /api/payments/my-payments` - My payments

### Admin Endpoints (Requires Admin Role):
- `GET /api/user/admin/stats` - User statistics
- `GET /api/bookings/admin/stats` - Booking statistics
- `GET /api/payments/admin/stats` - Payment statistics
- `GET /api/feedbacks/admin/stats` - Feedback statistics

---

## 📈 Monitoring & Logs

Server logs show:
- Request method and URL
- Response status codes
- Database operations
- Errors (if any)

Check console for:
```
✓ Server is running on PORT:4000
✓ MongoDB connected successfully
✓ Email sent successfully
✗ Error messages (if any)
```

---

## 🎯 Next Steps

1. ✅ Backend Setup Complete
2. ⏭️ Test all API endpoints
3. ⏭️ Integrate with frontend
4. ⏭️ Add payment gateway (Razorpay/Stripe)
5. ⏭️ Deploy to production

---

## 📚 Documentation References

- **Full API Documentation**: `API_DOCUMENTATION.md`
- **Backend Summary**: `BACKEND_SUMMARY.md`
- **Original README**: `README.md`
- **Test Cases**: `TESTING_DOCUMENTATION.md`

---

## 💡 Pro Tips

1. **Use Environment Variables**: Never commit .env file
2. **Test Incrementally**: Test each endpoint after creation
3. **Check Logs**: Monitor server console for errors
4. **Use Postman Collections**: Save time with organized requests
5. **Database Backup**: Regular backups of MongoDB

---

## 🆘 Need Help?

1. Check error messages in console
2. Review API_DOCUMENTATION.md
3. Verify .env configuration
4. Test with simple requests first
5. Check MongoDB connection

---

## ✅ Setup Verification

Run these tests to verify setup:

```bash
# Test 1: Server Running
curl http://localhost:4000/api

# Test 2: Register User
curl -X POST http://localhost:4000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@test.com","password":"Test123"}'

# Test 3: Get Packages
curl http://localhost:4000/api/packages/all
```

If all return success responses, you're ready to go! 🎉

---

**GHUMMGHAMM Travel Agency - Backend Ready! 🚀**
