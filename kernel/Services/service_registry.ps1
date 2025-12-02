param([string]$Name, [string]$Command)

$path = "E:\CIC\WyneOS\Kernel\Services\registry.json"

if (-not (Test-Path $path)) {
    @{} | ConvertTo-Json | Set-Content $path
}

$data = Get-Content $path | ConvertFrom-Json
$data | Add-Member -NotePropertyName $Name -NotePropertyValue $Command -Force
$data | ConvertTo-Json -Depth 10 | Set-Content $path

Write-Host "Service registered: $Name"
