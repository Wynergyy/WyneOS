param([string]$ProcessName)

$running = Get-Process | Where-Object { $_.Path -like "*pwsh*" -and $_.CommandLine -like "*$ProcessName*" }

if ($running) {
    Write-Host "$ProcessName is running."
} else {
    Write-Host "$ProcessName is NOT running."
}
