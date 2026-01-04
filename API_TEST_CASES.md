// Sample Test Data for Salary Tracker System
// Use these curl commands or Postman to test the API

// ==========================================
// TEST 1: Add Full Salary Payment (Paid Status)
// ==========================================
curl -X POST http://localhost:5000/api/addSalary \
  -H "Content-Type: application/json" \
  -d '{
    "employeeId": "EMP001",
    "employeeName": "John Doe",
    "month": 1,
    "year": 2024,
    "totalMonthlySalary": 50000,
    "advanceAmountPaid": 50000,
    "paymentDate": "2024-01-15T00:00:00Z"
  }'

// Expected Response:
// {
//   "success": true,
//   "message": "Salary record created successfully",
//   "data": {
//     "employeeId": "EMP001",
//     "employeeName": "John Doe",
//     "totalMonthlySalary": 50000,
//     "advanceAmountPaid": 50000,
//     "remainingSalaryPayable": 0,
//     "paymentStatus": "Paid"
//   }
// }

// ==========================================
// TEST 2: Add Partial Advance Payment
// ==========================================
curl -X POST http://localhost:5000/api/addSalary \
  -H "Content-Type: application/json" \
  -d '{
    "employeeId": "EMP002",
    "employeeName": "Jane Smith",
    "month": 1,
    "year": 2024,
    "totalMonthlySalary": 60000,
    "advanceAmountPaid": 25000,
    "paymentDate": "2024-01-10T00:00:00Z"
  }'

// Expected Response:
// Status: "Partially Paid"
// remainingSalaryPayable: 35000

// ==========================================
// TEST 3: Add No Advance Payment (Pending Status)
// ==========================================
curl -X POST http://localhost:5000/api/addSalary \
  -H "Content-Type: application/json" \
  -d '{
    "employeeId": "EMP003",
    "employeeName": "Bob Johnson",
    "month": 1,
    "year": 2024,
    "totalMonthlySalary": 45000,
    "advanceAmountPaid": 0,
    "paymentDate": "2024-01-20T00:00:00Z"
  }'

// Expected Response:
// Status: "Pending"
// remainingSalaryPayable: 45000

// ==========================================
// TEST 4: Multiple Employees
// ==========================================
curl -X POST http://localhost:5000/api/addSalary \
  -H "Content-Type: application/json" \
  -d '{
    "employeeId": "EMP004",
    "employeeName": "Alice Williams",
    "month": 1,
    "year": 2024,
    "totalMonthlySalary": 75000,
    "advanceAmountPaid": 30000,
    "paymentDate": "2024-01-05T00:00:00Z"
  }'

curl -X POST http://localhost:5000/api/addSalary \
  -H "Content-Type: application/json" \
  -d '{
    "employeeId": "EMP005",
    "employeeName": "Charlie Brown",
    "month": 1,
    "year": 2024,
    "totalMonthlySalary": 55000,
    "advanceAmountPaid": 55000,
    "paymentDate": "2024-01-08T00:00:00Z"
  }'

// ==========================================
// TEST 5: Get All Salary Records
// ==========================================
curl http://localhost:5000/api/allSalaries

// Expected Response:
// {
//   "success": true,
//   "message": "All salary records retrieved successfully",
//   "count": 5,
//   "data": [...]
// }

// ==========================================
// TEST 6: Get Specific Employee Salary
// ==========================================
curl http://localhost:5000/api/salary/EMP001

// Expected Response:
// {
//   "success": true,
//   "message": "Salary records retrieved successfully",
//   "data": [...]
// }

// ==========================================
// TEST 7: Health Check
// ==========================================
curl http://localhost:5000/health

// Expected Response:
// {
//   "success": true,
//   "message": "Server is running"
// }

// ==========================================
// TEST 8: Error Case - Missing Required Field
// ==========================================
curl -X POST http://localhost:5000/api/addSalary \
  -H "Content-Type: application/json" \
  -d '{
    "employeeId": "EMP006",
    "employeeName": "David Lee"
    // Missing: month, year, totalMonthlySalary, etc.
  }'

// Expected Response:
// {
//   "success": false,
//   "message": "All fields are required: ..."
// }

// ==========================================
// TEST 9: Error Case - Advance > Total Salary
// ==========================================
curl -X POST http://localhost:5000/api/addSalary \
  -H "Content-Type: application/json" \
  -d '{
    "employeeId": "EMP007",
    "employeeName": "Eve Davis",
    "month": 2,
    "year": 2024,
    "totalMonthlySalary": 40000,
    "advanceAmountPaid": 50000,
    "paymentDate": "2024-02-01T00:00:00Z"
  }'

// Expected Response:
// {
//   "success": false,
//   "message": "Advance amount cannot exceed total monthly salary"
// }

// ==========================================
// TEST 10: February 2024 Salary
// ==========================================
curl -X POST http://localhost:5000/api/addSalary \
  -H "Content-Type: application/json" \
  -d '{
    "employeeId": "EMP001",
    "employeeName": "John Doe",
    "month": 2,
    "year": 2024,
    "totalMonthlySalary": 50000,
    "advanceAmountPaid": 10000,
    "paymentDate": "2024-02-01T00:00:00Z"
  }'

// ==========================================
// TEST DATA SUMMARY
// ==========================================
/*
Test Data Created:

1. EMP001 - John Doe
   - January: $50,000 (Full Advance) → Paid
   - February: $50,000 (Partial: $10,000) → Partially Paid

2. EMP002 - Jane Smith
   - January: $60,000 (Partial: $25,000) → Partially Paid

3. EMP003 - Bob Johnson
   - January: $45,000 (No Advance) → Pending

4. EMP004 - Alice Williams
   - January: $75,000 (Partial: $30,000) → Partially Paid

5. EMP005 - Charlie Brown
   - January: $55,000 (Full Advance) → Paid

Total Records: 6
Total Salary: $335,000
Total Advance Paid: $175,000
Total Remaining: $160,000
*/

// ==========================================
// POSTMAN COLLECTION FORMAT
// ==========================================
/*
{
  "info": {
    "name": "Salary Tracker API",
    "description": "Test collection for Salary Tracker Management System"
  },
  "item": [
    {
      "name": "Add Salary",
      "request": {
        "method": "POST",
        "header": [{"key": "Content-Type", "value": "application/json"}],
        "url": {"raw": "http://localhost:5000/api/addSalary"},
        "body": {
          "mode": "raw",
          "raw": "{...}"
        }
      }
    },
    {
      "name": "Get All Salaries",
      "request": {
        "method": "GET",
        "url": {"raw": "http://localhost:5000/api/allSalaries"}
      }
    }
  ]
}
*/
