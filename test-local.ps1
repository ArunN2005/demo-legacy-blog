# Quick Test Script - Modernized for FastAPI

Write-Host "`n"
Write-Host "╔══════════════════════════════════════════════════════╗" -ForegroundColor Cyan
Write-Host "║           🚀 MODERN BLOG - LOCAL TEST                ║" -ForegroundColor Cyan
Write-Host "╚══════════════════════════════════════════════════════╝" -ForegroundColor Cyan
Write-Host "`n"

# Check if in correct directory
if (-not (Test-Path "app.py")) {
    Write-Host "❌ Error: Run this from the project root directory!" -ForegroundColor Red
    exit 1
}

# Create virtual environment if needed
if (-not (Test-Path "venv")) {
    Write-Host "📦 Creating virtual environment..." -ForegroundColor Yellow
    python -m venv venv
}

# Activate and install
Write-Host "📥 Installing modern dependencies..." -ForegroundColor Yellow
& .\venv\Scripts\Activate.ps1
pip install -q -r requirements.txt

# Run the app
Write-Host "`n✨ Starting Modernized Backend..." -ForegroundColor Green
Write-Host "   API URL:  http://localhost:8000" -ForegroundColor Cyan
Write-Host "   Frontend: Open index.html in your browser" -ForegroundColor Cyan
Write-Host "   Docs:     http://localhost:8000/docs" -ForegroundColor Cyan
Write-Host "`n   Press Ctrl+C to stop the server`n" -ForegroundColor Yellow

python app.py