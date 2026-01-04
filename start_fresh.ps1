# FRESH START SCRIPT for Salary Tracker
# This script kills any process on ports 3000 & 5002 and starts the app cleanly.
# NOTE: Port 5000 is intentionally preserved as per user request.

Write-Host "🧹 CLEANING UP PORTS..." -ForegroundColor Cyan

# Function to kill process on a port
function Kill-Port($port) {
    try {
        $connection = Get-NetTCPConnection -LocalPort $port -ErrorAction SilentlyContinue
        if ($connection) {
            $pid_val = $connection.OwningProcess
            # Safety check: Do NOT kill port 5000
            if ($port -eq 5000) {
                Write-Host "   ⚠️ SKIPPING Port 5000 (Protected)" -ForegroundColor Magenta
                return
            }
            
            Write-Host "   found process $pid_val on port $port. Killing..." -ForegroundColor Yellow
            Stop-Process -Id $pid_val -Force
            Write-Host "   ✅ Port $port freed." -ForegroundColor Green
        } else {
            Write-Host "   Port $port is already free." -ForegroundColor Gray
        }
    } catch {
        Write-Host "   Could not check/kill port $port. (May need Admin privileges or it's already free)" -ForegroundColor Red
    }
}

# 1. Kill ports (3000 for frontend, 5002 for backend)
Kill-Port 3000
Kill-Port 5002

# 2. Start Backend
Write-Host "`n🚀 STARTING BACKEND (Port 5002)..." -ForegroundColor Cyan
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd backend; Write-Host 'Backend Starting on Port 5002...'; npm start"

# 3. Start Frontend
Write-Host "🚀 STARTING FRONTEND..." -ForegroundColor Cyan
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd frontend; Write-Host 'Frontend Starting...'; npm start"

Write-Host "`n✅ DONE! New terminal windows have been opened." -ForegroundColor Green
Write-Host "   Please check the new windows for status."
Write-Host "   Backend is running on: http://localhost:5002"
Write-Host "   Frontend is running on: http://localhost:3000"
