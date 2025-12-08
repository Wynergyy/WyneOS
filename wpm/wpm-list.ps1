param()

E:\CIC\WyneOS\appstore\api = 'E:\CIC\WyneOS\appstore\api\list-apps.ps1'

if (-not (Test-Path \E:\CIC\WyneOS\appstore\api)) {
    Write-Output '{""error"":""gateway missing""}'
    exit
}

 = pwsh -File \E:\CIC\WyneOS\appstore\api
Write-Output \
