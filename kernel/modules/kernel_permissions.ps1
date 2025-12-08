param([string]$Module, [string]$Level)

$path = "E:\CIC\WyneOS\Kernel\kernel_permissions.json"

if (-not (Test-Path $path)) {
    @{} | ConvertTo-Json | Set-Content $path
}

$data = Get-Content $path | ConvertFrom-Json
$data | Add-Member -NotePropertyName $Module -NotePropertyValue $Level -Force

$data | ConvertTo-Json -Depth 10 | Set-Content $path

Write-Host "Permission applied: $Module => $Level"
