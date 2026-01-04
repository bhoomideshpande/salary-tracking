# 🚀 RUN COMMANDS - SALARY TRACKER SYSTEM

## ⭐ ONE-CLICK CLEAN START (RECOMMENDED)

If you are facing connection errors, port conflicts, or just want a fresh start, run this `Magic Script`. It will:
1. Kill any existing processes on ports 3000 and 5002.
2. Start the Backend and Frontend in new windows.

```powershell
./start_fresh.ps1
```

*(If you get a permission error, you may need to run: `Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass`)*

---

## Manual Commands

### STEP 1: Start MongoDB
```powershell
mongod
```

### STEP 2: Start Backend
```powershell
cd backend
npm start
```

### STEP 3: Start Frontend
```powershell
cd frontend
npm start
```

---

## Troubleshooting

### "Port already in use"
Use the magic script `./start_fresh.ps1` to automatically fix this.

### "Cannot connect to backend"
1. Ensure the Backend terminal says "Server is running".
2. Ensure you are accessing the Frontend at `http://localhost:3000`.

---
