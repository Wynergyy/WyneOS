$root = "E:\CIC\WyneOS\appstore"
$db   = "$root\db\store.apps.json"

$appList = Get-Content $db | ConvertFrom-Json
$appList | ConvertTo-Json
