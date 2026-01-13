# GHUMMGHAMM Travel Agency - Frontend

Beautiful and responsive travel agency website built with React, Vite, and modern UI design.

## 🚀 Features

### User Features
- **Authentication**: Register, Login with JWT authentication
- **Browse Packages**: Filter by category, destination, price
- **Package Details**: View detailed information, itinerary, reviews
- **Book Packages**: Select dates, travelers, calculate pricing
- **Manual Payments**: Multiple payment methods (UPI, Cards, Net Banking)
- **My Bookings**: View all bookings with status tracking
- **Profile Management**: Update profile information and password
- **Submit Feedback**: Write reviews for completed trips

### Admin Features
- **Dashboard**: Overview statistics and recent activities
- **Manage Users**: View, edit, delete users, change roles
- **Manage Packages**: Create, edit, delete travel packages
- **Manage Bookings**: Update booking statuses
- **Verify Payments**: Manual payment verification system

## 🛠️ Tech Stack

- **React 19.1.1**: Modern UI library
- **Vite 7.1.0**: Lightning-fast build tool
- **React Router DOM**: Client-side routing
- **Axios**: HTTP client for API calls
- **React Icons**: Beautiful icon library
- **CSS3**: Custom responsive styling

## 📁 Project Structure

```
src/
├── assets/          # Static assets
├── components/      # Reusable components
│   ├── Navbar.jsx
│   ├── Footer.jsx
│   ├── ProtectedRoute.jsx
│   └── AdminRoute.jsx
├── config/          # Configuration files
│   └── api.js       # API service layer
├── context/         # React context providers
│   └── AuthContext.jsx
├── pages/           # Page components
│   ├── Home.jsx
│   ├── Register.jsx
│   ├── Login.jsx
│   ├── Packages.jsx
│   ├── PackageDetails.jsx
│   ├── BookPackage.jsx
│   ├── Payment.jsx
│   ├── MyBookings.jsx
│   ├── Profile.jsx
│   ├── SubmitFeedback.jsx
│   └── admin/       # Admin pages
│       ├── AdminDashboard.jsx
│       ├── ManageUsers.jsx
│       ├── ManagePackages.jsx
│       ├── ManageBookings.jsx
│       └── ManagePayments.jsx
├── App.jsx          # Main app component
├── App.css          # Global styles
├── main.jsx         # Entry point
└── index.css        # Base styles
```

## 🎨 Design Features

- **Responsive Design**: Mobile-first approach
- **Modern UI**: Clean and professional travel agency theme
- **Smooth Animations**: Transitions and hover effects
- **Intuitive Navigation**: Easy-to-use interface
- **Status Indicators**: Visual feedback for all actions
- **Card-Based Layout**: Organized information display

## 🔗 API Integration

All API calls are centralized in `/src/config/api.js`:
- Authentication APIs
- Package management APIs
- Booking APIs
- Payment APIs
- Feedback APIs
- Admin APIs

## 🔐 Route Protection

- **Public Routes**: Home, Packages, Package Details, Login, Register
- **Protected Routes**: Booking, Payment, My Bookings, Profile, Feedback
- **Admin Routes**: All admin dashboard pages

## 🚀 Getting Started

### Prerequisites
- Node.js 14+ installed
- Backend server running on http://localhost:4000

### Installation

1. Navigate to client directory:
```bash
cd client/client
```

2. Install dependencies:
```bash
npm install
```

3. Start development server:
```bash
npm run dev
```

4. Open browser at http://localhost:5173

### Build for Production

```bash
npm run build
```

## 📱 Responsive Breakpoints

- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

## 🎯 Key Components

### AuthContext
- Global authentication state management
- Login, register, logout functions
- User data persistence

### API Service
- Centralized API endpoint configuration
- Axios instance with credentials
- Error handling

### Route Guards
- ProtectedRoute: Requires authentication
- AdminRoute: Requires admin role

## 📝 Available Routes

### Public
- `/` - Home page
- `/register` - User registration
- `/login` - User login
- `/packages` - Browse packages
- `/packages/:id` - Package details

### User (Protected)
- `/book/:id` - Book package
- `/payment/:bookingId` - Payment page
- `/bookings` - My bookings
- `/profile` - User profile
- `/feedback/:bookingId` - Submit feedback

### Admin (Protected)
- `/admin` - Dashboard
- `/admin/users` - Manage users
- `/admin/packages` - Manage packages
- `/admin/bookings` - Manage bookings
- `/admin/payments` - Verify payments

## 🎨 Color Scheme

```css
Primary: #2563eb (Blue)
Secondary: #10b981 (Green)
Danger: #ef4444 (Red)
Warning: #f59e0b (Orange)
Dark: #1f2937
Light: #f9fafb
```

## 📦 Dependencies

```json
{
  "react": "^19.1.0",
  "react-dom": "^19.1.0",
  "react-router-dom": "^7.1.3",
  "axios": "^1.7.9",
  "react-icons": "^5.4.0"
}
```

## 🔧 Configuration

Update API base URL in `/src/config/api.js`:
```javascript
baseURL: 'http://localhost:4000/api'
```

## 📄 License

This project is part of GHUMMGHAMM Travel Agency system.

## 👨‍💻 Developer Notes

- All forms include validation
- Error handling with user-friendly messages
- Loading states for better UX
- Optimistic UI updates
- Manual payment system (gateway integration pending)
