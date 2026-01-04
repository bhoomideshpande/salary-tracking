# Salary Tracker - Complete Setup & Running Instructions

## 📋 Table of Contents
1. [Prerequisites](#prerequisites)
2. [Installation](#installation)
3. [Running the Application](#running-the-application)
4. [Testing the API](#testing-the-api)
5. [Troubleshooting](#troubleshooting)

---

## Prerequisites

### Required Software:
- **Node.js** (v14+) - [Download](https://nodejs.org/)
- **MongoDB** - [Download Community](https://www.mongodb.com/try/download/community) or use [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
- **npm** (comes with Node.js)

### Verify Installation:
```bash
node --version
npm --version
```

---

## Installation

### Step 1: Install Backend Dependencies

```bash
cd backend
npm install
```

This installs:
- `express` - Web framework
- `mongoose` - MongoDB ODM
- `cors` - Cross-Origin Resource Sharing
- `dotenv` - Environment variables
- `nodemon` - Auto-restart on changes (dev)

### Step 2: Install Frontend Dependencies

```bash
cd frontend
npm install
```

This installs:
- `react` - UI library
- `react-dom` - React DOM renderer
- `react-scripts` - Build and dev server

---

## Running the Application

### Option A: MongoDB Locally

#### Step 1: Start MongoDB
Open **Command Prompt/PowerShell** and run:
```bash
mongod
```

You should see:
```
[initandlisten] waiting for connections on port 27017
```

#### Step 2: Start Backend Server
Open a **new terminal** and run:
```bash
cd backend
npm start
```

Expected output:
```
✓ MongoDB connected successfully
✓ Server is running on http://localhost:5000
✓ MongoDB connected to: mongodb://localhost:27017/salary_tracker
```

#### Step 3: Start Frontend Server
Open **another new terminal** and run:
```bash
cd frontend
npm start
```

The app will open at `http://localhost:3000`

---

### Option B: MongoDB Atlas (Cloud)

#### Step 1: Create MongoDB Atlas Account
1. Go to https://www.mongodb.com/cloud/atlas
2. Sign up for free account
3. Create a cluster
4. Get your connection string (looks like: `mongodb+srv://user:pass@cluster.mongodb.net/salary_tracker`)

#### Step 2: Update Environment File
Edit `backend/.env`:
```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/salary_tracker
PORT=5000
NODE_ENV=development
```

#### Step 3: Start Backend
```bash
cd backend
npm start
```

#### Step 4: Start Frontend
```bash
cd frontend
npm start
```

---

## Testing the API

### Test 1: Health Check
```bash
curl http://localhost:5000/health
```

**Expected Response:**
```json
{"success": true, "message": "Server is running"}
```

### Test 2: Add Employee Salary
```bash
curl -X POST http://localhost:5000/api/addSalary \
  -H "Content-Type: application/json" \
  -d '{
    "employeeId": "EMP001",
    "employeeName": "John Doe",
    "month": 1,
    "year": 2024,
    "totalMonthlySalary": 50000,
    "advanceAmountPaid": 20000,
    "paymentDate": "2024-01-15T00:00:00Z"
  }'
```

**Expected Response:**
```json
{
  "success": true,
  "message": "Salary record created successfully",
  "data": {
    "employeeId": "EMP001",
    "employeeName": "John Doe",
    "month": 1,
    "year": 2024,
    "totalMonthlySalary": 50000,
    "advanceAmountPaid": 20000,
    "remainingSalaryPayable": 30000,
    "paymentStatus": "Partially Paid",
    "_id": "60d5ec49f1b2c72d88c4e5a1",
    "createdAt": "2024-01-15T10:30:00.000Z",
    "updatedAt": "2024-01-15T10:30:00.000Z"
  }
}
```

### Test 3: Get All Salaries
```bash
curl http://localhost:5000/api/allSalaries
```

### Test 4: Get Employee Salary
```bash
curl http://localhost:5000/api/salary/EMP001
```

---

## Using Postman (GUI Alternative)

### Import Collection:
1. Open Postman
2. Click "Import"
3. Create requests for each endpoint:

**Request 1:**
- Method: `POST`
- URL: `http://localhost:5000/api/addSalary`
- Body (JSON):
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

**Request 2:**
- Method: `GET`
- URL: `http://localhost:5000/api/allSalaries`

**Request 3:**
- Method: `GET`
- URL: `http://localhost:5000/api/salary/EMP001`

---

## Frontend Usage

### Step 1: Access Application
Open browser and go to: `http://localhost:3000`

### Step 2: Add Salary Record
1. Fill in all form fields:
   - Employee ID: `EMP001`
   - Employee Name: `John Doe`
   - Month: `January`
   - Year: `2024`
   - Total Monthly Salary: `50000`
   - Advance Amount Paid: `20000` (or leave blank for 0)
   - Payment Date: `2024-01-15`

2. Click "Add Salary Record"

### Step 3: View Salary Records
- Records appear in the table below the form
- Shows all employee salary details
- Displays automatic calculations and payment status

---

## Project Structure

```
salary/
├── backend/
│   ├── models/
│   │   └── Salary.js          # MongoDB schema
│   ├── routes/
│   │   └── salaryRoutes.js    # API endpoints
│   ├── server.js              # Express server
│   ├── package.json           # Dependencies
│   └── .env                   # Config
│
├── frontend/
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   └── index.jsx
│   ├── SalaryTracker.jsx      # Main component
│   ├── SalaryTracker.css      # Styles
│   ├── App.jsx                # App wrapper
│   └── package.json
│
├── README.md                  # Full documentation
├── QUICK_START.md            # Quick reference
├── DATABASE_SCHEMA.md        # Schema details
└── API_TEST_CASES.md         # Test examples
```

---

## Troubleshooting

### Problem: Port 5000 already in use
**Solution:**
```bash
# Change PORT in backend/.env
PORT=5001

# Or kill the process (Windows):
netstat -ano | findstr :5000
taskkill /PID <PID> /F
```

### Problem: MongoDB connection failed
**Solution:**
1. Ensure MongoDB is running: `mongod`
2. Check connection string in `.env`
3. For Atlas: Verify IP whitelist and credentials

### Problem: CORS error
**Solution:**
- Backend already has CORS enabled
- Ensure both servers are running
- Clear browser cache: `Ctrl+Shift+Delete`

### Problem: npm command not found
**Solution:**
1. Install Node.js from [nodejs.org](https://nodejs.org/)
2. Restart terminal
3. Verify: `npm --version`

### Problem: React app won't start
**Solution:**
```bash
# Clear cache and reinstall
cd frontend
rm -r node_modules
npm install
npm start
```

### Problem: Cannot connect to localhost:3000 or 5000
**Solution:**
```bash
# Ensure Node processes are running
# Check with:
netstat -ano | findstr :3000
netstat -ano | findstr :5000

# If hanging, restart your terminal
```

---

## Commands Summary

### Backend
```bash
cd backend

# Install dependencies
npm install

# Start production server
npm start

# Start with auto-reload (development)
npm run dev
```

### Frontend
```bash
cd frontend

# Install dependencies
npm install

# Start development server
npm start

# Build for production
npm run build

# Run tests
npm test
```

### MongoDB
```bash
# Start local MongoDB
mongod

# Connect with MongoDB Shell
mongosh

# View databases
show dbs

# Use salary_tracker database
use salary_tracker

# View collections
show collections

# View documents
db.salaries.find()
```

---

## Quick Test Checklist

- [ ] Node.js and npm installed
- [ ] MongoDB started (if using local)
- [ ] Backend dependencies installed
- [ ] Frontend dependencies installed
- [ ] Backend server running on port 5000
- [ ] Frontend running on port 3000
- [ ] Can access `http://localhost:3000` in browser
- [ ] Can add salary record successfully
- [ ] Can see record in the table
- [ ] Remaining salary calculated correctly
- [ ] Payment status shows correctly

---

## API Endpoints Reference

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/addSalary` | Add new salary record |
| GET | `/api/allSalaries` | Get all salary records |
| GET | `/api/salary/:employeeId` | Get employee's salary records |
| GET | `/health` | Server health check |

---

## Database Backup

### Local MongoDB
```bash
# Backup
mongodump --db salary_tracker --out ./backup

# Restore
mongorestore --db salary_tracker ./backup/salary_tracker
```

### MongoDB Atlas
- Automatic backups are included
- Manual backups available in Atlas dashboard

---

## Next Steps

1. ✅ Complete setup and verify all services running
2. ✅ Test API endpoints with sample data
3. ✅ Add more employees and salary records
4. ✅ Export data as needed
5. 📌 Consider deployment (Heroku, AWS, etc.)
6. 📌 Add authentication for security
7. 📌 Create admin dashboard

---

## Support Resources

- [Node.js Documentation](https://nodejs.org/docs/)
- [Express Documentation](https://expressjs.com/)
- [MongoDB Documentation](https://docs.mongodb.com/)
- [React Documentation](https://react.dev/)
- [Mongoose Documentation](https://mongoosejs.com/)

---

**Setup completed successfully!** 🎉

Your Salary Tracker Management System is ready to use. Access it at `http://localhost:3000`
