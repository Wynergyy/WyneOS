$reg = "E:\CIC\WyneOS\Kernel\Services\registry.json"
$log = "E:\CIC\WyneOS\Kernel\Services\service_health.log"

if (-not (Test-Path $reg)) { exit }

$data = Get-Content $reg | ConvertFrom-Json

foreach ($svc in $data.PSObject.Properties.Name) {
    $proc = Get-Process -Name $svc -ErrorAction SilentlyContinue
    $healthy = $proc -ne $null

    @{ ts=(Get-Date).ToString("u"); service=$svc; healthy=$healthy } |
        ConvertTo-Json | Add-Content $log
}

Write-Host "Health scan complete."
