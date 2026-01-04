import React from 'react';

/**
 * Example Component showing how to use the salary data
 * This demonstrates how to work with salary records in a React component
 */

// Sample salary data structure
const sampleSalaryData = [
  {
    _id: '1',
    employeeId: 'EMP001',
    employeeName: 'John Doe',
    month: 1,
    year: 2024,
    totalMonthlySalary: 50000,
    advanceAmountPaid: 20000,
    remainingSalaryPayable: 30000,
    paymentDate: '2024-01-15T00:00:00Z',
    paymentStatus: 'Partially Paid',
  },
  {
    _id: '2',
    employeeId: 'EMP002',
    employeeName: 'Jane Smith',
    month: 1,
    year: 2024,
    totalMonthlySalary: 60000,
    advanceAmountPaid: 0,
    remainingSalaryPayable: 60000,
    paymentDate: '2024-01-20T00:00:00Z',
    paymentStatus: 'Pending',
  },
  {
    _id: '3',
    employeeId: 'EMP003',
    employeeName: 'Bob Johnson',
    month: 1,
    year: 2024,
    totalMonthlySalary: 45000,
    advanceAmountPaid: 45000,
    remainingSalaryPayable: 0,
    paymentDate: '2024-01-10T00:00:00Z',
    paymentStatus: 'Paid',
  },
];

/**
 * Example Component 1: Display salary records in a simple format
 */
const SimpleSalaryList = () => {
  return (
    <div>
      <h2>Employee Salaries</h2>
      {sampleSalaryData.map((salary) => (
        <div key={salary._id} style={{ marginBottom: '20px', border: '1px solid #ddd', padding: '10px' }}>
          <p><strong>Employee:</strong> {salary.employeeName} ({salary.employeeId})</p>
          <p><strong>Month:</strong> {salary.month}/{salary.year}</p>
          <p><strong>Total Salary:</strong> ${salary.totalMonthlySalary.toLocaleString()}</p>
          <p><strong>Advance Paid:</strong> ${salary.advanceAmountPaid.toLocaleString()}</p>
          <p><strong>Remaining:</strong> ${salary.remainingSalaryPayable.toLocaleString()}</p>
          <p><strong>Status:</strong> <span style={{
            backgroundColor: salary.paymentStatus === 'Paid' ? '#90EE90' : 
                            salary.paymentStatus === 'Partially Paid' ? '#FFD700' : '#FFB6C6',
            padding: '5px 10px',
            borderRadius: '5px'
          }}>{salary.paymentStatus}</span></p>
        </div>
      ))}
    </div>
  );
};

/**
 * Example Component 2: Calculate total payments
 */
const SalaryStatistics = () => {
  const totalSalaries = sampleSalaryData.reduce((sum, salary) => sum + salary.totalMonthlySalary, 0);
  const totalAdvancePaid = sampleSalaryData.reduce((sum, salary) => sum + salary.advanceAmountPaid, 0);
  const totalRemaining = sampleSalaryData.reduce((sum, salary) => sum + salary.remainingSalaryPayable, 0);

  return (
    <div style={{
      backgroundColor: '#f0f0f0',
      padding: '20px',
      borderRadius: '8px',
      marginTop: '20px'
    }}>
      <h2>Salary Statistics</h2>
      <p><strong>Total Salaries:</strong> ${totalSalaries.toLocaleString()}</p>
      <p><strong>Total Advance Paid:</strong> ${totalAdvancePaid.toLocaleString()}</p>
      <p><strong>Total Remaining:</strong> ${totalRemaining.toLocaleString()}</p>
      <p><strong>Employees:</strong> {sampleSalaryData.length}</p>
    </div>
  );
};

/**
 * Example Component 3: Filter salaries by status
 */
const SalariesByStatus = ({ status }) => {
  const filtered = sampleSalaryData.filter(salary => salary.paymentStatus === status);

  return (
    <div>
      <h3>{status} Payments ({filtered.length})</h3>
      {filtered.map((salary) => (
        <div key={salary._id} style={{ marginBottom: '10px' }}>
          {salary.employeeName} - ${salary.remainingSalaryPayable.toLocaleString()}
        </div>
      ))}
    </div>
  );
};

/**
 * Example Component 4: Calculate salary calculations
 */
const SalaryCalculations = ({ totalSalary, advanceAmount }) => {
  const remaining = totalSalary - advanceAmount;
  const percentage = (advanceAmount / totalSalary) * 100;
  const status = advanceAmount === 0 ? 'Pending' : 
                 advanceAmount === totalSalary ? 'Paid' : 'Partially Paid';

  return (
    <div style={{ border: '2px solid #667eea', padding: '15px', borderRadius: '5px', marginTop: '20px' }}>
      <h3>Salary Calculation Example</h3>
      <p>Total Salary: ${totalSalary.toLocaleString()}</p>
      <p>Advance Paid: ${advanceAmount.toLocaleString()} ({percentage.toFixed(1)}%)</p>
      <p>Remaining: ${remaining.toLocaleString()}</p>
      <p>Status: <strong>{status}</strong></p>
    </div>
  );
};

/**
 * Main Example Component
 */
const ExampleUsage = () => {
  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px', fontFamily: 'Arial' }}>
      <h1>Salary Tracker - Usage Examples</h1>
      
      <SimpleSalaryList />
      <SalaryStatistics />
      
      <h2 style={{ marginTop: '30px' }}>Filter by Status</h2>
      <SalariesByStatus status="Paid" />
      <SalariesByStatus status="Partially Paid" />
      <SalariesByStatus status="Pending" />
      
      <SalaryCalculations totalSalary={75000} advanceAmount={30000} />
      <SalaryCalculations totalSalary={50000} advanceAmount={50000} />
      <SalaryCalculations totalSalary={60000} advanceAmount={0} />
    </div>
  );
};

export default ExampleUsage;
export { SimpleSalaryList, SalaryStatistics, SalariesByStatus, SalaryCalculations };
