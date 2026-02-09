# Quick Test Script - Modernized Local Test
# Run the modernized app locally

Clear-Host
Write-Host "`n=== MODERNIZED BLOG - LOCAL TEST ===`n" -ForegroundColor Cyan

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
Write-Host "`n✨ Starting Modernized Blog API..." -ForegroundColor Green
Write-Host "   API URL: http://localhost:8000" -ForegroundColor Cyan
Write-Host "   Frontend: Open index.html in your browser" -ForegroundColor Cyan
Write-Host "   Press Ctrl+C to stop`n" -ForegroundColor Yellow

# Set environment variables if needed
$env:FLASK_ENV = "development"
$env:FLASK_APP = "app.py"

python app.py