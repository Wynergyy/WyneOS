param()

$registry = Get-Content "E:\CIC\WyneOS\System\Core\SystemModel\Registry\system.registry.json" -Raw | ConvertFrom-Json
$timestamp = Get-Date -Format o

$snapshot = @{
    timestamp = $timestamp
    components = $registry.components
}

$path = "E:\CIC\WyneOS\System\Core\SystemModel\State\snapshot_20251123_212910.json"
$snapshot | ConvertTo-Json -Depth 10 | Set-Content $path

Write-Output $path
