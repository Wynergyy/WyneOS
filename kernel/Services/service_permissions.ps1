param([string]$Service, [string]$Level)

$path = "E:\CIC\WyneOS\Kernel\Services\permissions.json"

if (-not (Test-Path $path)) {
    @{} | ConvertTo-Json | Set-Content $path
}

$data = Get-Content $path | ConvertFrom-Json
$data | Add-Member -NotePropertyName $Service -NotePropertyValue $Level -Force
$data | ConvertTo-Json -Depth 10 | Set-Content $path

Write-Host "Permissions assigned: $Service => $Level"
