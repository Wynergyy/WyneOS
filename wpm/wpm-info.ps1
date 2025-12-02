param([string] \)

if (-not \) {
    Write-Output '{""error"": ""missing id""}'
    exit
}

\E:\CIC\WyneOS\appstore\api = 'E:\CIC\WyneOS\appstore\api\get-app.ps1'

Write-Output (pwsh -File \E:\CIC\WyneOS\appstore\api -AppId \)
