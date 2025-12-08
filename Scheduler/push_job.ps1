param([string]$Job)

$queue = "E:\CIC\WyneOS\Scheduler\queue"
$file  = "$queue\job_$((Get-Date).ToString('yyyyMMdd_HHmmssfff')).json"

@{
    job = $Job
    ts  = (Get-Date).ToString("u")
} | ConvertTo-Json | Set-Content $file

Write-Host "Job $Job queued."
