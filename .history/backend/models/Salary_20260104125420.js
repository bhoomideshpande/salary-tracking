const mongoose = require('mongoose');

// MongoDB Schema for Salary Records
const salarySchema = new mongoose.Schema(
  {
    employeeId: {
      type: String,
      required: true,
      trim: true,
    },
    employeeName: {
      type: String,
      required: true,
      trim: true,
    },
    month: {
      type: Number,
      required: true,
      min: 1,
      max: 12,
    },
    year: {
      type: Number,
      required: true,
      min: 2000,
    },
    totalMonthlySalary: {
      type: Number,
      required: true,
      min: 0,
    },
    advanceAmountPaid: {
      type: Number,
      required: true,
      min: 0,
      default: 0,
    },
    remainingSalaryPayable: {
      type: Number,
      required: true,
      min: 0,
    },
    paymentDate: {
      type: Date,
      required: true,
    },
    paymentStatus: {
      type: String,
      enum: ['Pending', 'Partially Paid', 'Paid'],
      default: 'Pending',
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);

// Create and export the Salary model
const Salary = mongoose.model('Salary', salarySchema);
module.exports = Salary;
