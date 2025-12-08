param(
    [string]$Event,
    [string]$Severity = "info",
    [string]$Source = "unknown",
    [hashtable]$Details
)

$log = "E:\CIC\WyneOS\SecurityGrid\logs\security_events.log"

$entry = @{
    event     = $Event
    severity  = $Severity
    source    = $Source
    details   = $Details
    timestamp = (Get-Date).ToString("u")
}

$entry | ConvertTo-Json -Depth 6 | Add-Content $log
Write-Host "WSG Event logged: $Event"
