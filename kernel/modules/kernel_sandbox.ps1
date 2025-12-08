param([string]$Cmd)

$log = "E:\CIC\WyneOS\Kernel\kernel_sandbox.log"

try {
    $out = Invoke-Expression $Cmd
    $ok = $true
}
catch {
    $out = $_.Exception.Message
    $ok = $false
}

@{
    ts    = (Get-Date).ToString("u")
    cmd   = $Cmd
    ok    = $ok
    output = $out
} | ConvertTo-Json | Add-Content $log

Write-Host "Sandbox executed."
