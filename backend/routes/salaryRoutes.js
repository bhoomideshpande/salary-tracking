const express = require('express');
const Salary = require('../models/Salary');

const router = express.Router();

/**
 * POST /addSalary
 * Accepts employee ID, total salary, advance amount, and payment date.
 * Calculates the remaining salary and updates the payment status.
 * Returns a confirmation message.
 */
router.post('/addSalary', async (req, res) => {
  try {
    // Extract data from request body
    const {
      employeeId,
      employeeName,
      month,
      year,
      totalMonthlySalary,
      advanceAmountPaid,
      paymentDate,
    } = req.body;

    // Validation: Check if all required fields are provided
    if (
      !employeeId ||
      !employeeName ||
      !month ||
      !year ||
      totalMonthlySalary === undefined ||
      advanceAmountPaid === undefined ||
      !paymentDate
    ) {
      return res.status(400).json({
        success: false,
        message:
          'All fields are required: employeeId, employeeName, month, year, totalMonthlySalary, advanceAmountPaid, paymentDate',
      });
    }

    // Validation: Check if advance amount does not exceed total salary
    if (advanceAmountPaid > totalMonthlySalary) {
      return res.status(400).json({
        success: false,
        message:
          'Advance amount cannot exceed total monthly salary',
      });
    }

    // Calculate remaining salary payable
    const remainingSalaryPayable =
      totalMonthlySalary - advanceAmountPaid;

    // Determine payment status
    let paymentStatus = 'Pending';
    if (advanceAmountPaid > 0 && remainingSalaryPayable > 0) {
      paymentStatus = 'Partially Paid';
    } else if (advanceAmountPaid === totalMonthlySalary) {
      paymentStatus = 'Paid';
    }

    // Create new salary record
    const newSalary = new Salary({
      employeeId,
      employeeName,
      month,
      year,
      totalMonthlySalary,
      advanceAmountPaid,
      remainingSalaryPayable,
      paymentDate,
      paymentStatus,
    });

    // Save the salary record to the database
    const savedSalary = await newSalary.save();

    // Return success response with the created salary record
    return res.status(201).json({
      success: true,
      message: 'Salary record created successfully',
      data: savedSalary,
    });
  } catch (error) {
    console.error('Error in /addSalary endpoint:', error.message);
    return res.status(500).json({
      success: false,
      message: 'Server error. Please try again later.',
      error: error.message,
    });
  }
});

/**
 * GET /salary/:employeeId
 * Retrieves salary records for a specific employee
 */
router.get('/salary/:employeeId', async (req, res) => {
  try {
    const { employeeId } = req.params;

    const salaryRecords = await Salary.find({ employeeId }).sort({
      year: -1,
      month: -1,
    });

    if (salaryRecords.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'No salary records found for this employee',
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Salary records retrieved successfully',
      data: salaryRecords,
    });
  } catch (error) {
    console.error('Error in GET /salary/:employeeId:', error.message);
    return res.status(500).json({
      success: false,
      message: 'Server error. Please try again later.',
      error: error.message,
    });
  }
});

/**
 * GET /allSalaries
 * Retrieves all salary records
 */
router.get('/allSalaries', async (req, res) => {
  try {
    const salaries = await Salary.find().sort({
      year: -1,
      month: -1,
      createdAt: -1,
    });

    return res.status(200).json({
      success: true,
      message: 'All salary records retrieved successfully',
      count: salaries.length,
      data: salaries,
    });
  } catch (error) {
    console.error('Error in GET /allSalaries:', error.message);
    return res.status(500).json({
      success: false,
      message: 'Server error. Please try again later.',
      error: error.message,
    });
  }
});

module.exports = router;
