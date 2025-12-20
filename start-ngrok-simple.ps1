# Simple ngrok starter script
Write-Host "Starting ngrok tunnel on port 3005..." -ForegroundColor Cyan
Write-Host ""

# Kill any existing ngrok processes
Get-Process -Name ngrok -ErrorAction SilentlyContinue | Stop-Process -Force -ErrorAction SilentlyContinue

# Start ngrok
Start-Process ngrok -ArgumentList "http","3005" -WindowStyle Normal

Write-Host "Ngrok window opened. Waiting for tunnel to establish..." -ForegroundColor Yellow
Write-Host ""

# Wait and try to get URL
Start-Sleep -Seconds 6

$maxRetries = 5
$retryCount = 0

while ($retryCount -lt $maxRetries) {
    try {
        $response = Invoke-RestMethod -Uri "http://127.0.0.1:4040/api/tunnels" -Method Get -ErrorAction Stop
        if ($response.tunnels -and $response.tunnels.Length -gt 0) {
            $publicUrl = $response.tunnels[0].public_url
            Write-Host "========================================" -ForegroundColor Green
            Write-Host "  NGROK TUNNEL IS ACTIVE!" -ForegroundColor Green
            Write-Host "========================================" -ForegroundColor Green
            Write-Host ""
            Write-Host "Public URL: " -NoNewline -ForegroundColor White
            Write-Host "$publicUrl" -ForegroundColor Cyan
            Write-Host ""
            Write-Host "Share this URL with others to collaborate!" -ForegroundColor Yellow
            Write-Host ""
            Write-Host "Features:" -ForegroundColor Green
            Write-Host "  - Players can see each other's avatars" -ForegroundColor White
            Write-Host "  - Real-time chat functionality" -ForegroundColor White
            Write-Host "  - Synchronized movement" -ForegroundColor White
            Write-Host ""
            Write-Host "Note: First-time visitors may need to click 'Visit Site'" -ForegroundColor Yellow
            Write-Host ""
            
            Set-Clipboard -Value $publicUrl
            Write-Host "URL copied to clipboard!" -ForegroundColor Green
            Write-Host ""
            Write-Host "Keep the ngrok window open to maintain the tunnel." -ForegroundColor Cyan
            Write-Host ""
            exit 0
        }
    } catch {
        $retryCount++
        if ($retryCount -lt $maxRetries) {
            Write-Host "Waiting for ngrok... (attempt $retryCount/$maxRetries)" -ForegroundColor Yellow
            Start-Sleep -Seconds 2
        }
    }
}

Write-Host "Could not automatically get the URL." -ForegroundColor Yellow
Write-Host ""
Write-Host "Please check the ngrok window that opened." -ForegroundColor White
Write-Host "It should show your public URL (https://xxxxx.ngrok-free.app)" -ForegroundColor White
Write-Host ""
Write-Host "You can also visit http://127.0.0.1:4040 in your browser" -ForegroundColor Cyan
Write-Host "to see the ngrok dashboard with your public URL." -ForegroundColor Cyan
Write-Host ""

