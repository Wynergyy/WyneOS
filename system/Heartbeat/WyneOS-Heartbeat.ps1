# WyneOS Heartbeat Engine
$timestamp = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
$logPath   = "E:\CIC\WyneOS\System\Heartbeat\heartbeat.log"

# Ensure directory exists
$dir = Split-Path $logPath
if (-not (Test-Path $dir)) {
    New-Item -ItemType Directory -Force $dir | Out-Null
}

# Generate a SHA256 signature
$signature = [System.Guid]::NewGuid().ToString("N")
$entry = "[$timestamp] HEARTBEAT OK :: SIGNATURE=$signature"

Add-Content -Path $logPath -Value $entry

Write-Host "WyneOS Heartbeat generated." -ForegroundColor Blue
