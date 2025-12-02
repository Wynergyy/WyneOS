param(
    [string]$AppName
)

$certPath = "E:\CIC\WyneOS\System\Core\Certificates\Apps\$AppName.capability.cert"

if (-not (Test-Path $certPath)) {
    Write-Output "CERT_NOT_FOUND"
    exit 1
}

Write-Output $certPath
exit 0
