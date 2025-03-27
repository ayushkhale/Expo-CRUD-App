# TaskFlow - Full Stack Task Manager App

A modern task management application built with React Native and Node.js.

## Features

- User Authentication (Signup/Login)
- Create, Read, Update, and Delete Tasks
- Dark Theme UI
- Real-time Updates
- Secure API with JWT Authentication
- MongoDB Database

## Tech Stack

### Frontend
- React Native
- Redux Toolkit for State Management
- React Native Paper for UI Components
- Expo Router for Navigation

### Backend
- Node.js with Express
- MongoDB with Mongoose
- JWT for Authentication
- RESTful API Architecture

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB
- Expo CLI
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/taskflow.git
cd taskflow
```

2. Install Frontend Dependencies:
```bash
cd frontend
npm install
```

3. Install Backend Dependencies:
```bash
cd ../backend
npm install
```

4. Set up environment variables:
Create a `.env` file in the backend directory:
```
PORT=5000
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
```

### Running the Application

1. Start the Backend Server:
```bash
cd backend
npm start
```

2. Start the Frontend App:
```bash
cd frontend
npm start
```

3. Run on your device:
- Scan the QR code with Expo Go app
- Or press 'a' to run on Android emulator
- Or press 'i' to run on iOS simulator

## API Endpoints

### Authentication
- POST /api/auth/register - Register a new user
- POST /api/auth/login - Login user
- POST /api/auth/logout - Logout user

### Tasks
- GET /api/tasks - Get all tasks
- POST /api/tasks - Create a new task
- GET /api/tasks/:id - Get a single task
- PUT /api/tasks/:id - Update a task
- DELETE /api/tasks/:id - Delete a task

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
