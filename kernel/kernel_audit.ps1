param([string]$Message)

$log = "E:\CIC\WyneOS\Kernel\kernel_audit.log"

@{
    ts  = (Get-Date).ToString("u")
    msg = $Message
} | ConvertTo-Json | Add-Content $log
