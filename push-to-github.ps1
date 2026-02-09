# Push to GitHub Instructions - Modernized Output

Clear-Host
Write-Host "`n"
Write-Host "  ██╗      █████╗ ███████╗ █████╗ ██████╗ ██╗   ██╗███████╗" -ForegroundColor Cyan
Write-Host "  ██║     ██╔══██╗╚══███╔╝██╔══██╗██╔══██╗██║   ██║██╔════╝" -ForegroundColor Cyan
Write-Host "  ██║     ███████║  ███╔╝ ███████║██████╔╝██║   ██║███████╗" -ForegroundColor Cyan
Write-Host "  ██║     ██╔══██║ ███╔╝  ██╔══██║██╔══██╗██║   ██║╚════██║" -ForegroundColor Cyan
Write-Host "  ███████╗██║  ██║███████╗██║  ██║██║  ██║╚██████╔╝███████║" -ForegroundColor Cyan
Write-Host "  ╚══════╝╚═╝  ╚═╝╚══════╝╚═╝  ╚═╝╚═╝  ╚═╝ ╚═════╝ ╚══════╝" -ForegroundColor Cyan
Write-Host "  LAZARUS ENGINE - GITHUB DEPLOYMENT TOOL`n" -ForegroundColor Gray

Write-Host "=== PUSH TO GITHUB ===`n" -ForegroundColor Cyan

Write-Host "1️⃣  Go to https://github.com/new" -ForegroundColor Yellow
Write-Host "    Repository name: demo-legacy-blog" -ForegroundColor White
Write-Host "    Description: Modernized legacy blog platform" -ForegroundColor White
Write-Host "    Public repository" -ForegroundColor White
Write-Host "    DON'T initialize with README (we already have one)`n" -ForegroundColor White

Write-Host "2️⃣  After creating, run these commands:`n" -ForegroundColor Yellow

$username = Read-Host "Enter your GitHub username"

Write-Host "`ngit remote add origin https://github.com/$username/demo-legacy-blog.git" -ForegroundColor Green
Write-Host "git branch -M main" -ForegroundColor Green
Write-Host "git push -u origin main`n" -ForegroundColor Green

Write-Host "Ready to copy and execute? (Y/N): " -ForegroundColor Cyan -NoNewline
$ready = Read-Host

if ($ready -eq 'Y' -or $ready -eq 'y') {
    try {
        git remote add origin "https://github.com/$username/demo-legacy-blog.git"
        git branch -M main
        git push -u origin main
        
        Write-Host "`n✅ Pushed to GitHub successfully!" -ForegroundColor Green
        Write-Host "   Test URL: https://github.com/$username/demo-legacy-blog`n" -ForegroundColor Cyan
    } catch {
        Write-Host "`n❌ Error during push. Please check if the repository exists and your credentials are correct." -ForegroundColor Red
    }
} else {
    Write-Host "`nCopy the commands above and run manually.`n" -ForegroundColor Yellow
}