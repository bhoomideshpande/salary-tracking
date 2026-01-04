const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5002;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/salary_tracker';

mongoose
  .connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('✓ MongoDB connected successfully');
    console.log(`✓ MongoDB connected to: ${MONGODB_URI}`);
  })
  .catch((err) => {
    console.error('❌ MongoDB connection error:', err.message);
  });

// Routes
const salaryRoutes = require('./routes/salaryRoutes');
app.use('/api', salaryRoutes);

// Health Check Endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ success: true, message: 'Server is running' });
});

// Start Server
const server = app.listen(PORT, () => {
  console.log(`✓ Server is running on http://localhost:${PORT}`);
});

server.on('error', (err) => {
  console.error('❌ Server failed to start:', err.message);
});
