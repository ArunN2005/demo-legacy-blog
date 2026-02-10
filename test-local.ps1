# Lazarus Engine - Local Test Script
# Modernized to handle Port 8000 and Virtual Environments

Clear-Host
Write-Host "✨ LAZARUS ENGINE - LOCAL TEST RUNNER" -ForegroundColor Cyan
Write-Host "--------------------------------------" -ForegroundColor Gray

# Check for app.py
if (-not (Test-Path "app.py")) {
    Write-Host "❌ Error: app.py not found in current directory!" -ForegroundColor Red
    exit 1
}

# Virtual Environment Setup
if (-not (Test-Path "venv")) {
    Write-Host "📦 Creating virtual environment..." -ForegroundColor Yellow
    python -m venv venv
}

# Dependency Installation
Write-Host "📥 Syncing dependencies..." -ForegroundColor Yellow
& .\venv\Scripts\Activate.ps1
pip install -q -r requirements.txt

# Launch Backend
Write-Host "`n🚀 Starting Backend API..." -ForegroundColor Green
Write-Host "   Endpoint: http://localhost:8000/api/posts" -ForegroundColor Blue

# Launch Frontend (Instructions)
Write-Host "`n🌐 Frontend Instructions:" -ForegroundColor Yellow
Write-Host "   To view the UI, open 'index.html' in your browser." -ForegroundColor White
Write-Host "   Note: Ensure the backend is running simultaneously.`n" -ForegroundColor White

Write-Host "⌨️  Press Ctrl+C to stop the server.`n" -ForegroundColor Gray

python app.py