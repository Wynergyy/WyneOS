param([string]$From, [string]$To, [string]$Event)

$log = "E:\CIC\WyneOS\Interlink\telemetry\bridge.log"

$entry = @{
    ts = (Get-Date).ToString("u")
    from = $From
    to = $To
    event = $Event
}

($entry | ConvertTo-Json) | Add-Content $log

Write-Host "[INTERLINK] $From => $To : $Event"
