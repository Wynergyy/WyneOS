Write-Host "SGI Integrity Engine starting..."

$TargetPath = "E:\CIC"
$LogPath = "E:\CIC\WyneOS\System\SGI\Integrity\integrity_log.jsonl"

$hashes = Get-ChildItem -Recurse $TargetPath -File | ForEach-Object {
    $h = Get-FileHash $_.FullName -Algorithm SHA256
    [PSCustomObject]@{
        File       = $h.Path
        Hash       = $h.Hash
        Timestamp  = (Get-Date).ToString("o")
    }
}

$hashes | ConvertTo-Json -Depth 4 | Out-File $LogPath -Append -Encoding utf8

Write-Host "SGI Integrity Engine complete."
