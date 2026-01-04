# MongoDB Schema Documentation

## Database: `salary_tracker`

### Collection: `salaries`

#### Schema Structure

```javascript
{
  _id: ObjectId,                    // Auto-generated MongoDB ID
  
  // Employee Information
  employeeId: {
    type: String,
    required: true,
    trim: true,
    description: "Unique employee identifier (e.g., 'EMP001')"
  },
  
  employeeName: {
    type: String,
    required: true,
    trim: true,
    description: "Full name of the employee"
  },
  
  // Salary Period
  month: {
    type: Number,
    required: true,
    min: 1,
    max: 12,
    description: "Month number (1-12)"
  },
  
  year: {
    type: Number,
    required: true,
    min: 2000,
    description: "Year of salary (e.g., 2024)"
  },
  
  // Salary Details
  totalMonthlySalary: {
    type: Number,
    required: true,
    min: 0,
    description: "Total salary for the month (in currency units)"
  },
  
  advanceAmountPaid: {
    type: Number,
    required: true,
    min: 0,
    default: 0,
    description: "Amount paid in advance"
  },
  
  remainingSalaryPayable: {
    type: Number,
    required: true,
    min: 0,
    description: "Calculated as: totalMonthlySalary - advanceAmountPaid"
  },
  
  // Payment Information
  paymentDate: {
    type: Date,
    required: true,
    description: "Date when payment/advance was made"
  },
  
  paymentStatus: {
    type: String,
    enum: ['Pending', 'Partially Paid', 'Paid'],
    default: 'Pending',
    description: "Current payment status"
  },
  
  // Timestamps
  createdAt: {
    type: Date,
    default: Date.now,
    description: "Record creation timestamp"
  },
  
  updatedAt: {
    type: Date,
    default: Date.now,
    description: "Last update timestamp"
  }
}
```

---

## Field Descriptions

| Field | Type | Required | Default | Description |
|-------|------|----------|---------|-------------|
| `_id` | ObjectId | Auto | - | Unique document identifier |
| `employeeId` | String | Yes | - | Unique employee code |
| `employeeName` | String | Yes | - | Employee's full name |
| `month` | Number | Yes | - | Month (1-12) |
| `year` | Number | Yes | - | Year of salary |
| `totalMonthlySalary` | Number | Yes | - | Complete salary amount |
| `advanceAmountPaid` | Number | Yes | 0 | Prepaid amount |
| `remainingSalaryPayable` | Number | Yes | - | Balance to be paid |
| `paymentDate` | Date | Yes | - | Payment transaction date |
| `paymentStatus` | String | Yes | 'Pending' | Status indicator |
| `createdAt` | Date | Auto | Current time | Creation timestamp |
| `updatedAt` | Date | Auto | Current time | Last modification timestamp |

---

## Payment Status Rules

### Status Determination Logic

```
IF advanceAmountPaid = 0
  THEN paymentStatus = 'Pending'
  
ELSE IF advanceAmountPaid = totalMonthlySalary
  THEN paymentStatus = 'Paid'
  
ELSE (0 < advanceAmountPaid < totalMonthlySalary)
  THEN paymentStatus = 'Partially Paid'
```

---

## Sample Documents

### Document 1: No Advance (Pending)
```json
{
  "_id": ObjectId("60d5ec49f1b2c72d88c4e5a1"),
  "employeeId": "EMP001",
  "employeeName": "John Doe",
  "month": 1,
  "year": 2024,
  "totalMonthlySalary": 50000,
  "advanceAmountPaid": 0,
  "remainingSalaryPayable": 50000,
  "paymentDate": ISODate("2024-01-05T00:00:00.000Z"),
  "paymentStatus": "Pending",
  "createdAt": ISODate("2024-01-04T10:30:00.000Z"),
  "updatedAt": ISODate("2024-01-04T10:30:00.000Z")
}
```

### Document 2: Partial Advance (Partially Paid)
```json
{
  "_id": ObjectId("60d5ec49f1b2c72d88c4e5a2"),
  "employeeId": "EMP002",
  "employeeName": "Jane Smith",
  "month": 1,
  "year": 2024,
  "totalMonthlySalary": 60000,
  "advanceAmountPaid": 25000,
  "remainingSalaryPayable": 35000,
  "paymentDate": ISODate("2024-01-10T00:00:00.000Z"),
  "paymentStatus": "Partially Paid",
  "createdAt": ISODate("2024-01-10T09:15:00.000Z"),
  "updatedAt": ISODate("2024-01-10T09:15:00.000Z")
}
```

### Document 3: Full Advance (Paid)
```json
{
  "_id": ObjectId("60d5ec49f1b2c72d88c4e5a3"),
  "employeeId": "EMP003",
  "employeeName": "Bob Johnson",
  "month": 1,
  "year": 2024,
  "totalMonthlySalary": 45000,
  "advanceAmountPaid": 45000,
  "remainingSalaryPayable": 0,
  "paymentDate": ISODate("2024-01-01T00:00:00.000Z"),
  "paymentStatus": "Paid",
  "createdAt": ISODate("2023-12-28T14:20:00.000Z"),
  "updatedAt": ISODate("2023-12-28T14:20:00.000Z")
}
```

---

## Database Queries

### Find All Pending Salaries
```javascript
db.salaries.find({ paymentStatus: "Pending" })
```

### Find All Partially Paid Salaries
```javascript
db.salaries.find({ paymentStatus: "Partially Paid" })
```

### Find All Paid Salaries
```javascript
db.salaries.find({ paymentStatus: "Paid" })
```

### Find Salary Records for Specific Employee
```javascript
db.salaries.find({ employeeId: "EMP001" })
```

### Find Salaries for Specific Month/Year
```javascript
db.salaries.find({ month: 1, year: 2024 })
```

### Calculate Total Advance Paid in a Month
```javascript
db.salaries.aggregate([
  { $match: { month: 1, year: 2024 } },
  { $group: { _id: null, totalAdvance: { $sum: "$advanceAmountPaid" } } }
])
```

### Calculate Total Remaining Payable
```javascript
db.salaries.aggregate([
  { $match: { month: 1, year: 2024 } },
  { $group: { _id: null, totalRemaining: { $sum: "$remainingSalaryPayable" } } }
])
```

### Find Employees with Unpaid Balances
```javascript
db.salaries.find({ remainingSalaryPayable: { $gt: 0 } })
```

### Sort by Latest Records
```javascript
db.salaries.find().sort({ year: -1, month: -1, createdAt: -1 })
```

---

## Data Validation Rules

### Field Validations

1. **employeeId**
   - Must be non-empty string
   - Cannot contain leading/trailing spaces (auto-trimmed)

2. **employeeName**
   - Must be non-empty string
   - Cannot contain leading/trailing spaces (auto-trimmed)

3. **month**
   - Must be between 1 and 12
   - Required field

4. **year**
   - Must be >= 2000
   - Typically current year or past year

5. **totalMonthlySalary**
   - Must be >= 0
   - Cannot be negative
   - Typically > 0 for valid records

6. **advanceAmountPaid**
   - Must be >= 0
   - Cannot exceed totalMonthlySalary
   - Default: 0

7. **remainingSalaryPayable**
   - Calculated field: totalMonthlySalary - advanceAmountPaid
   - Always >= 0

8. **paymentDate**
   - Must be valid date
   - Cannot be in future (optional check)

9. **paymentStatus**
   - Only values: 'Pending', 'Partially Paid', 'Paid'
   - Auto-determined based on amounts

---

## Indexes (Recommended)

For optimal query performance, add these indexes:

```javascript
// Index on employeeId for fast employee lookups
db.salaries.createIndex({ employeeId: 1 })

// Composite index for month/year queries
db.salaries.createIndex({ year: -1, month: -1 })

// Index on paymentStatus for filtering
db.salaries.createIndex({ paymentStatus: 1 })

// Composite index for common queries
db.salaries.createIndex({ employeeId: 1, year: -1, month: -1 })
```

---

## Backup & Recovery

### Backup Database
```bash
mongodump --db salary_tracker --out ./backup
```

### Restore Database
```bash
mongorestore --db salary_tracker ./backup/salary_tracker
```

### Export to JSON
```bash
mongoexport --db salary_tracker --collection salaries --out salaries.json
```

### Import from JSON
```bash
mongoimport --db salary_tracker --collection salaries --file salaries.json
```

---

## Scaling Considerations

1. **Sharding**: Consider sharding by employeeId for large datasets
2. **Read Replicas**: Use MongoDB Atlas for automatic replication
3. **Caching**: Cache frequently accessed salary records
4. **Archiving**: Move old records to separate collection if dataset grows large

---

**Database Documentation Version:** 1.0  
**Last Updated:** January 4, 2026
