# Push to GitHub Instructions - ENHANCED STYLING

Clear-Host
Write-Host "██████████████████████████████████████████████████████████" -ForegroundColor Cyan
Write-Host "█                                                        █" -ForegroundColor Cyan
Write-Host "█   LAZARUS ENGINE - GITHUB DEPLOYMENT MODULE            █" -ForegroundColor Cyan
Write-Host "█                                                        █" -ForegroundColor Cyan
Write-Host "██████████████████████████████████████████████████████████" -ForegroundColor Cyan
Write-Host ""

Write-Host "1️⃣  PREPARATION" -ForegroundColor Yellow
Write-Host "    Go to: https://github.com/new" -ForegroundColor White
Write-Host "    Name:  demo-legacy-blog" -ForegroundColor Gray
Write-Host "    Mode:  Public" -ForegroundColor Gray
Write-Host ""

Write-Host "2️⃣  CONFIGURATION" -ForegroundColor Yellow
$username = Read-Host "    Enter your GitHub username"
$repoUrl = "https://github.com/$username/demo-legacy-blog.git"

Write-Host ""
Write-Host "3️⃣  EXECUTION" -ForegroundColor Yellow
Write-Host "    Ready to push to $repoUrl?" -ForegroundColor White
$ready = Read-Host "    Confirm (Y/N)"

if ($ready -eq 'Y' -or $ready -eq 'y') {
    Write-Host "`n🚀 Initializing repository..." -ForegroundColor Cyan
    git init
    git add .
    git commit -m "Resurrection: Modernized with Lazarus Engine v6.0"
    
    Write-Host "🔗 Connecting to remote..." -ForegroundColor Cyan
    git remote add origin $repoUrl
    git branch -M main
    
    Write-Host "📤 Pushing to GitHub..." -ForegroundColor Cyan
    git push -u origin main
    
    Write-Host "`n✅ SUCCESS!" -ForegroundColor Green
    Write-Host "   View your code: $repoUrl" -ForegroundColor Cyan
} else {
    Write-Host "`n❌ Deployment cancelled by user." -ForegroundColor Red
}
Write-Host ""