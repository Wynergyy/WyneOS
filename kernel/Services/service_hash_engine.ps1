param([string]$Service)

$path = "E:\CIC\WyneOS\Kernel\Services\registry.json"
$log  = "E:\CIC\WyneOS\Kernel\Services\service_hashes.json"

$data = Get-Content $path | ConvertFrom-Json
$cmd  = $data.$Service

$bytes = [System.Text.Encoding]::UTF8.GetBytes($cmd)
$hash  = [BitConverter]::ToString(
            [System.Security.Cryptography.SHA256]::Create().ComputeHash($bytes)
         ).Replace("-","")

@{ ts=(Get-Date).ToString("u"); service=$Service; hash=$hash } |
    ConvertTo-Json | Add-Content $log

Write-Host "Hash generated for $Service."
