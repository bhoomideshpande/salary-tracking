const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
const mongoURI =
  process.env.MONGODB_URI || 'mongodb://localhost:27017/salary_tracker';

mongoose
  .connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('✓ MongoDB connected successfully');
  })
  .catch((err) => {
    console.error('✗ MongoDB connection error:', err.message);
    process.exit(1);
  });

// Routes
const salaryRoutes = require('./routes/salaryRoutes');
app.use('/api', salaryRoutes);

// Basic health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Server is running',
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Endpoint not found',
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err.message);
  res.status(500).json({
    success: false,
    message: 'Internal server error',
    error: err.message,
  });
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✓ Server is running on http://localhost:${PORT}`);
  console.log(`✓ MongoDB connected to: ${mongoURI}`);
});
