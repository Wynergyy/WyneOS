param(
    [string]$Source,
    [string]$Key,
    [string]$Value
)

$bus = "E:\CIC\WyneOS\Convergence\state\bus.json"

$entry = @{
    ts     = (Get-Date).ToString("u")
    source = $Source
    key    = $Key
    value  = $Value
}

$data = @()

if (Test-Path $bus) {
    try { $data = Get-Content $bus | ConvertFrom-Json } catch {}
}

$data += $entry
$data | ConvertTo-Json -Depth 5 | Set-Content $bus

Write-Host "[BUS] $Source set $Key = $Value"
