param([string]$Message)

$log = "E:\CIC\WyneOS\Security\security_events.log"
New-Item -ItemType Directory -Force -Path (Split-Path $log) | Out-Null

@{
    ts = (Get-Date).ToString("u")
    msg = $Message
} | ConvertTo-Json | Add-Content $log

Write-Host "Security log updated."
