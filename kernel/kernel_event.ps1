param([string]$Event)

& "E:\CIC\WyneOS\Kernel\kernel_audit.ps1" "EVENT: $Event"
Write-Host "Kernel event triggered: $Event"
