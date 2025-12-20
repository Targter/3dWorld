# Ngrok Setup Script for 3D University Campus
$port = 3005

Write-Host ""
Write-Host "Setting up ngrok tunnel for 3D University Campus" -ForegroundColor Cyan
Write-Host ""

# Check if ngrok is installed
$ngrokInstalled = $false
try {
    $null = ngrok version 2>&1
    $ngrokInstalled = $true
} catch {
    $ngrokInstalled = $false
}

if (-not $ngrokInstalled) {
    Write-Host "Ngrok not found. Installing via npm..." -ForegroundColor Yellow
    npm install -g ngrok
    Write-Host ""
    Write-Host "Ngrok installed!" -ForegroundColor Green
    Write-Host ""
    Write-Host "Next steps:" -ForegroundColor Cyan
    Write-Host "   1. Sign up at https://dashboard.ngrok.com/signup (free account)" -ForegroundColor White
    Write-Host "   2. Get your authtoken from https://dashboard.ngrok.com/get-started/your-authtoken" -ForegroundColor White
    Write-Host "   3. Run: ngrok config add-authtoken YOUR_TOKEN" -ForegroundColor White
    Write-Host "   4. Then run this script again" -ForegroundColor White
    Write-Host ""
    exit
}

Write-Host "Ngrok is installed" -ForegroundColor Green
Write-Host ""
Write-Host "Starting ngrok tunnel on port $port..." -ForegroundColor Cyan
Write-Host "Waiting for ngrok to establish connection..." -ForegroundColor Yellow
Write-Host ""

# Start ngrok in background
Start-Process ngrok -ArgumentList "http", $port -WindowStyle Normal

# Wait a bit for ngrok to start
Start-Sleep -Seconds 3

# Try to get the public URL from ngrok API
try {
    $response = Invoke-RestMethod -Uri "http://127.0.0.1:4040/api/tunnels" -Method Get -ErrorAction Stop
    if ($response.tunnels -and $response.tunnels.Length -gt 0) {
        $publicUrl = $response.tunnels[0].public_url
        Write-Host ""
        Write-Host "Ngrok tunnel is active!" -ForegroundColor Green
        Write-Host ""
        Write-Host "Public URL: $publicUrl" -ForegroundColor Cyan
        Write-Host ""
        Write-Host "Share this URL with others to collaborate:" -ForegroundColor Yellow
        Write-Host "   $publicUrl" -ForegroundColor White
        Write-Host ""
        Write-Host "Players can:" -ForegroundColor Green
        Write-Host "   - See each other's avatars in real-time" -ForegroundColor White
        Write-Host "   - Chat with each other" -ForegroundColor White
        Write-Host "   - Move around the 3D campus together" -ForegroundColor White
        Write-Host ""
        Write-Host "Note: First-time visitors may need to click 'Visit Site' on ngrok's warning page" -ForegroundColor Yellow
        Write-Host ""
        
        # Copy to clipboard
        Set-Clipboard -Value $publicUrl
        Write-Host "URL copied to clipboard!" -ForegroundColor Green
        Write-Host ""
    }
} catch {
    Write-Host ""
    Write-Host "Could not get ngrok URL automatically." -ForegroundColor Yellow
    Write-Host "Check the ngrok window or visit http://127.0.0.1:4040 to see your public URL" -ForegroundColor White
    Write-Host ""
    Write-Host "If you see an authentication error:" -ForegroundColor Yellow
    Write-Host "   1. Sign up at https://dashboard.ngrok.com/signup" -ForegroundColor White
    Write-Host "   2. Get your authtoken from https://dashboard.ngrok.com/get-started/your-authtoken" -ForegroundColor White
    Write-Host "   3. Run: ngrok config add-authtoken YOUR_TOKEN" -ForegroundColor White
    Write-Host ""
}

Write-Host "Tip: Keep this terminal open and the ngrok window open to maintain the tunnel" -ForegroundColor Cyan
Write-Host ""

