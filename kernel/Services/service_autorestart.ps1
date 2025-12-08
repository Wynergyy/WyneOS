$reg = "E:\CIC\WyneOS\Kernel\Services\registry.json"
$log = "E:\CIC\WyneOS\Kernel\Services\service_autorestart.log"

if (-not (Test-Path $reg)) { exit }

$data = Get-Content $reg | ConvertFrom-Json

foreach ($svc in $data.PSObject.Properties.Name) {

    $proc = Get-Process -Name $svc -ErrorAction SilentlyContinue

    if (-not $proc) {
        $cmd = $data.$svc

        $p = Start-Process pwsh -ArgumentList "-Command $cmd" -PassThru
        @{ ts=(Get-Date).ToString("u"); service=$svc; restartPID=$p.Id } |
            ConvertTo-Json | Add-Content $log
    }
}

Write-Host "Auto-restart sweep complete."
