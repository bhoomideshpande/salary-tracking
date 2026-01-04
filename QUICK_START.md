# Quick Start Commands

## Quick Setup (Copy & Paste)

### Prerequisites Check:
```bash
node --version
npm --version
```

---

## Option 1: Using Local MongoDB

### Terminal 1 - Start MongoDB:
```bash
mongod
```

### Terminal 2 - Start Backend:
```bash
cd backend
npm install
npm start
```

Expected: ✓ Server is running on http://localhost:5000

### Terminal 3 - Start Frontend:
```bash
cd frontend
npm install
npm start
```

Expected: Application opens at http://localhost:3000

---

## Option 2: Using MongoDB Atlas (Cloud)

### Step 1: Update .env file in backend folder:
```
MONGODB_URI=mongodb+srv://your_username:your_password@cluster.mongodb.net/salary_tracker
PORT=5000
NODE_ENV=development
```

### Step 2: Start Backend:
```bash
cd backend
npm install
npm start
```

### Step 3: Start Frontend (in another terminal):
```bash
cd frontend
npm install
npm start
```

---

## Test the API with cURL or Postman

### Add Salary Record:
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

### Get All Salaries:
```bash
curl http://localhost:5000/api/allSalaries
```

### Get Employee Salary:
```bash
curl http://localhost:5000/api/salary/EMP001
```

### Health Check:
```bash
curl http://localhost:5000/health
```

---

## Default Credentials & URLs

| Service | URL | Port |
|---------|-----|------|
| Frontend (React) | http://localhost:3000 | 3000 |
| Backend (Express) | http://localhost:5000 | 5000 |
| MongoDB Local | mongodb://localhost:27017 | 27017 |
| MongoDB Atlas | mongodb+srv://... | (cloud) |

---

## Stopping Services

Press `Ctrl + C` in each terminal to stop the services.

---

## Complete Fresh Setup

```bash
# 1. Navigate to backend
cd backend

# 2. Clean install
rm -r node_modules
npm install

# 3. Start backend
npm start

# 4. In another terminal, navigate to frontend
cd frontend

# 5. Clean install
rm -r node_modules
npm install

# 6. Start frontend
npm start
```

---

## Windows PowerShell Commands

```powershell
# Check Node.js version
node --version

# Install backend dependencies
Set-Location .\backend
npm install
npm start

# In another PowerShell window
Set-Location .\frontend
npm install
npm start
```

---

## Troubleshooting

| Problem | Solution |
|---------|----------|
| MongoDB not starting | Run `mongod` first in separate terminal |
| Port 5000 in use | Change PORT in .env file |
| CORS errors | Backend already has CORS enabled |
| Module not found | Run `npm install` in respective folder |
| npm not found | Install Node.js from nodejs.org |

---

**Your Salary Tracker System is ready to use!** 🚀
