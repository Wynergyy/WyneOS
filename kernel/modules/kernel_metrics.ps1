$cpu  = (Get-Counter '\Processor(_Total)\% Processor Time').CounterSamples[0].CookedValue
$ram  = (Get-Counter '\Memory\Available MBytes').CounterSamples[0].CookedValue

$entry = @{
    ts  = (Get-Date).ToString("u")
    cpu = [math]::Round($cpu, 2)
    ram = $ram
}

$entry | ConvertTo-Json | Add-Content "E:\CIC\WyneOS\Kernel\kernel_metrics.log"
Write-Host "Kernel metrics captured."
