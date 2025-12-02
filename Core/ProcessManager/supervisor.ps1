while ($true) {
    & "E:\CIC\WyneOS\Core\ProcessManager\auto_recovery.ps1"
    & "E:\CIC\WyneOS\Core\ProcessManager\heartbeat.ps1"
    Start-Sleep -Seconds 30
}
