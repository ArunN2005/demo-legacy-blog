# Push to GitHub Instructions - Modernized Output

Write-Host "`n"
Write-Host "╔══════════════════════════════════════════════════════╗" -ForegroundColor Cyan
Write-Host "║                🚀 PUSH TO GITHUB                     ║" -ForegroundColor Cyan
Write-Host "╚══════════════════════════════════════════════════════╝" -ForegroundColor Cyan
Write-Host "`n"

Write-Host "1️⃣  Create a new repository:" -ForegroundColor Yellow
Write-Host "    URL:  https://github.com/new" -ForegroundColor White
Write-Host "    Name: demo-legacy-blog" -ForegroundColor White
Write-Host "    Note: DON'T initialize with README`n" -ForegroundColor White

Write-Host "2️⃣  Configuration:" -ForegroundColor Yellow
$username = Read-Host "    Enter your GitHub username"

Write-Host "`n3️⃣  Commands to run:" -ForegroundColor Yellow
Write-Host "    git init" -ForegroundColor Green
Write-Host "    git add ." -ForegroundColor Green
Write-Host "    git commit -m 'Initial modernization commit'" -ForegroundColor Green
Write-Host "    git remote add origin https://github.com/$username/demo-legacy-blog.git" -ForegroundColor Green
Write-Host "    git branch -M main" -ForegroundColor Green
Write-Host "    git push -u origin main`n" -ForegroundColor Green

Write-Host "Ready to execute git commands? (Y/N): " -ForegroundColor Cyan -NoNewline
$ready = Read-Host

if ($ready -eq 'Y' -or $ready -eq 'y') {
    try {
        git init
        git add .
        git commit -m "Initial modernization commit"
        git remote add origin "https://github.com/$username/demo-legacy-blog.git"
        git branch -M main
        git push -u origin main
        
        Write-Host "`n✅ Successfully pushed to GitHub!" -ForegroundColor Green
        Write-Host "   View at: https://github.com/$username/demo-legacy-blog`n" -ForegroundColor Cyan
    } catch {
        Write-Host "`n❌ Error occurred. Please ensure git is installed and configured.`n" -ForegroundColor Red
    }
} else {
    Write-Host "`nOperation cancelled. Copy the commands above to run manually.`n" -ForegroundColor Yellow
}