$root = "E:\CIC\WyneOS"
$log  = "E:\CIC\WyneOS\Services\integrity_monitor.json"

$data = Get-ChildItem $root -Recurse -File | ForEach-Object {
    try { Get-Content $_.FullName -Raw } catch {}
} | Out-String

$hash = [BitConverter]::ToString(
            [System.Security.Cryptography.SHA512]::Create().ComputeHash(
            [System.Text.Encoding]::UTF8.GetBytes($data))
        ).Replace("-","")

@{
    ts = (Get-Date).ToString("u")
    hash = $hash
} | ConvertTo-Json | Add-Content $log

Write-Host "Integrity check complete."
