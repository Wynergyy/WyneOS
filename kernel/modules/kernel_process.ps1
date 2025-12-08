param([string]$Process, [string]$Action)

$log = "E:\CIC\WyneOS\Kernel\kernel_process.log"

switch ($Action) {
    "start" {
        Start-Process $Process
        $msg = "Started $Process"
    }
    "stop" {
        Stop-Process -Name $Process -Force -ErrorAction SilentlyContinue
        $msg = "Stopped $Process"
    }
    default {
        $msg = "Invalid action for $Process"
    }
}

@{ ts=(Get-Date).ToString("u"); action=$Action; process=$Process; msg=$msg } |
    ConvertTo-Json | Add-Content $log

Write-Host $msg
