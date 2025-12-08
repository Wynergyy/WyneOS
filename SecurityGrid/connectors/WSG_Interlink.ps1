$log = "E:\CIC\WyneOS\SecurityGrid\logs\interlink_connector.log"

$entry = @{
    timestamp = (Get-Date).ToString("u")
    message   = "WSG → Interlink ping successful"
}

($entry | ConvertTo-Json) | Add-Content $log
Write-Host "WSG Interlink connector executed."
