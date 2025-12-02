$src  = "E:\CIC\WyneOS\Execution\events\incoming"
$dest = "E:\CIC\WyneOS\Execution\events\processed"
$log  = "E:\CIC\WyneOS\Execution\logs\event_router.log"

New-Item -ItemType Directory -Force -Path $src | Out-Null
New-Item -ItemType Directory -Force -Path $dest | Out-Null

function Log($msg) {
    @{ ts=(Get-Date).ToString("u"); event=$msg } |
        ConvertTo-Json | Add-Content $log
}

$files = Get-ChildItem $src -File

foreach ($f in $files) {
    try {
        $content = Get-Content $f.FullName -Raw
        Log "EVENT_ROUTED: $($f.Name)"
        Move-Item $f.FullName "$dest\$($f.Name)" -Force
    }
    catch {
        Log "EVENT_FAIL: $($f.Name)"
    }
}

Write-Host "Event routing complete."
