# WyneOS Upgrade Engine
param()

Write-Host "WyneOS Upgrade Engine starting..." -ForegroundColor Cyan

# Load GitHub token
if (-not $env:WYNERGY_GITHUB_TOKEN) {
    Write-Host "ERROR: WYNERGY_GITHUB_TOKEN not set." -ForegroundColor Red
    exit 1
}

$headers = @{
    "Authorization" = "Bearer $env:WYNERGY_GITHUB_TOKEN"
    "User-Agent"    = "WyneOS"
    "Accept"        = "application/vnd.github+json"
}

$upgradeLog = "E:\CIC\WyneOS\System\Upgrade\upgrade.log"

"=== WyneOS Upgrade Run $(Get-Date) ===" | Out-File $upgradeLog -Append

# List repos
$repos = Invoke-RestMethod -Uri "https://api.github.com/user/repos?per_page=200" -Headers $headers

foreach ($repo in $repos) {
    $name = $repo.name
    $vis  = $repo.visibility

    "Checking $name ($vis)" | Out-File $upgradeLog -Append
}

"Upgrade scan complete." | Out-File $upgradeLog -Append

Write-Host "WyneOS Upgrade Engine complete." -ForegroundColor Green

