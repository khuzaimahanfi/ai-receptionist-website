import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import apiRoutes from './routes/api.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// MongoDB connection
const connectDB = async () => {
  try {
    if (process.env.MONGODB_URI) {
      await mongoose.connect(process.env.MONGODB_URI);
      console.log('MongoDB connected successfully');
    } else {
      console.log('MongoDB URI not provided, running without database');
    }
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

// Routes
app.use('/api', apiRoutes);

// Basic route
app.get('/', (req, res) => {
  res.json({ 
    message: 'AI Receptionist API is running!',
    version: '1.0.0',
    endpoints: [
      'GET /api/health',
      'POST /api/chat',
      'GET /api/conversations',
      'POST /api/query'
    ]
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    error: 'Something went wrong!',
    message: err.message 
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ 
    error: 'Route not found',
    path: req.originalUrl 
  });
});

// Connect to database and start server
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    console.log(`API documentation available at http://localhost:${PORT}`);
  });
});

export default app;