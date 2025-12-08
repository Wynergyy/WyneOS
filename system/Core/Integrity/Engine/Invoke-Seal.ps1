param(
    [string]$TargetPath
)

if (-not (Test-Path $TargetPath)) {
    Write-Output "NOT_FOUND"
    exit 1
}

$hash = (Get-FileHash $TargetPath -Algorithm SHA256).Hash
$timestamp = Get-Date -Format o

$seal = @{
    path = $TargetPath
    hash = $hash
    algorithm = "SHA256"
    sealedAt = $timestamp
} | ConvertTo-Json -Depth 10

$fileName = (Split-Path $TargetPath -Leaf) + ".seal.json"
$outPath = "E:\CIC\WyneOS\System\Core\Integrity\Hashes\$fileName"

Set-Content -Path $outPath -Value $seal

Write-Output $outPath
