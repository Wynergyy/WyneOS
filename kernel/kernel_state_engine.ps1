param([string]$Status)

$path = "E:\CIC\WyneOS\Kernel\kernel_state.json"
$entry = @{
    ts     = (Get-Date).ToString("u")
    status = $Status
}
$entry | ConvertTo-Json -Depth 5 | Set-Content $path
Write-Host "Kernel state updated: $Status"
