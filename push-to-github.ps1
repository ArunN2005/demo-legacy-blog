# Push to GitHub Instructions

Write-Host "`n=== PUSH TO GITHUB ===`n" -ForegroundColor Cyan

Write-Host "1️⃣  Go to https://github.com/new" -ForegroundColor Yellow
Write-Host "    Repository name: demo-legacy-blog" -ForegroundColor White
Write-Host "    Description: Legacy blog platform needing modernization" -ForegroundColor White
Write-Host "    Public repository" -ForegroundColor White
Write-Host "    DON'T initialize with README (we already have one)`n" -ForegroundColor White

Write-Host "2️⃣  After creating, run these commands:`n" -ForegroundColor Yellow

$username = Read-Host "Enter your GitHub username"

Write-Host "`ngit remote add origin https://github.com/$username/demo-legacy-blog.git" -ForegroundColor Green
Write-Host "git branch -M main" -ForegroundColor Green
Write-Host "git push -u origin main`n" -ForegroundColor Green

Write-Host "Ready to copy? (Y/N): " -ForegroundColor Cyan -NoNewline
$ready = Read-Host

if ($ready -eq 'Y' -or $ready -eq 'y') {
    git remote add origin https://github.com/$username/demo-legacy-blog.git
    git branch -M main
    git push -u origin main
    
    Write-Host "`n✅ Pushed to GitHub!" -ForegroundColor Green
    Write-Host "   Test URL: https://github.com/$username/demo-legacy-blog`n" -ForegroundColor Cyan
} else {
    Write-Host "`nCopy the commands above and run manually.`n" -ForegroundColor Yellow
}
