$log = "E:\CIC\WyneOS\SecurityGrid\logs\kernelhooks.log"

$entry = @{
    timestamp = (Get-Date).ToString("u")
    message   = "Kernel hook executed — WyneOS Security Grid"
}

($entry | ConvertTo-Json) | Add-Content $log

Write-Host "Kernel hook event recorded."
