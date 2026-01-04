# 🚀 RUN COMMANDS - SALARY TRACKER SYSTEM

## Copy-Paste Commands for Windows PowerShell

### STEP 1: Install Backend Dependencies
```powershell
cd backend
npm install
```

### STEP 2: Install Frontend Dependencies
```powershell
cd frontend
npm install
```

### STEP 3: Start MongoDB (New PowerShell Window)
```powershell
mongod
```

### STEP 4: Start Backend Server (New PowerShell Window)
```powershell
cd backend
npm start
```

Expected output:
```
✓ MongoDB connected successfully
✓ Server is running on http://localhost:5000
```

### STEP 5: Start Frontend Server (New PowerShell Window)
```powershell
cd frontend
npm start
```

Expected output:
```
Compiled successfully!
You can now view salary-tracker-frontend in the browser.
Local: http://localhost:3000
```

---

## Quick Commands Summary

| Command | Purpose |
|---------|---------|
| `mongod` | Start MongoDB server |
| `cd backend && npm install` | Install backend dependencies |
| `cd backend && npm start` | Start Express server |
| `npm run dev` | Start with auto-reload |
| `cd frontend && npm install` | Install frontend dependencies |
| `cd frontend && npm start` | Start React development server |

---

## Test API with cURL (One-Liners)

### Add Salary:
```powershell
curl -X POST http://localhost:5000/api/addSalary -H "Content-Type: application/json" -d '{\"employeeId\": \"EMP001\", \"employeeName\": \"John Doe\", \"month\": 1, \"year\": 2024, \"totalMonthlySalary\": 50000, \"advanceAmountPaid\": 20000, \"paymentDate\": \"2024-01-15T00:00:00Z\"}'
```

### Get All Salaries:
```powershell
curl http://localhost:5000/api/allSalaries
```

### Get Employee Salary:
```powershell
curl http://localhost:5000/api/salary/EMP001
```

### Health Check:
```powershell
curl http://localhost:5000/health
```

---

## Complete Fresh Start

### Delete Old Installation (if needed):
```powershell
# Backend
cd backend
Remove-Item -Recurse -Force node_modules
Remove-Item -Force package-lock.json
npm install

# Frontend
cd frontend
Remove-Item -Recurse -Force node_modules
Remove-Item -Force package-lock.json
npm install
```

---

## Environment File (.env)

Located at: `backend/.env`

```
MONGODB_URI=mongodb://localhost:27017/salary_tracker
PORT=5000
NODE_ENV=development
```

### For MongoDB Atlas (Cloud):
```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/salary_tracker
PORT=5000
NODE_ENV=development
```

---

## Port Information

| Service | Port | URL |
|---------|------|-----|
| MongoDB | 27017 | mongodb://localhost:27017 |
| Backend | 5000 | http://localhost:5000 |
| Frontend | 3000 | http://localhost:3000 |

---

## Troubleshooting Commands

### Check if Port is in Use:
```powershell
netstat -ano | findstr :5000
netstat -ano | findstr :3000
```

### Kill Process on Port (Windows):
```powershell
# Kill process on port 5000
$pid = (netstat -ano | findstr :5000).split()[-1]
taskkill /PID $pid /F

# Kill process on port 3000
$pid = (netstat -ano | findstr :3000).split()[-1]
taskkill /PID $pid /F
```

### Check Node/npm Versions:
```powershell
node --version
npm --version
```

### Clear npm Cache:
```powershell
npm cache clean --force
```

---

## MongoDB Commands (If Using Local)

### Start MongoDB:
```powershell
mongod
```

### Connect with MongoDB Shell:
```powershell
mongosh
```

### View Databases:
```
show dbs
```

### Use Database:
```
use salary_tracker
```

### View Collections:
```
show collections
```

### View Salary Records:
```
db.salaries.find().pretty()
```

### Count Records:
```
db.salaries.countDocuments()
```

### Delete Database:
```
db.dropDatabase()
```

---

## Development vs Production

### Development Mode (Current):
```bash
npm start          # Uses nodemon for auto-reload
NODE_ENV=development
```

### Production Mode:
```bash
NODE_ENV=production npm start
```

---

## Package Installation Reference

### Backend Packages:
```bash
npm install express mongoose cors dotenv
npm install --save-dev nodemon
```

### Frontend Packages:
```bash
npm install react react-dom
npm install react-scripts
```

---

## Full Setup Script (PowerShell)

```powershell
# Change to project directory
cd e:\Downloads\salary

# Install backend
cd backend
npm install
cd ..

# Install frontend
cd frontend
npm install
cd ..

Write-Host "Setup complete! Now run:"
Write-Host "Terminal 1: mongod"
Write-Host "Terminal 2: cd backend && npm start"
Write-Host "Terminal 3: cd frontend && npm start"
```

---

## Useful npm Scripts

### Backend (package.json):
```bash
npm start     # Start server (production)
npm run dev   # Start with auto-reload (development)
```

### Frontend (package.json):
```bash
npm start     # Start development server
npm build     # Create production build
npm test      # Run tests
npm eject     # Eject from Create React App
```

---

## Environment Setup Check

Run this to verify everything is installed:
```powershell
Write-Host "Node.js version:"
node --version

Write-Host "npm version:"
npm --version

Write-Host "MongoDB check (install if needed):"
mongod --version
```

---

## All Terminals You Need

Keep these terminals open:

| Terminal | Command | Purpose |
|----------|---------|---------|
| 1 | `mongod` | MongoDB server |
| 2 | `cd backend && npm start` | Backend API |
| 3 | `cd frontend && npm start` | Frontend UI |

Press `Ctrl + C` to stop any terminal.

---

## Quick Access URLs

- **Application:** http://localhost:3000
- **API Base:** http://localhost:5000
- **Health Check:** http://localhost:5000/health
- **MongoDB:** mongodb://localhost:27017

---

## If Something Goes Wrong

1. **Kill all processes:** `taskkill /F /IM node.exe`
2. **Clear cache:** `npm cache clean --force`
3. **Reinstall:** `rm node_modules && npm install`
4. **Check ports:** `netstat -ano | findstr :XXXX`
5. **Restart terminals:** Close and reopen terminal windows

---

## Documentation Files

Read these for more details:
- `README.md` - Complete documentation
- `QUICK_START.md` - Quick reference
- `SETUP_GUIDE.md` - Detailed setup
- `DATABASE_SCHEMA.md` - Database details
- `API_TEST_CASES.md` - Test examples
- `IMPLEMENTATION_GUIDE.md` - Implementation details

---

**Ready to run?** Follow the 5 steps at the top! ✅
