$root = "E:\CIC\WyneOS\Kernel\Services"
$target = "$root\snapshots\snap_$((Get-Date).ToString('yyyy-MM-dd_HH-mm-ss'))"

New-Item -ItemType Directory -Force -Path $target | Out-Null

Copy-Item $root $target -Recurse -Force
Write-Host "Service snapshot created."
