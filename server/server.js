const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/products', require('./routes/productRoutes'));

// Health check route
app.get('/api/health', (req, res) => {
  res.json({ success: true, message: 'Server is running!' });
});

// Connect to MongoDB
const connectDB = async () => {
  try {
    // Get MongoDB connection string from environment variable
    const mongoURI = process.env.DBURL || process.env.MONGO_URI || 'mongodb://localhost:27017/auth-app';
    
    // Validate connection string
    if (!mongoURI || mongoURI.trim() === '' || mongoURI === 'your_mongodb_compass_connection_string') {
      console.error('❌ MongoDB Connection Error: Please set DBURL or MONGO_URI in your .env file');
      console.error('   Example: DBURL=mongodb://localhost:27017/auth-app');
      console.error('   Or for MongoDB Atlas: DBURL=mongodb+srv://username:password@cluster.mongodb.net/auth-app');
      process.exit(1);
    }

    console.log('🔄 Attempting to connect to MongoDB...');
    await mongoose.connect(mongoURI, {
      // MongoDB connection options
    });
    console.log('✅ MongoDB Connected Successfully');
  } catch (error) {
    console.error('❌ MongoDB Connection Error:', error.message);
    console.error('\n📝 Connection Troubleshooting:');
    console.error('   1. Make sure MongoDB is running (if using local MongoDB)');
    console.error('   2. Check your .env file has correct DBURL or MONGO_URI');
    console.error('   3. For MongoDB Atlas, verify your connection string format');
    console.error('   4. Ensure your IP is whitelisted (for MongoDB Atlas)');
    process.exit(1);
  }
};

// Start server
const PORT = process.env.PORT || 5000;

const startServer = async () => {
  await connectDB();
  app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
    console.log(`📍 Environment: ${process.env.NODE_ENV || 'development'}`);
  });
};

startServer();

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  console.error('❌ Unhandled Rejection:', err.message);
  // Close server & exit process
  // server.close(() => process.exit(1));
});
