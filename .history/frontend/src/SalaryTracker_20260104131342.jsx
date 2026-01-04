import React, { useState, useEffect } from 'react';
import './SalaryTracker.css';

/**
 * SalaryTracker Component
 * Displays employee salary details and manages advance payments
 * Features:
 * - Display salary records in a table
 * - Add new salary records
 * - Automatically calculates remaining salary
 * - Shows payment status (Pending, Partially Paid, Paid)
 */
const SalaryTracker = () => {
  // State for salary records
  const [salaries, setSalaries] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // State for form inputs
  const [formData, setFormData] = useState({
    employeeId: '',
    employeeName: '',
    month: new Date().getMonth() + 1,
    year: new Date().getFullYear(),
    totalMonthlySalary: '',
    advanceAmountPaid: '',
    paymentDate: new Date().toISOString().split('T')[0],
  });

  // Fetch salary records on component mount
  useEffect(() => {
    fetchSalaries();
  }, []);

  /**
   * Fetch all salary records from the backend
   */
  const fetchSalaries = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await fetch('http://localhost:5000/api/allSalaries');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const result = await response.json();

      if (result.success) {
        setSalaries(result.data);
      } else {
        setError(result.message || 'Failed to fetch salary records');
      }
    } catch (err) {
      setError('Cannot connect to backend server on port 5000. Make sure backend is running: cd backend && npm start');
    } finally {
      setLoading(false);
    }
  };

  /**
   * Handle input change in the form
   */
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        name === 'totalMonthlySalary' ||
        name === 'advanceAmountPaid' ||
        name === 'month' ||
        name === 'year'
          ? Number(value)
          : value,
    }));
  };

  /**
   * Calculate remaining salary (auto-update)
   */
  const calculateRemaining = () => {
    const totalSalary = Number(formData.totalMonthlySalary) || 0;
    const advanceAmount = Number(formData.advanceAmountPaid) || 0;
    return Math.max(0, totalSalary - advanceAmount);
  };

  /**
   * Determine payment status based on amounts
   */
  const determinePaymentStatus = () => {
    const totalSalary = Number(formData.totalMonthlySalary) || 0;
    const advanceAmount = Number(formData.advanceAmountPaid) || 0;

    if (advanceAmount === 0) return 'Pending';
    if (advanceAmount === totalSalary) return 'Paid';
    return 'Partially Paid';
  };

  /**
   * Submit form to add new salary record
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    // Validation
    if (!formData.employeeId.trim()) {
      setError('Employee ID is required');
      return;
    }
    if (!formData.employeeName.trim()) {
      setError('Employee Name is required');
      return;
    }
    if (formData.totalMonthlySalary <= 0) {
      setError('Total Monthly Salary must be greater than 0');
      return;
    }
    if (formData.advanceAmountPaid > formData.totalMonthlySalary) {
      setError('Advance amount cannot exceed total monthly salary');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('http://localhost:5000/api/addSalary', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          paymentDate: new Date(formData.paymentDate),
        }),
      });

      const result = await response.json();

      if (result.success) {
        setSuccess('Salary record added successfully!');
        // Reset form
        setFormData({
          employeeId: '',
          employeeName: '',
          month: new Date().getMonth() + 1,
          year: new Date().getFullYear(),
          totalMonthlySalary: '',
          advanceAmountPaid: '',
          paymentDate: new Date().toISOString().split('T')[0],
        });
        // Refresh salary list
        fetchSalaries();
      } else {
        setError(result.message || 'Failed to add salary record');
      }
    } catch (err) {
      setError('Error: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Format currency for display
   */
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  /**
   * Format date for display
   */
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  /**
   * Get color class based on payment status
   */
  const getStatusClass = (status) => {
    switch (status) {
      case 'Paid':
        return 'status-paid';
      case 'Partially Paid':
        return 'status-partial';
      case 'Pending':
      default:
        return 'status-pending';
    }
  };

  return (
    <div className="salary-tracker-container">
      <header className="header">
        <h1>💰 Salary Tracker Management System</h1>
        <p>Track monthly salaries, advance payments, and settlements</p>
      </header>

      <main className="main-content">
        {/* Form Section */}
        <section className="form-section">
          <h2>Add New Salary Record</h2>
          {error && <div className="alert alert-error">{error}</div>}
          {success && <div className="alert alert-success">{success}</div>}

          <form onSubmit={handleSubmit} className="salary-form">
            <div className="form-grid">
              <div className="form-group">
                <label htmlFor="employeeId">Employee ID *</label>
                <input
                  type="text"
                  id="employeeId"
                  name="employeeId"
                  value={formData.employeeId}
                  onChange={handleInputChange}
                  placeholder="EMP001"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="employeeName">Employee Name *</label>
                <input
                  type="text"
                  id="employeeName"
                  name="employeeName"
                  value={formData.employeeName}
                  onChange={handleInputChange}
                  placeholder="John Doe"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="month">Month *</label>
                <select
                  id="month"
                  name="month"
                  value={formData.month}
                  onChange={handleInputChange}
                  required
                >
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((m) => (
                    <option key={m} value={m}>
                      {new Date(2024, m - 1).toLocaleDateString('en-US', {
                        month: 'long',
                      })}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="year">Year *</label>
                <input
                  type="number"
                  id="year"
                  name="year"
                  value={formData.year}
                  onChange={handleInputChange}
                  min="2020"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="totalMonthlySalary">
                  Total Monthly Salary *
                </label>
                <input
                  type="number"
                  id="totalMonthlySalary"
                  name="totalMonthlySalary"
                  value={formData.totalMonthlySalary}
                  onChange={handleInputChange}
                  placeholder="50000"
                  min="0"
                  step="0.01"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="advanceAmountPaid">Advance Amount Paid</label>
                <input
                  type="number"
                  id="advanceAmountPaid"
                  name="advanceAmountPaid"
                  value={formData.advanceAmountPaid}
                  onChange={handleInputChange}
                  placeholder="0"
                  min="0"
                  step="0.01"
                />
              </div>

              <div className="form-group">
                <label htmlFor="paymentDate">Payment Date *</label>
                <input
                  type="date"
                  id="paymentDate"
                  name="paymentDate"
                  value={formData.paymentDate}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>

            {/* Calculated fields display */}
            <div className="calculated-section">
              <div className="calc-item">
                <span className="calc-label">Remaining Salary:</span>
                <span className="calc-value">
                  {formatCurrency(calculateRemaining())}
                </span>
              </div>
              <div className="calc-item">
                <span className="calc-label">Payment Status:</span>
                <span
                  className={`calc-value ${determinePaymentStatus().toLowerCase()}`}
                >
                  {determinePaymentStatus()}
                </span>
              </div>
            </div>

            <button type="submit" className="btn-submit" disabled={loading}>
              {loading ? 'Adding...' : 'Add Salary Record'}
            </button>
          </form>
        </section>

        {/* Salary Records Table */}
        <section className="table-section">
          <h2>Salary Records</h2>

          {loading && <p className="loading">Loading...</p>}

          {salaries.length === 0 && !loading ? (
            <p className="no-data">No salary records found</p>
          ) : (
            <div className="table-wrapper">
              <table className="salary-table">
                <thead>
                  <tr>
                    <th>Employee ID</th>
                    <th>Name</th>
                    <th>Month/Year</th>
                    <th>Total Salary</th>
                    <th>Advance Paid</th>
                    <th>Remaining</th>
                    <th>Payment Date</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {salaries.map((salary) => (
                    <tr key={salary._id}>
                      <td>{salary.employeeId}</td>
                      <td>{salary.employeeName}</td>
                      <td>
                        {new Date(2024, salary.month - 1).toLocaleDateString(
                          'en-US',
                          { month: 'short' }
                        )}{' '}
                        {salary.year}
                      </td>
                      <td>{formatCurrency(salary.totalMonthlySalary)}</td>
                      <td>{formatCurrency(salary.advanceAmountPaid)}</td>
                      <td className="remaining">
                        {formatCurrency(salary.remainingSalaryPayable)}
                      </td>
                      <td>{formatDate(salary.paymentDate)}</td>
                      <td>
                        <span className={`status ${getStatusClass(salary.paymentStatus)}`}>
                          {salary.paymentStatus}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </main>
    </div>
  );
};

export default SalaryTracker;
