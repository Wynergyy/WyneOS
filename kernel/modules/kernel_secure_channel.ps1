param([string]$Message)

$bytes = [System.Text.Encoding]::UTF8.GetBytes($Message)
$hash  = [BitConverter]::ToString(
            [System.Security.Cryptography.SHA256]::Create().ComputeHash($bytes)
         ).Replace("-","")

@{
    ts    = (Get-Date).ToString("u")
    msg   = $Message
    secure = $hash
} | ConvertTo-Json | Add-Content "E:\CIC\WyneOS\Kernel\kernel_secure_channel.log"

Write-Host "Secure channel message recorded."
