$ts = (Get-Date).ToString("u")

$status = @{
    timestamp = $ts
    kernel    = (Test-Path "E:\CIC\WyneOS\Kernel")
    mesh      = (Test-Path "E:\CIC\WyneOS\RuntimeMesh")
    services  = (Test-Path "E:\CIC\WyneOS\Services")
    security  = (Test-Path "E:\CIC\WyneOS\Security")
}

$status | ConvertTo-Json | 
    Set-Content "E:\CIC\WyneOS\Interlink\telemetry\health.json"

Write-Host "Interlink health OK"
