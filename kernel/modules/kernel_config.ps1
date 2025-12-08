param([string]$Key, [string]$Value)

$cfgPath = "E:\CIC\WyneOS\Kernel\kernel_config.json"

if (-not (Test-Path $cfgPath)) {
    @{} | ConvertTo-Json | Set-Content $cfgPath
}

$data = Get-Content $cfgPath | ConvertFrom-Json
$data | Add-Member -NotePropertyName $Key -NotePropertyValue $Value -Force

$data | ConvertTo-Json -Depth 10 | Set-Content $cfgPath

Write-Host "Config updated: $Key = $Value"
