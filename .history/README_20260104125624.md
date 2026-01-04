# Salary Tracker Management System - Setup & Running Guide

## Project Overview
A complete MERN stack application for managing employee salaries, advance payments, and final settlements.

### Features:
- ✅ Add new salary records with advance payments
- ✅ Automatic calculation of remaining salary payable
- ✅ Real-time payment status tracking (Pending, Partially Paid, Paid)
- ✅ View all employee salary records
- ✅ MongoDB database integration
- ✅ RESTful API with Express
- ✅ Responsive React frontend

---

## Project Structure

```
salary/
├── backend/
│   ├── models/
│   │   └── Salary.js           # MongoDB schema for salary records
│   ├── routes/
│   │   └── salaryRoutes.js     # Express route handlers
│   ├── server.js               # Main Express server
│   ├── package.json            # Backend dependencies
│   └── .env                    # Environment variables
│
├── frontend/
│   ├── public/
│   │   └── index.html          # HTML template
│   ├── src/
│   │   └── index.jsx           # React entry point
│   ├── SalaryTracker.jsx       # Main salary tracker component
│   ├── SalaryTracker.css       # Styling
│   ├── App.jsx                 # App wrapper component
│   ├── App.css                 # Global styles
│   └── package.json            # Frontend dependencies
│
└── README.md                   # This file
```

---

## Prerequisites

Make sure you have the following installed:
- **Node.js** (v14 or higher) - [Download](https://nodejs.org/)
- **npm** or **yarn** - Comes with Node.js
- **MongoDB** (local or cloud) - [Download](https://www.mongodb.com/try/download/community) or use [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)

---

## Installation & Setup

### Step 1: Setup MongoDB

#### Option A: Local MongoDB
1. Download and install MongoDB Community Edition from [mongodb.com](https://www.mongodb.com/try/download/community)
2. Start MongoDB service:
   - **Windows**: `mongod` in Command Prompt
   - **Mac/Linux**: `mongod` in Terminal
3. MongoDB will run on `mongodb://localhost:27017` by default

#### Option B: MongoDB Atlas (Cloud)
1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free account
3. Create a cluster
4. Get your connection string and update `.env` file:
   ```
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/salary_tracker
   ```

---

### Step 2: Setup Backend

Open a terminal and navigate to the backend folder:

```bash
cd backend
```

Install dependencies:

```bash
npm install
```

Verify `.env` file has correct MongoDB URI (default is local):

```
MONGODB_URI=mongodb://localhost:27017/salary_tracker
PORT=5000
NODE_ENV=development
```

Start the backend server:

```bash
npm start
```

Or for development with auto-restart:

```bash
npm run dev
```

**Expected Output:**
```
✓ MongoDB connected successfully
✓ Server is running on http://localhost:5000
✓ MongoDB connected to: mongodb://localhost:27017/salary_tracker
```

---

### Step 3: Setup Frontend

Open a new terminal and navigate to the frontend folder:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Start the React development server:

```bash
npm start
```

**Expected Output:**
```
Compiled successfully!

You can now view salary-tracker-frontend in the browser.

  Local:            http://localhost:3000
  On Your Network:  http://<your-ip>:3000
```

The application will automatically open at `http://localhost:3000`

---

## How to Use

### Adding a Salary Record:

1. Fill in the form with employee details:
   - **Employee ID**: Unique identifier (e.g., EMP001)
   - **Employee Name**: Full name of the employee
   - **Month/Year**: Select the salary month and year
   - **Total Monthly Salary**: Full salary amount
   - **Advance Amount Paid**: Amount already paid in advance (optional)
   - **Payment Date**: Date of payment

2. The system will automatically calculate:
   - **Remaining Salary**: Total Salary - Advance Amount
   - **Payment Status**: 
     - `Pending` - No advance paid
     - `Partially Paid` - Some advance paid, but balance remaining
     - `Paid` - Full salary paid in advance

3. Click **"Add Salary Record"** button

### Viewing Salary Records:

- All salary records are displayed in a table below the form
- Shows: Employee ID, Name, Month/Year, Total Salary, Advance Paid, Remaining Amount, Payment Date, and Status
- Records are sorted by latest first

---

## API Endpoints

### 1. Add New Salary Record
**Endpoint:** `POST /api/addSalary`

**Request Body:**
```json
{
  "employeeId": "EMP001",
  "employeeName": "John Doe",
  "month": 1,
  "year": 2024,
  "totalMonthlySalary": 50000,
  "advanceAmountPaid": 20000,
  "paymentDate": "2024-01-15T00:00:00Z"
}
```

**Success Response (201):**
```json
{
  "success": true,
  "message": "Salary record created successfully",
  "data": {
    "_id": "60d5ec49f1b2c72d88c4e5a1",
    "employeeId": "EMP001",
    "employeeName": "John Doe",
    "month": 1,
    "year": 2024,
    "totalMonthlySalary": 50000,
    "advanceAmountPaid": 20000,
    "remainingSalaryPayable": 30000,
    "paymentDate": "2024-01-15T00:00:00Z",
    "paymentStatus": "Partially Paid",
    "createdAt": "2024-01-15T10:30:00Z",
    "updatedAt": "2024-01-15T10:30:00Z"
  }
}
```

**Error Response (400/500):**
```json
{
  "success": false,
  "message": "Error description",
  "error": "Detailed error message"
}
```

---

### 2. Get Salary Records for Specific Employee
**Endpoint:** `GET /api/salary/:employeeId`

**Example:** `GET /api/salary/EMP001`

**Success Response (200):**
```json
{
  "success": true,
  "message": "Salary records retrieved successfully",
  "data": [
    {
      "_id": "60d5ec49f1b2c72d88c4e5a1",
      "employeeId": "EMP001",
      "employeeName": "John Doe",
      "month": 1,
      "year": 2024,
      "totalMonthlySalary": 50000,
      "advanceAmountPaid": 20000,
      "remainingSalaryPayable": 30000,
      "paymentDate": "2024-01-15T00:00:00Z",
      "paymentStatus": "Partially Paid"
    }
  ]
}
```

---

### 3. Get All Salary Records
**Endpoint:** `GET /api/allSalaries`

**Success Response (200):**
```json
{
  "success": true,
  "message": "All salary records retrieved successfully",
  "count": 5,
  "data": [...]
}
```

---

### 4. Health Check
**Endpoint:** `GET /health`

**Response:**
```json
{
  "success": true,
  "message": "Server is running"
}
```

---

## MongoDB Schema

**Collection:** `salaries`

```javascript
{
  employeeId: String,        // Employee ID (required)
  employeeName: String,      // Employee Name (required)
  month: Number,             // Month (1-12, required)
  year: Number,              // Year (required)
  totalMonthlySalary: Number, // Total Salary (required, min: 0)
  advanceAmountPaid: Number,  // Advance Paid (default: 0, min: 0)
  remainingSalaryPayable: Number, // Calculated Remaining (required)
  paymentDate: Date,         // Payment Date (required)
  paymentStatus: String,     // 'Pending' | 'Partially Paid' | 'Paid'
  createdAt: Date,           // Auto-added (timestamp)
  updatedAt: Date            // Auto-added (timestamp)
}
```

---

## Testing the Application

### Test Case 1: Full Advance Payment
```
Employee ID: EMP001
Name: John Doe
Month: January 2024
Total Salary: $50,000
Advance Paid: $50,000
Expected Result:
- Remaining: $0
- Status: Paid
```

### Test Case 2: Partial Advance Payment
```
Employee ID: EMP002
Name: Jane Smith
Month: January 2024
Total Salary: $60,000
Advance Paid: $25,000
Expected Result:
- Remaining: $35,000
- Status: Partially Paid
```

### Test Case 3: No Advance Payment
```
Employee ID: EMP003
Name: Bob Johnson
Month: January 2024
Total Salary: $45,000
Advance Paid: $0
Expected Result:
- Remaining: $45,000
- Status: Pending
```

---

## Common Issues & Solutions

### Issue: "MongoDB connection error"
**Solution:**
- Ensure MongoDB is running (`mongod` command)
- Check `MONGODB_URI` in `.env` file
- For Atlas: Verify connection string and IP whitelist

### Issue: "Cannot GET /api/allSalaries"
**Solution:**
- Ensure backend server is running on port 5000
- Check that routes are properly registered in `server.js`
- Verify Express is installed: `npm install express`

### Issue: "CORS error in browser console"
**Solution:**
- Backend is already configured with CORS
- Check that both servers are running
- Clear browser cache: Ctrl+Shift+Delete

### Issue: "Port 5000 already in use"
**Solution:**
- Change PORT in `.env`: `PORT=5001`
- Or kill process: `netstat -ano | findstr :5000` (Windows)

### Issue: "npm command not found"
**Solution:**
- Install Node.js from [nodejs.org](https://nodejs.org/)
- Restart terminal after installation
- Verify: `node --version` and `npm --version`

---

## Development Commands

### Backend:
```bash
# Install dependencies
npm install

# Start server (production)
npm start

# Start with auto-reload (development)
npm run dev
```

### Frontend:
```bash
# Install dependencies
npm install

# Start development server
npm start

# Build for production
npm build

# Run tests
npm test
```

---

## Deployment Considerations

### Backend Deployment (Heroku, AWS, etc.):
1. Set `NODE_ENV=production` in `.env`
2. Use MongoDB Atlas for cloud database
3. Deploy with: `git push heroku main`

### Frontend Deployment (Netlify, Vercel, etc.):
1. Build: `npm run build`
2. Deploy `build/` folder
3. Update API endpoint in code if needed

---

## Future Enhancements

- [ ] User authentication & authorization
- [ ] Edit/Delete salary records
- [ ] Generate salary slips (PDF)
- [ ] Monthly salary reports
- [ ] Payment reminders
- [ ] Employee dashboard
- [ ] Admin analytics
- [ ] Multi-language support

---

## Support & Documentation

For issues or questions:
1. Check MongoDB logs: `mongod` terminal
2. Check backend logs: `npm run dev` terminal
3. Check browser console: F12
4. Verify all services are running on correct ports

---

## License

This project is open-source and available for educational and commercial use.

---

**Last Updated:** January 4, 2026
