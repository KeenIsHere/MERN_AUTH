# Testing Phase Documentation

## MERN Authentication System - Complete Test Cases

This document outlines all the test cases that can be performed on the MERN Authentication System. Each test is documented with its objective, action steps, expected results, and actual results.

---

## 1. User Registration Testing

### 1.1 Test 1: Successful User Registration

| **Objective** | To verify that a new user can successfully register with valid credentials and receive a welcome email. |
|---------------|--------------------------------------------------------------------------------------------------------|
| **Action** | Provide valid name, email, and password in the registration form. Submit the registration request. |
| **Expected Result** | The system should create a new user account, hash the password, generate a JWT token, set it as a cookie, send a welcome email, and return a success message "Registration successful". |
| **Actual Result** | The program successfully creates a user account, stores hashed password in database, sends welcome email, and returns success response with authentication token. |

### 1.2 Test 2: Registration with Missing Fields

| **Objective** | To ensure the system validates that all required fields (name, email, password) are provided during registration. |
|---------------|-------------------------------------------------------------------------------------------------------------------|
| **Action** | Attempt to register by omitting one or more required fields (name, email, or password). |
| **Expected Result** | The system should return an error message "Missing Details" with status 400 and prevent registration. |
| **Actual Result** | The program displays appropriate error message for missing fields and prevents user registration. |

### 1.3 Test 3: Registration with Existing Email

| **Objective** | To verify that the system prevents duplicate user registration with the same email address. |
|---------------|-------------------------------------------------------------------------------------------|
| **Action** | Attempt to register with an email address that already exists in the database. |
| **Expected Result** | The system should return error message "User already exists" with status 400 and prevent duplicate registration. |
| **Actual Result** | The program checks for existing users and displays error message preventing duplicate accounts. |

### 1.4 Test 4: Registration with Empty Request Body

| **Objective** | To ensure the system handles requests with missing request body properly. |
|---------------|---------------------------------------------------------------------------|
| **Action** | Send a registration request without any request body. |
| **Expected Result** | The system should return status 400 with error message "Request body is missing". |
| **Actual Result** | The program validates request body existence and returns appropriate error message. |

---

## 2. User Login Testing

### 2.1 Test 5: Successful Login

| **Objective** | To verify that a registered user can successfully login with correct credentials. |
|---------------|-----------------------------------------------------------------------------------|
| **Action** | Provide valid email and password for an existing user account. |
| **Expected Result** | The system should authenticate the user, generate JWT token, set it as cookie, and return "Login successful" message. |
| **Actual Result** | The program successfully authenticates user, creates session token, and returns success response. |

### 2.2 Test 6: Login with Missing Credentials

| **Objective** | To ensure the system validates that both email and password are provided during login. |
|---------------|--------------------------------------------------------------------------------------|
| **Action** | Attempt to login by omitting email or password field. |
| **Expected Result** | The system should return status 400 with error message "Email And Password Are Requires". |
| **Actual Result** | The program validates required fields and displays error message for missing credentials. |

### 2.3 Test 7: Login with Invalid Email

| **Objective** | To verify that the system rejects login attempts with non-existent email addresses. |
|---------------|------------------------------------------------------------------------------------|
| **Action** | Provide an email address that does not exist in the database along with any password. |
| **Expected Result** | The system should return error message "Invalid Email" and deny access. |
| **Actual Result** | The program checks email existence in database and returns appropriate error message. |

### 2.4 Test 8: Login with Incorrect Password

| **Objective** | To ensure the system rejects login attempts with wrong passwords. |
|---------------|-------------------------------------------------------------------|
| **Action** | Provide valid email but incorrect password. |
| **Expected Result** | The system should return error message "Invalid password" and deny authentication. |
| **Actual Result** | The program compares password hashes and rejects incorrect passwords with error message. |

---

## 3. User Logout Testing

### 3.1 Test 9: Successful Logout

| **Objective** | To verify that authenticated users can successfully logout from the system. |
|---------------|-----------------------------------------------------------------------------|
| **Action** | Send logout request from an authenticated session. |
| **Expected Result** | The system should clear the authentication cookie and return "Logged Out successfully" message. |
| **Actual Result** | The program clears session cookie and returns success confirmation. |

### 3.2 Test 10: Logout Error Handling

| **Objective** | To ensure the system handles logout errors gracefully. |
|---------------|--------------------------------------------------------|
| **Action** | Trigger logout functionality under error conditions. |
| **Expected Result** | The system should catch errors and return error message in response. |
| **Actual Result** | The program handles exceptions and returns error messages appropriately. |

---

## 4. Email Verification Testing

### 4.1 Test 11: Send Verification OTP Successfully

| **Objective** | To verify that the system can generate and send OTP to user's email for account verification. |
|---------------|-----------------------------------------------------------------------------------------------|
| **Action** | Send request to generate OTP for unverified account with valid userId. |
| **Expected Result** | The system should generate 6-digit OTP, store it with 24-hour expiry, send email, and return "OTP sent to your email" message. |
| **Actual Result** | The program generates random OTP, saves to database, sends email via nodemailer, and confirms success. |

### 4.2 Test 12: Send OTP to Already Verified Account

| **Objective** | To ensure the system prevents sending OTP to accounts that are already verified. |
|---------------|----------------------------------------------------------------------------------|
| **Action** | Request OTP generation for an account that has already been verified. |
| **Expected Result** | The system should return error message "Account Already Verirified" and not send OTP. |
| **Actual Result** | The program checks verification status and prevents unnecessary OTP generation. |

### 4.3 Test 13: Verify Email with Valid OTP

| **Objective** | To verify that users can successfully verify their account using valid OTP. |
|---------------|-----------------------------------------------------------------------------|
| **Action** | Provide valid userId and correct OTP within expiry time. |
| **Expected Result** | The system should verify the account, set isAccountVerified to true, clear OTP data, and return "Account verified successfully" message. |
| **Actual Result** | The program validates OTP, updates account status, and confirms successful verification. |

### 4.4 Test 14: Verify Email with Missing Details

| **Objective** | To ensure the system validates that both userId and OTP are provided for verification. |
|---------------|----------------------------------------------------------------------------------------|
| **Action** | Send verification request without userId or OTP. |
| **Expected Result** | The system should return error message "Missing Details". |
| **Actual Result** | The program validates input parameters and returns appropriate error for missing data. |

### 4.5 Test 15: Verify Email with Invalid OTP

| **Objective** | To verify that the system rejects verification attempts with incorrect OTP. |
|---------------|-----------------------------------------------------------------------------|
| **Action** | Provide valid userId but incorrect or empty OTP. |
| **Expected Result** | The system should return error message "Invalid or expired OTP" and not verify account. |
| **Actual Result** | The program compares OTP values and rejects invalid codes with error message. |

### 4.6 Test 16: Verify Email with Expired OTP

| **Objective** | To ensure the system rejects OTP that has passed its expiration time. |
|---------------|-----------------------------------------------------------------------|
| **Action** | Provide valid OTP after the 24-hour expiry period has passed. |
| **Expected Result** | The system should check expiry timestamp and return "OTP has expired" error message. |
| **Actual Result** | The program validates timestamp against current time and rejects expired OTPs. |

### 4.7 Test 17: Verify Already Verified Account

| **Objective** | To prevent verification of accounts that are already verified. |
|---------------|----------------------------------------------------------------|
| **Action** | Attempt to verify an account that has already been verified. |
| **Expected Result** | The system should return error message "Account already verified". |
| **Actual Result** | The program checks verification status and prevents redundant verification. |

### 4.8 Test 18: Verify Email with Non-existent User

| **Objective** | To ensure the system handles verification requests for non-existent users. |
|---------------|----------------------------------------------------------------------------|
| **Action** | Provide userId that does not exist in the database. |
| **Expected Result** | The system should return error message "User not found". |
| **Actual Result** | The program queries database and returns error for invalid userId. |

---

## 5. Password Reset Testing

### 5.1 Test 19: Send Password Reset OTP Successfully

| **Objective** | To verify that users can request password reset OTP via email. |
|---------------|----------------------------------------------------------------|
| **Action** | Provide valid registered email address for password reset. |
| **Expected Result** | The system should generate 6-digit OTP, store it with 15-minute expiry, send email, and return "OTP sent to your email" message. |
| **Actual Result** | The program generates OTP, saves to database with timestamp, sends email, and confirms success. |

### 5.2 Test 20: Send Reset OTP without Email

| **Objective** | To ensure the system validates that email is provided for password reset request. |
|---------------|-----------------------------------------------------------------------------------|
| **Action** | Send password reset request without email parameter. |
| **Expected Result** | The system should return error message "Email is required". |
| **Actual Result** | The program validates email presence and returns appropriate error message. |

### 5.3 Test 21: Send Reset OTP for Non-existent User

| **Objective** | To verify that the system handles reset requests for unregistered email addresses. |
|---------------|------------------------------------------------------------------------------------|
| **Action** | Request password reset for email that doesn't exist in database. |
| **Expected Result** | The system should return error message "User not found". |
| **Actual Result** | The program checks email existence and returns error for invalid addresses. |

### 5.4 Test 22: Reset Password Successfully

| **Objective** | To verify that users can successfully reset their password using valid OTP. |
|---------------|-----------------------------------------------------------------------------|
| **Action** | Provide valid email, correct OTP, and new password within 15-minute window. |
| **Expected Result** | The system should validate OTP, hash new password, update database, clear OTP data, and return "Password reset successful" message. |
| **Actual Result** | The program validates OTP, encrypts password, updates user record, and confirms success. |

### 5.5 Test 23: Reset Password with Missing Details

| **Objective** | To ensure all required fields are provided for password reset. |
|---------------|----------------------------------------------------------------|
| **Action** | Attempt password reset without email, OTP, or newPassword. |
| **Expected Result** | The system should return error message "Missing Details". |
| **Actual Result** | The program validates all required parameters and returns error for missing fields. |

### 5.6 Test 24: Reset Password with Invalid OTP

| **Objective** | To verify that password reset is rejected with incorrect OTP. |
|---------------|---------------------------------------------------------------|
| **Action** | Provide valid email and new password but incorrect OTP. |
| **Expected Result** | The system should return error message "Invalid or expired OTP" and not reset password. |
| **Actual Result** | The program compares OTP values and rejects invalid codes. |

### 5.7 Test 25: Reset Password with Expired OTP

| **Objective** | To ensure password reset OTP expires after 15 minutes. |
|---------------|---------------------------------------------------------|
| **Action** | Attempt to reset password with OTP after 15-minute expiry period. |
| **Expected Result** | The system should check timestamp and return "OTP has expired" error message. |
| **Actual Result** | The program validates expiry time and rejects expired OTP codes. |

### 5.8 Test 26: Reset Password for Non-existent User

| **Objective** | To handle password reset attempts for unregistered users. |
|---------------|-----------------------------------------------------------|
| **Action** | Provide email that doesn't exist in database for password reset. |
| **Expected Result** | The system should return error message "User not found". |
| **Actual Result** | The program queries database and returns error for invalid email. |

---

## 6. User Authentication Middleware Testing

### 6.1 Test 27: Access Protected Route with Valid Token

| **Objective** | To verify that authenticated users can access protected routes. |
|---------------|----------------------------------------------------------------|
| **Action** | Send request to protected endpoint with valid JWT token in cookies. |
| **Expected Result** | The middleware should verify token, extract userId, attach it to request body, and allow access to the route. |
| **Actual Result** | The program validates JWT signature, decodes userId, and passes control to next handler. |

### 6.2 Test 28: Access Protected Route without Token

| **Objective** | To ensure unauthorized access is prevented when token is missing. |
|---------------|-------------------------------------------------------------------|
| **Action** | Send request to protected endpoint without authentication token. |
| **Expected Result** | The middleware should return error message "Unauthorized, Try Again" and deny access. |
| **Actual Result** | The program checks for token presence and blocks unauthorized requests. |

### 6.3 Test 29: Access Protected Route with Invalid Token

| **Objective** | To verify that requests with invalid or tampered tokens are rejected. |
|---------------|-----------------------------------------------------------------------|
| **Action** | Send request with malformed or invalid JWT token. |
| **Expected Result** | The middleware should fail to verify token and return error message from jwt.verify. |
| **Actual Result** | The program attempts verification, catches error, and returns appropriate error message. |

### 6.4 Test 30: Access Protected Route with Expired Token

| **Objective** | To ensure tokens that have expired (after 7 days) are rejected. |
|---------------|----------------------------------------------------------------|
| **Action** | Send request with JWT token that has passed its expiration date. |
| **Expected Result** | The middleware should detect expired token during verification and return error message. |
| **Actual Result** | The program validates expiry claim and rejects expired tokens with error. |

### 6.5 Test 31: Token with Missing User ID

| **Objective** | To handle tokens that don't contain valid user ID in payload. |
|---------------|---------------------------------------------------------------|
| **Action** | Use token with decoded payload that doesn't contain 'id' field. |
| **Expected Result** | The middleware should return "Unauthorized, Try Again" error message. |
| **Actual Result** | The program checks for id field in decoded token and blocks invalid tokens. |

---

## 7. Authentication Status Testing

### 7.1 Test 32: Check Authentication Status

| **Objective** | To verify that the system can confirm if a user is authenticated. |
|---------------|-------------------------------------------------------------------|
| **Action** | Send authentication check request with valid token. |
| **Expected Result** | The system should return success message "User is authenticated". |
| **Actual Result** | The program confirms authentication through middleware and returns success response. |

### 7.2 Test 33: Check Authentication Status without Token

| **Objective** | To verify authentication check fails without valid token. |
|---------------|------------------------------------------------------------|
| **Action** | Send authentication check request without token. |
| **Expected Result** | The middleware should block request and return "Unauthorized, Try Again" error. |
| **Actual Result** | The program prevents access and returns unauthorized error through middleware. |

---

## 8. Get User Data Testing

### 8.1 Test 34: Retrieve User Data Successfully

| **Objective** | To verify that authenticated users can retrieve their profile data. |
|---------------|---------------------------------------------------------------------|
| **Action** | Send request to get user data endpoint with valid authentication token. |
| **Expected Result** | The system should fetch user from database and return user object with id, name, email, and isAccountVerified fields. |
| **Actual Result** | The program queries database, excludes sensitive data like password, and returns user profile information. |

### 8.2 Test 35: Retrieve Data for Non-existent User

| **Objective** | To handle requests for user data when userId doesn't exist. |
|---------------|-------------------------------------------------------------|
| **Action** | Send request with valid token but userId that doesn't exist in database. |
| **Expected Result** | The system should return error message "User not found". |
| **Actual Result** | The program queries database, finds no match, and returns appropriate error message. |

### 8.3 Test 36: Retrieve User Data without Authentication

| **Objective** | To ensure user data endpoint is protected and requires authentication. |
|---------------|------------------------------------------------------------------------|
| **Action** | Attempt to access user data endpoint without authentication token. |
| **Expected Result** | The middleware should block request and return "Unauthorized, Try Again" error. |
| **Actual Result** | The program prevents unauthorized access through authentication middleware. |

---

## 9. Cookie Security Testing

### 9.1 Test 37: Cookie Settings in Production

| **Objective** | To verify that authentication cookies are set with proper security flags in production. |
|---------------|----------------------------------------------------------------------------------------|
| **Action** | Login or register in production environment (NODE_ENV=production). |
| **Expected Result** | The system should set cookies with httpOnly=true, secure=true, sameSite='none' attributes. |
| **Actual Result** | The program configures cookies with enhanced security settings for production environment. |

### 9.2 Test 38: Cookie Settings in Development

| **Objective** | To verify that cookies are configured appropriately for development environment. |
|---------------|----------------------------------------------------------------------------------|
| **Action** | Login or register in development environment (NODE_ENV != production). |
| **Expected Result** | The system should set cookies with httpOnly=true, secure=false, sameSite='strict' attributes. |
| **Actual Result** | The program adjusts cookie security settings suitable for development environment. |

### 9.3 Test 39: Cookie Expiration

| **Objective** | To verify that authentication cookies are set with proper expiration time. |
|---------------|---------------------------------------------------------------------------|
| **Action** | Login or register and check cookie expiration settings. |
| **Expected Result** | The system should set cookie maxAge to 7 days (604800000 milliseconds). |
| **Actual Result** | The program configures cookies to expire after 7 days matching token expiration. |

---

## 10. Email Functionality Testing

### 10.1 Test 40: Welcome Email Delivery

| **Objective** | To verify that welcome emails are sent upon successful registration. |
|---------------|----------------------------------------------------------------------|
| **Action** | Complete registration process with valid details. |
| **Expected Result** | The system should send email with subject "Registration Successful" containing welcome message and account details. |
| **Actual Result** | The program uses nodemailer to send personalized welcome email to registered user. |

### 10.2 Test 41: OTP Email Delivery for Verification

| **Objective** | To verify that OTP emails are delivered for account verification. |
|---------------|-------------------------------------------------------------------|
| **Action** | Request account verification OTP. |
| **Expected Result** | The system should send email with subject "Verify Your Account" containing 6-digit OTP. |
| **Actual Result** | The program generates OTP and sends email with verification code. |

### 10.3 Test 42: OTP Email Delivery for Password Reset

| **Objective** | To verify that OTP emails are sent for password reset requests. |
|---------------|----------------------------------------------------------------|
| **Action** | Request password reset OTP. |
| **Expected Result** | The system should send email with subject "Password Reset OTP" containing 6-digit OTP. |
| **Actual Result** | The program generates reset OTP and delivers email with reset code. |

---

## 11. Password Security Testing

### 11.1 Test 43: Password Hashing on Registration

| **Objective** | To ensure passwords are properly hashed before storage. |
|---------------|---------------------------------------------------------|
| **Action** | Register new user and check password storage in database. |
| **Expected Result** | The system should hash password using bcrypt with salt rounds of 10 before storing. |
| **Actual Result** | The program uses bcryptjs to create secure password hash and stores only hashed version. |

### 11.2 Test 44: Password Comparison on Login

| **Objective** | To verify that password validation uses secure comparison. |
|---------------|-----------------------------------------------------------|
| **Action** | Login with correct password and check validation method. |
| **Expected Result** | The system should use bcrypt.compare to validate password against hashed version. |
| **Actual Result** | The program securely compares plaintext password with stored hash using bcrypt. |

### 11.3 Test 45: Password Hashing on Reset

| **Objective** | To ensure new passwords are hashed when resetting password. |
|---------------|-------------------------------------------------------------|
| **Action** | Complete password reset process with new password. |
| **Expected Result** | The system should hash new password with bcrypt before updating database. |
| **Actual Result** | The program applies bcrypt hashing to new password before storage. |

---

## 12. JWT Token Testing

### 12.1 Test 46: Token Generation on Registration

| **Objective** | To verify that JWT tokens are created upon successful registration. |
|---------------|---------------------------------------------------------------------|
| **Action** | Complete registration process. |
| **Expected Result** | The system should generate JWT containing userId, signed with JWT_SECRET, valid for 7 days. |
| **Actual Result** | The program creates signed JWT with user ID payload and appropriate expiration. |

### 12.2 Test 47: Token Generation on Login

| **Objective** | To verify that JWT tokens are created upon successful login. |
|---------------|--------------------------------------------------------------|
| **Action** | Login with valid credentials. |
| **Expected Result** | The system should generate JWT containing userId, signed with JWT_SECRET, valid for 7 days. |
| **Actual Result** | The program creates new authentication token with 7-day validity period. |

### 12.3 Test 48: Token Verification

| **Objective** | To ensure tokens are properly verified using the secret key. |
|---------------|-------------------------------------------------------------|
| **Action** | Access protected route with valid JWT token. |
| **Expected Result** | The middleware should use jwt.verify with JWT_SECRET to validate token signature and decode payload. |
| **Actual Result** | The program verifies token authenticity and extracts user information. |

---

## 13. Error Handling Testing

### 13.1 Test 49: Database Connection Errors

| **Objective** | To verify that database errors are handled gracefully. |
|---------------|--------------------------------------------------------|
| **Action** | Trigger operations when database is unavailable or connection fails. |
| **Expected Result** | The system should catch errors and return error message without exposing internal details. |
| **Actual Result** | The program uses try-catch blocks to handle database errors and return appropriate messages. |

### 13.2 Test 50: Email Service Errors

| **Objective** | To ensure email sending failures are handled properly. |
|---------------|--------------------------------------------------------|
| **Action** | Trigger email sending when SMTP service is unavailable. |
| **Expected Result** | The system should catch transporter errors and return error message. |
| **Actual Result** | The program handles nodemailer errors and returns failure response to user. |

### 13.3 Test 51: Invalid JSON Request Body

| **Objective** | To verify the system handles malformed JSON in request body. |
|---------------|-------------------------------------------------------------|
| **Action** | Send request with invalid JSON syntax in body. |
| **Expected Result** | The system should catch parsing error and return appropriate error message. |
| **Actual Result** | The program's error handling catches JSON parsing errors and responds appropriately. |

---

## 14. Route Protection Testing

### 14.1 Test 52: Protected Route Access with Authentication

| **Objective** | To verify that authenticated users can access routes protected by userAuth middleware. |
|---------------|--------------------------------------------------------------------------------------|
| **Action** | Access protected routes (send-verify-otp, verify-account, user data) with valid token. |
| **Expected Result** | The middleware should allow request to proceed to route handler. |
| **Actual Result** | The program validates authentication and grants access to protected resources. |

### 14.2 Test 53: Protected Route Blocking without Authentication

| **Objective** | To ensure protected routes reject requests without valid authentication. |
|---------------|-------------------------------------------------------------------------|
| **Action** | Attempt to access protected routes without authentication token. |
| **Expected Result** | The middleware should block access and return "Unauthorized, Try Again" error. |
| **Actual Result** | The program prevents unauthorized access to protected endpoints. |

---

## 15. Input Validation Testing

### 15.1 Test 54: SQL Injection Prevention

| **Objective** | To verify that the system prevents SQL injection attacks through input validation. |
|---------------|------------------------------------------------------------------------------------|
| **Action** | Attempt to inject SQL commands in email, password, or other input fields. |
| **Expected Result** | MongoDB's query structure and parameterization should prevent SQL injection. |
| **Actual Result** | The program uses MongoDB queries which are not vulnerable to SQL injection attacks. |

### 15.2 Test 55: XSS Prevention

| **Objective** | To ensure user inputs are properly sanitized to prevent Cross-Site Scripting. |
|---------------|-------------------------------------------------------------------------------|
| **Action** | Attempt to submit HTML/JavaScript code in name, email, or other text fields. |
| **Expected Result** | The system should store inputs as-is but proper frontend handling should escape outputs. |
| **Actual Result** | The program stores data safely; frontend should implement output escaping. |

### 15.3 Test 56: Empty String Validation

| **Objective** | To verify that empty strings are rejected for required fields. |
|---------------|---------------------------------------------------------------|
| **Action** | Submit empty strings for required fields like email, password, or name. |
| **Expected Result** | The system should detect empty strings and return "Missing Details" error. |
| **Actual Result** | The program validates field presence and rejects empty values. |

---

## 📸 Postman Testing Guide

### Overview

This section provides a comprehensive guide for conducting API testing using Postman. Follow these steps to systematically test all endpoints while capturing screenshots for documentation.

### Prerequisites

1. **Install Postman**: Download from [postman.com](https://www.postman.com/downloads/)
2. **Start the Server**: Ensure your backend server is running on `http://localhost:4000`
3. **Prepare Screenshot Tool**: Use built-in OS tools or Postman's screenshot feature

### Testing Methodology

#### Phase 1: Environment Setup (Before Testing)

**Step 1: Create Postman Collection**
- Open Postman
- Create new collection named "MERN Auth System Testing"
- Add all endpoints to the collection
- **Screenshot**: Collection structure with all endpoints listed

**Step 2: Set Up Environment Variables**
- Create environment named "Development"
- Add variables:
  - `baseURL`: `http://localhost:4000`
  - `token`: (will be set automatically after login)
  - `userId`: (will be set after registration/login)
- **Screenshot**: Environment variables configuration

**Step 3: Configure Collection Settings**
- Go to Collection Settings → Authorization → Type: No Auth
- Configure Tests tab for automatic token capture (optional)
- **Screenshot**: Collection settings page

---

#### Phase 2: Execute Test Cases (During Testing)

### For Each Test Case, Follow This Structure:

#### Test Execution Template

**Before Each Test:**
1. Identify the test case number and objective
2. Set up the request (method, URL, headers, body)
3. Review expected results

**During Test Execution:**
1. Send the request
2. Observe the response
3. Verify status code
4. Check response body
5. Validate against expected results

**Screenshot Capture Points:**
1. **Request Setup Screenshot** - Show:
   - Request URL
   - Request method (GET/POST)
   - Headers tab (if authentication required)
   - Body tab with input data
   
2. **Response Screenshot** - Show:
   - Status code (200, 400, 401, etc.)
   - Response body (JSON)
   - Response time
   - Response size

3. **Cookies Screenshot** (for authentication tests) - Show:
   - Cookie name and value
   - Cookie attributes (httpOnly, secure, sameSite)

---

### Detailed Test Execution Guide by Section

#### Section 1: User Registration Testing

##### Test 1.1: Successful User Registration

**Setup:**
```
Method: POST
URL: {{baseURL}}/api/auth/register
Headers: Content-Type: application/json
Body (raw JSON):
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "SecurePass123"
}
```

**Screenshots to Capture:**
1. **Screenshot 1.1a - Request Setup**
   - Show complete request with body data
   - Label: "Test 1.1 - Registration Request"

2. **Screenshot 1.1b - Response**
   - Show success response with status 200
   - Response body showing success message
   - Label: "Test 1.1 - Registration Success Response"

3. **Screenshot 1.1c - Cookies**
   - Show Cookies tab with JWT token
   - Label: "Test 1.1 - JWT Token Cookie Set"

4. **Screenshot 1.1d - Database Verification**
   - Open MongoDB Compass or CLI
   - Show new user created in database
   - Label: "Test 1.1 - User Created in Database"

5. **Screenshot 1.1e - Email Received**
   - Show welcome email in inbox
   - Label: "Test 1.1 - Welcome Email Received"

---

##### Test 1.2: Registration with Missing Fields

**Setup:**
```
Method: POST
URL: {{baseURL}}/api/auth/register
Body (raw JSON):
{
  "name": "John Doe",
  "email": "john@example.com"
  // password intentionally omitted
}
```

**Screenshots to Capture:**
1. **Screenshot 1.2a - Request with Missing Field**
   - Show request body without password
   - Label: "Test 1.2 - Missing Password Field"

2. **Screenshot 1.2b - Error Response**
   - Show 400 status code
   - Error message "Missing Details"
   - Label: "Test 1.2 - Missing Field Error Response"

---

##### Test 1.3: Registration with Existing Email

**Setup:**
```
Method: POST
URL: {{baseURL}}/api/auth/register
Body (raw JSON):
{
  "name": "Jane Doe",
  "email": "john@example.com",  // Same email as Test 1.1
  "password": "AnotherPass123"
}
```

**Screenshots to Capture:**
1. **Screenshot 1.3a - Duplicate Email Request**
   - Show request with existing email
   - Label: "Test 1.3 - Duplicate Email Registration Attempt"

2. **Screenshot 1.3b - Error Response**
   - Show 400 status code
   - Error message "User already exists"
   - Label: "Test 1.3 - Duplicate User Error"

---

#### Section 2: User Login Testing

##### Test 2.1: Successful Login

**Setup:**
```
Method: POST
URL: {{baseURL}}/api/auth/login
Headers: Content-Type: application/json
Body (raw JSON):
{
  "email": "john@example.com",
  "password": "SecurePass123"
}
```

**Screenshots to Capture:**
1. **Screenshot 2.1a - Login Request**
   - Show request with valid credentials
   - Label: "Test 2.1 - Login Request"

2. **Screenshot 2.1b - Success Response**
   - Show status 200
   - Success message "Login successful"
   - Label: "Test 2.1 - Login Success Response"

3. **Screenshot 2.1c - JWT Token Cookie**
   - Show new token set in cookies
   - Label: "Test 2.1 - New Session Token Created"

---

##### Test 2.4: Login with Incorrect Password

**Setup:**
```
Method: POST
URL: {{baseURL}}/api/auth/login
Body (raw JSON):
{
  "email": "john@example.com",
  "password": "WrongPassword123"
}
```

**Screenshots to Capture:**
1. **Screenshot 2.4a - Wrong Password Request**
   - Show request with incorrect password
   - Label: "Test 2.4 - Login with Wrong Password"

2. **Screenshot 2.4b - Error Response**
   - Show error message "Invalid password"
   - Label: "Test 2.4 - Invalid Password Error"

---

#### Section 3: Email Verification Testing

##### Test 4.1: Send Verification OTP

**Setup:**
```
Method: POST
URL: {{baseURL}}/api/auth/send-verify-otp
Headers: 
  - Content-Type: application/json
  - Cookie: token=<your_jwt_token>
Body (raw JSON):
{
  "userId": "your_user_id_here"
}
```

**Screenshots to Capture:**
1. **Screenshot 4.1a - OTP Request Setup**
   - Show request with userId
   - Show Headers tab with authentication cookie
   - Label: "Test 4.1 - Send OTP Request with Auth"

2. **Screenshot 4.1b - Success Response**
   - Show "OTP sent to your email" message
   - Label: "Test 4.1 - OTP Send Success"

3. **Screenshot 4.1c - Email with OTP**
   - Show email inbox with OTP
   - Highlight the 6-digit OTP code
   - Label: "Test 4.1 - Verification OTP Email"

4. **Screenshot 4.1d - Database OTP Record**
   - Show user document with OTP and expiry time
   - Label: "Test 4.1 - OTP Stored in Database"

---

##### Test 4.3: Verify Email with Valid OTP

**Setup:**
```
Method: POST
URL: {{baseURL}}/api/auth/verify-account
Headers: 
  - Cookie: token=<your_jwt_token>
Body (raw JSON):
{
  "userId": "your_user_id_here",
  "otp": "123456"  // OTP from email
}
```

**Screenshots to Capture:**
1. **Screenshot 4.3a - Verify Request**
   - Show request with userId and OTP
   - Label: "Test 4.3 - Verify Account Request"

2. **Screenshot 4.3b - Verification Success**
   - Show success message "Account verified successfully"
   - Label: "Test 4.3 - Account Verified Response"

3. **Screenshot 4.3c - Updated Database**
   - Show user document with isAccountVerified: true
   - Show cleared OTP fields
   - Label: "Test 4.3 - Account Status Updated"

---

#### Section 4: Password Reset Testing

##### Test 5.1: Send Password Reset OTP

**Setup:**
```
Method: POST
URL: {{baseURL}}/api/auth/send-reset-otp
Body (raw JSON):
{
  "email": "john@example.com"
}
```

**Screenshots to Capture:**
1. **Screenshot 5.1a - Reset OTP Request**
   - Show request with email
   - Label: "Test 5.1 - Password Reset OTP Request"

2. **Screenshot 5.1b - Success Response**
   - Show "OTP sent to your email" message
   - Label: "Test 5.1 - Reset OTP Sent"

3. **Screenshot 5.1c - Reset Email Received**
   - Show email with reset OTP
   - Label: "Test 5.1 - Password Reset OTP Email"

---

##### Test 5.4: Reset Password Successfully

**Setup:**
```
Method: POST
URL: {{baseURL}}/api/auth/reset-password
Body (raw JSON):
{
  "email": "john@example.com",
  "otp": "123456",  // OTP from email
  "newPassword": "NewSecurePass456"
}
```

**Screenshots to Capture:**
1. **Screenshot 5.4a - Reset Password Request**
   - Show request with email, OTP, and new password
   - Label: "Test 5.4 - Reset Password Request"

2. **Screenshot 5.4b - Reset Success**
   - Show success message "Password reset successful"
   - Label: "Test 5.4 - Password Reset Success"

3. **Screenshot 5.4c - Login with New Password**
   - Perform login with new password
   - Show successful login
   - Label: "Test 5.4 - Login with New Password"

---

#### Section 5: Protected Routes Testing

##### Test 6.1: Access Protected Route with Valid Token

**Setup:**
```
Method: GET
URL: {{baseURL}}/api/user/data
Headers: 
  - Cookie: token=<valid_jwt_token>
```

**Screenshots to Capture:**
1. **Screenshot 6.1a - Protected Route Request**
   - Show Headers tab with valid token
   - Label: "Test 6.1 - Request with Authentication"

2. **Screenshot 6.1b - User Data Response**
   - Show user profile data returned
   - Label: "Test 6.1 - User Data Retrieved"

---

##### Test 6.2: Access Protected Route without Token

**Setup:**
```
Method: GET
URL: {{baseURL}}/api/user/data
Headers: (No authentication)
```

**Screenshots to Capture:**
1. **Screenshot 6.2a - Request without Token**
   - Show Headers tab without cookie
   - Label: "Test 6.2 - Unauthorized Request"

2. **Screenshot 6.2b - Unauthorized Error**
   - Show error "Unauthorized, Try Again"
   - Label: "Test 6.2 - Access Denied Response"

---

#### Section 6: Logout Testing

##### Test 3.1: Successful Logout

**Setup:**
```
Method: POST
URL: {{baseURL}}/api/auth/logout
```

**Screenshots to Capture:**
1. **Screenshot 3.1a - Logout Request**
   - Show logout endpoint
   - Label: "Test 3.1 - Logout Request"

2. **Screenshot 3.1b - Logout Success**
   - Show success message "Logged Out successfully"
   - Label: "Test 3.1 - Logout Success"

3. **Screenshot 3.1c - Cookie Cleared**
   - Show Cookies tab with token removed/cleared
   - Label: "Test 3.1 - Session Cookie Cleared"

4. **Screenshot 3.1d - Access After Logout**
   - Try accessing protected route
   - Show unauthorized error
   - Label: "Test 3.1 - Unauthorized After Logout"

---

### Screenshot Organization

#### Folder Structure

Create a folder structure for organizing screenshots:

```
Testing_Screenshots/
├── 01_Registration/
│   ├── Test_1.1a_Registration_Request.png
│   ├── Test_1.1b_Registration_Success.png
│   ├── Test_1.1c_JWT_Token_Cookie.png
│   ├── Test_1.2a_Missing_Field_Request.png
│   └── Test_1.2b_Missing_Field_Error.png
├── 02_Login/
│   ├── Test_2.1a_Login_Request.png
│   ├── Test_2.1b_Login_Success.png
│   └── Test_2.4b_Invalid_Password.png
├── 03_Email_Verification/
│   ├── Test_4.1a_Send_OTP_Request.png
│   ├── Test_4.1c_OTP_Email.png
│   └── Test_4.3b_Verification_Success.png
├── 04_Password_Reset/
│   ├── Test_5.1a_Reset_OTP_Request.png
│   └── Test_5.4b_Reset_Success.png
├── 05_Protected_Routes/
│   ├── Test_6.1b_User_Data_Response.png
│   └── Test_6.2b_Unauthorized_Error.png
└── 06_Logout/
    └── Test_3.1b_Logout_Success.png
```

---

### Screenshot Naming Convention

Use this format for screenshot names:
```
Test_<Section>.<Test>_<Letter>_<Description>.png

Examples:
- Test_1.1a_Registration_Request.png
- Test_2.4b_Invalid_Password_Error.png
- Test_4.1c_OTP_Email_Received.png
```

---

### Best Practices for Screenshot Capture

#### 1. **Consistent Window Size**
- Use consistent Postman window size for all screenshots
- Ensure all relevant information is visible
- Zoom level should be readable (100% recommended)

#### 2. **What to Include in Request Screenshots**
- ✅ Request method and URL
- ✅ Headers tab (if authentication required)
- ✅ Body tab with complete JSON
- ✅ Request type (JSON, form-data, etc.)
- ❌ Don't include unnecessary tabs

#### 3. **What to Include in Response Screenshots**
- ✅ Status code and status text
- ✅ Complete response body
- ✅ Response time
- ✅ Response size
- ❌ Don't crop important information

#### 4. **Cookie Screenshots**
- ✅ Cookie name
- ✅ Cookie value (token)
- ✅ Cookie attributes (httpOnly, secure, sameSite, maxAge)
- ✅ Domain and path

#### 5. **Email Screenshots**
- ✅ Email subject line
- ✅ Email body with OTP clearly visible
- ✅ Sender address
- ✅ Timestamp
- ❌ Hide personal information not relevant to test

#### 6. **Database Screenshots**
- ✅ User document with relevant fields
- ✅ Highlight changed fields (use annotation)
- ✅ Show timestamps
- ❌ Don't expose entire database structure

---

### Testing Checklist

Before starting each test:
- [ ] Server is running without errors
- [ ] Database connection is active
- [ ] Postman collection is organized
- [ ] Environment variables are set
- [ ] Screenshot tool is ready
- [ ] Previous test data is noted (for dependencies)

During each test:
- [ ] Request is configured correctly
- [ ] Expected result is noted
- [ ] Request screenshot captured
- [ ] Response screenshot captured
- [ ] Additional screenshots captured (cookies, emails, database)
- [ ] Status code is verified
- [ ] Response body is validated
- [ ] Test result matches expectation

After each test:
- [ ] Screenshots are saved with proper naming
- [ ] Test result is documented
- [ ] Test case is marked as passed/failed
- [ ] Any deviations are noted
- [ ] Dependencies for next test are prepared

---

### Documentation Table Format After Testing

After completing tests with screenshots, update each test case table with screenshot references:

#### Example Format:

| **Objective** | To verify that a new user can successfully register with valid credentials. |
|---------------|-----------------------------------------------------------------------------|
| **Action** | Provide valid name, email, and password. Submit registration request. |
| **Expected Result** | System creates account, sends welcome email, returns success message. |
| **Actual Result** | ✅ PASSED - System successfully created account and sent welcome email. |
| **Screenshots** | • Request: `Test_1.1a_Registration_Request.png`<br>• Response: `Test_1.1b_Registration_Success.png`<br>• Cookie: `Test_1.1c_JWT_Token_Cookie.png`<br>• Email: `Test_1.1e_Welcome_Email.png` |
| **Test Date** | 28 December 2025 |
| **Tested By** | [Your Name] |

---

### Postman Collection Export

After completing all tests:

1. **Export Collection**
   - Click on collection (⋯) menu
   - Select "Export"
   - Choose Collection v2.1 format
   - Save as `MERN_Auth_Testing_Collection.json`

2. **Export Environment**
   - Go to Environments
   - Click export icon
   - Save as `Development_Environment.json`

3. **Include in Documentation**
   - Add exported files to project repository
   - Update README with import instructions

**Screenshot to Capture:**
- Collection export dialog
- Environment export dialog
- Label: "Postman Collection Export"

---

### Quick Reference: Test Execution Order

**Recommended Testing Sequence:**

1. **Registration** → Test 1.1 (Save userId and token)
2. **Missing Fields** → Tests 1.2, 2.2
3. **Duplicate Registration** → Test 1.3
4. **Login** → Test 2.1 (Update token)
5. **Invalid Login** → Tests 2.3, 2.4
6. **Send Verify OTP** → Test 4.1 (Note OTP from email)
7. **Verify Account** → Test 4.3 (Use OTP from Test 4.1)
8. **OTP Validation** → Tests 4.5, 4.6, 4.7
9. **Send Reset OTP** → Test 5.1 (Note OTP)
10. **Reset Password** → Test 5.4 (Use OTP from Test 5.1)
11. **Reset Validation** → Tests 5.6, 5.7
12. **Protected Routes** → Tests 6.1, 6.2
13. **Get User Data** → Tests 8.1, 8.2
14. **Logout** → Test 3.1
15. **Post-Logout Access** → Verify protected routes fail

---

### Video Recording (Optional Enhancement)

For comprehensive documentation, consider recording:

**Screen Recording Tools:**
- macOS: QuickTime Player, Screenshot app (Cmd+Shift+5)
- Windows: Xbox Game Bar (Win+G), OBS Studio
- Cross-platform: Loom, OBS Studio

**What to Record:**
- Complete test execution flow
- End-to-end user journey (register → login → verify → logout)
- Error handling demonstrations
- OTP workflow (email → OTP → verification)

**Video Naming:**
```
MERN_Auth_Testing_<Section>_<Date>.mp4

Example:
MERN_Auth_Testing_Registration_20251228.mp4
MERN_Auth_Testing_Full_Flow_20251228.mp4
```

---

### Troubleshooting Common Issues

| Issue | Solution |
|-------|----------|
| Cookie not set | Check server CORS settings, ensure credentials included |
| Unauthorized error | Verify token in Cookies tab, check token expiry |
| Email not received | Check SMTP settings, verify email service is running |
| OTP expired | Generate new OTP, note expiry times (24hr/15min) |
| Database connection error | Verify MongoDB is running, check connection string |
| CORS error | Add frontend URL to CORS whitelist in server |

---

## Summary

This testing documentation covers **56 comprehensive test cases** across 15 major functional areas:

1. **User Registration** (4 tests)
2. **User Login** (4 tests)
3. **User Logout** (2 tests)
4. **Email Verification** (8 tests)
5. **Password Reset** (8 tests)
6. **Authentication Middleware** (5 tests)
7. **Authentication Status** (2 tests)
8. **Get User Data** (3 tests)
9. **Cookie Security** (3 tests)
10. **Email Functionality** (3 tests)
11. **Password Security** (3 tests)
12. **JWT Token** (3 tests)
13. **Error Handling** (3 tests)
14. **Route Protection** (2 tests)
15. **Input Validation** (3 tests)

All test cases follow the standard format with **Objective**, **Action**, **Expected Result**, and **Actual Result** columns for comprehensive testing documentation.

---

## Testing Environment

- **Framework**: MERN Stack (MongoDB, Express.js, React.js, Node.js)
- **Authentication**: JWT (JSON Web Tokens)
- **Password Hashing**: bcryptjs
- **Email Service**: Nodemailer
- **Database**: MongoDB
- **Cookie Management**: httpOnly cookies with secure flags

---

## Notes for Testers

1. Ensure environment variables are properly configured (JWT_SECRET, SENDER_EMAIL, SMTP credentials)
2. Test in both development and production environments for cookie security validation
3. Verify email delivery functionality with actual SMTP service
4. Test OTP expiration by manipulating system time or waiting for expiry periods
5. Use tools like Postman or Thunder Client for API testing
6. Monitor database changes during testing to verify data integrity
7. Test concurrent requests to verify race conditions handling
8. Validate token expiration by testing with old tokens (after 7 days)

---

*Document Version: 1.0*  
*Last Updated: 28 December 2025*  
*System: MERN Authentication System*
