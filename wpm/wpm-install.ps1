param([string] \)

if (-not \) {
    Write-Output '{""error"": ""missing id""}'
    exit
}

\E:\CIC\WyneOS\appstore\api = 'E:\CIC\WyneOS\appstore\api\install-app.ps1'
if (-not (Test-Path \E:\CIC\WyneOS\appstore\api)) {
    Write-Output '{""error"":""gateway missing""}'
    exit
}

Write-Output (pwsh -File \E:\CIC\WyneOS\appstore\api -AppId \)
