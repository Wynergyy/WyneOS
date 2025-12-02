$timestamp = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
"$timestamp | ENFORCEMENT EVENT: " | Add-Content "E:\CIC\WyneOS\System\Core\Enforcement\Logs\enforcement.log"
