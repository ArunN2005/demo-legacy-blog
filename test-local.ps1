# Quick Test Script
# Run the legacy app locally to see how it works

Write-Host "`n=== LEGACY BLOG - LOCAL TEST ===`n" -ForegroundColor Cyan

# Check if in correct directory
if (-not (Test-Path "app.py")) {
    Write-Host "❌ Run this from the demo-legacy-blog directory!" -ForegroundColor Red
    exit 1
}

# Create virtual environment if needed
if (-not (Test-Path "venv")) {
    Write-Host "📦 Creating virtual environment..." -ForegroundColor Yellow
    python -m venv venv
}

# Activate and install
Write-Host "📥 Installing dependencies..." -ForegroundColor Yellow
& .\venv\Scripts\Activate.ps1
pip install -q -r requirements.txt

# Run the app
Write-Host "`n✨ Starting Legacy Blog App..." -ForegroundColor Green
Write-Host "   URL: http://localhost:5000" -ForegroundColor Cyan
Write-Host "   Press Ctrl+C to stop`n" -ForegroundColor Yellow

python app.py
