param([string]$AppId)

$root = "E:\CIC\WyneOS\appstore"
$db   = "$root\db\store.apps.json"

if (-not $AppId) {
    Write-Output "{ ""error"": ""missing app id"" }"
    exit
}

$appList = Get-Content $db | ConvertFrom-Json

if ($appList -contains $AppId) {
    Write-Output "{ ""status"": ""already installed"" }"
    exit
}

$updated = $appList + $AppId
$updated | ConvertTo-Json | Set-Content $db

Write-Output "{ ""status"": ""installed"", ""id"": ""$AppId"" }"
