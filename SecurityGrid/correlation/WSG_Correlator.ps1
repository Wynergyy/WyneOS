$events = Get-Content "E:\CIC\WyneOS\SecurityGrid\events\threat_events.json" | ConvertFrom-Json

$groups = $events | Group-Object rule

$report = foreach ($g in $groups) {
    [PSCustomObject]@{
        rule       = $g.Name
        occurrences = $g.Count
        lastSeen   = ($g.Group | Sort-Object timestamp -Descending | Select-Object -First 1).timestamp
    }
}

$path = "E:\CIC\WyneOS\SecurityGrid\correlation\correlation_report.json"
$report | ConvertTo-Json -Depth 5 | Set-Content $path

Write-Host "WSG correlation analysis complete."
