param([string]$Service, [string]$Message)

$log = "E:\CIC\WyneOS\Kernel\Services\service_channel.log"

$bytes = [System.Text.Encoding]::UTF8.GetBytes($Message)
$hash  = [BitConverter]::ToString(
            [System.Security.Cryptography.SHA256]::Create().ComputeHash($bytes)
         ).Replace("-","")

@{
    ts      = (Get-Date).ToString("u")
    service = $Service
    msg     = $Message
    sig     = $hash
} | ConvertTo-Json | Add-Content $log

Write-Host "Channel message sent."
