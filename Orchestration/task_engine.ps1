param([string]$TaskName, [string]$Cmd)

$log = "E:\CIC\WyneOS\Orchestration\tasks.log"

$p = Start-Process pwsh -ArgumentList "-Command $Cmd" -PassThru

@{
    ts     = (Get-Date).ToString("u")
    task   = $TaskName
    pid    = $p.Id
    cmd    = $Cmd
} | ConvertTo-Json | Add-Content $log

Write-Host "Task started: $TaskName"
