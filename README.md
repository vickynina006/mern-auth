# MERN Authentication System

A full-stack authentication system built with the MERN stack (MongoDB, Express.js, React, Node.js) featuring email verification, password reset, OTP functionality, and secure user management.

## Features

- **User Registration & Login**: Secure user authentication with JWT tokens
- **Email Verification**: OTP-based email verification for new accounts
- **Password Reset**: Secure password reset via email OTP
- **Session Management**: Cookie-based authentication with logout functionality
- **Responsive UI**: Modern, mobile-friendly interface built with React and Tailwind CSS
- **Form Validation**: Client-side validation using React Hook Form and Zod
- **Toast Notifications**: User-friendly feedback with React Toastify
- **CORS Support**: Configured for cross-origin requests

## Tech Stack

### Frontend

- **React 19** - UI library
- **Vite** - Build tool and dev server
- **React Router DOM** - Client-side routing
- **Tailwind CSS** - Utility-first CSS framework
- **React Hook Form** - Form handling
- **Zod** - Schema validation
- **Axios** - HTTP client
- **React Toastify** - Toast notifications

### Backend

- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - ODM for MongoDB
- **JWT** - JSON Web Tokens for authentication
- **bcryptjs** - Password hashing
- **Nodemailer** - Email sending
- **Zod** - Schema validation

## Prerequisites

- Node.js (v16 or higher)
- MongoDB (local or cloud instance)
- npm or yarn package manager

## Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd mern-auth
   ```

2. **Install server dependencies**

   ```bash
   cd server
   npm install
   ```

3. **Install client dependencies**

   ```bash
   cd ../client
   npm install
   ```

4. **Environment Setup**

   Create a `.env` file in the `server` directory with the following variables:

   ```env
   PORT=4000
   MONGODB_URI=mongodb://localhost:27017/mern-auth
   JWT_SECRET=your-super-secret-jwt-key
   EMAIL_USER=your-email@gmail.com
   EMAIL_PASS=your-app-password
   ```

5. **Start MongoDB**
   Make sure MongoDB is running on your system.

## Running the Application

1. **Start the backend server**

   ```bash
   cd server
   npm run dev
   ```

   The server will start on `http://localhost:4000`

2. **Start the frontend client**

   ```bash
   cd client
   npm run dev
   ```

   The client will start on `http://localhost:5173`

3. **Access the application**
   Open your browser and navigate to `http://localhost:5173`

## Email Configuration

The application uses Nodemailer for sending emails. Configure your email service in the `.env` file:

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request
