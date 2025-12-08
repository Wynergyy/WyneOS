param([string]$AppId)

$root = "E:\CIC\WyneOS\appstore"
$db   = "$root\db\store.apps.json"

if (-not $AppId) {
    Write-Output "{ ""error"": ""missing app id"" }"
    exit
}

$appList = Get-Content $db | ConvertFrom-Json

$match = $appList | Where-Object { $_.id -eq $AppId }

if (-not $match) {
    Write-Output "{ ""error"": ""not found"" }"
    exit
}

$match | ConvertTo-Json -Depth 5
