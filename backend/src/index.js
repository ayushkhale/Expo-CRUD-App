require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const taskRoutes = require('./routes/tasks');
const User = require('./models/User');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/taskflow', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(async () => {
  console.log('Connected to MongoDB');
  
  // Drop the users collection to fix index issues
  try {
    await mongoose.connection.collection('users').drop();
    console.log('Users collection dropped successfully');
  } catch (error) {
    if (error.code !== 26) { // Ignore error if collection doesn't exist
      console.error('Error dropping users collection:', error);
    }
  }
  
  // Create test user if it doesn't exist
  const testUser = await User.findOne({ email: 'test@example.com' });
  if (!testUser) {
    await User.create({
      name: 'Test User',
      email: 'test@example.com',
      password: 'password'
    });
    console.log('Test user created');
  }
})
.catch((err) => console.error('MongoDB connection error:', err));

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
}); 