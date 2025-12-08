$target = "E:\CIC\WyneOS\RuntimeMesh\telemetry\probe_status.json"

$entry = @{
    ts      = (Get-Date).ToString("u")
    status  = "WRML_ACTIVE"
    uptime  = (Get-Uptime).TotalSeconds
}

$entry | ConvertTo-Json | Set-Content $target

Write-Host "Probe OK"
