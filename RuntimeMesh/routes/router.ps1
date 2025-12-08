param([string]$Source, [string]$Target, [string]$Message)

$log = "E:\CIC\WyneOS\RuntimeMesh\telemetry\router.log"

$entry = @{
    ts      = (Get-Date).ToString("u")
    from    = $Source
    to      = $Target
    message = $Message
}

($entry | ConvertTo-Json) | Add-Content $log

Write-Host "[ROUTED] $Source -> $Target : $Message"
