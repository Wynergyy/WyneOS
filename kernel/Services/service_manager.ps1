param([string]$Name, [string]$Cmd, [string]$Action)

$log = "E:\CIC\WyneOS\Kernel\Services\service_manager.log"

switch ($Action) {
    "start" {
        $p = Start-Process pwsh -ArgumentList "-Command $Cmd" -PassThru
        $msg = "Started $Name PID=$($p.Id)"
    }
    "stop" {
        Stop-Process -Name $Name -Force -ErrorAction SilentlyContinue
        $msg = "Stopped $Name"
    }
    "status" {
        $proc = Get-Process -Name $Name -ErrorAction SilentlyContinue
        if ($proc) { $msg = "$Name RUNNING PID=$($proc.Id)" }
        else { $msg = "$Name NOT RUNNING" }
    }
    default { $msg = "Invalid action" }
}

@{ ts=(Get-Date).ToString("u"); name=$Name; action=$Action; cmd=$Cmd; msg=$msg } |
    ConvertTo-Json | Add-Content $log

Write-Host $msg
