param(
    [string]$CertificatePath
)

$raw = Get-Content $CertificatePath -Raw | ConvertFrom-Json
$hash = (Get-FileHash $CertificatePath -Algorithm SHA256).Hash
$raw.signature = $hash

$raw | ConvertTo-Json -Depth 10 | Set-Content $CertificatePath

Write-Output "SIGNED"
