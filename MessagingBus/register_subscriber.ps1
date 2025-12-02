param(
    [string]$Channel,
    [string]$HandlerScript
)

$reg = "E:\CIC\WyneOS\MessagingBus\subscribers\$Channel.json"

if (-not (Test-Path $reg)) {
    @() | ConvertTo-Json | Out-File $reg
}

$existing = Get-Content $reg | ConvertFrom-Json
$updated  = $existing + $HandlerScript

$updated | ConvertTo-Json | Set-Content $reg

Write-Host "Subscriber registered for channel $Channel."
