param(
    [string]$Rule,
    [string]$Severity
)

$path = "E:\CIC\WyneOS\SecurityGrid\events\threat_events.json"

$events = Get-Content $path | ConvertFrom-Json
$events += [PSCustomObject]@{
    timestamp = (Get-Date).ToString("u")
    rule      = $Rule
    severity  = $Severity
}

$events | ConvertTo-Json -Depth 5 | Set-Content $path
