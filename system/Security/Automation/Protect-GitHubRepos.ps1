# =====================================================================
# Wynergy Systems – GitHub Repo Protection Automation
# Ensures all repositories remain PRIVATE
# Logs every action to SGI / WyneOS telemetry
# =====================================================================

# Load token from environment variable
$token = $env:WYNERGY_GITHUB_TOKEN
if (-not $token -or $token -eq "") {
    Write-Host "ERROR: WYNERGY_GITHUB_TOKEN not set." -ForegroundColor Red
    exit 1
}

$headers = @{
    "Authorization" = "Bearer $token"
    "User-Agent"    = "WynergySystems-Automation"
    "Accept"        = "application/vnd.github+json"
}

$apiBase = "https://api.github.com"

# Get all repos for authenticated user
try {
    $repos = Invoke-RestMethod -Uri "$apiBase/user/repos?per_page=200" -Headers $headers
}
catch {
    Write-Host "Failed to fetch repos. Check token or connection." -ForegroundColor Red
    exit 1
}

# Telemetry log path
$logPath = "E:\CIC\Shared\telemetry\github-protection.log"
$timestamp = (Get-Date).ToString("yyyy-MM-dd HH:mm:ss")

foreach ($repo in $repos) {

    $repoName = $repo.name
    $isPrivate = $repo.private

    if ($isPrivate -eq $true) {
        Add-Content -Path $logPath -Value "$timestamp OK $repoName already private"
        continue
    }

    # Attempt to set repo private
    $body = '{"private": true}'
    try {
        Invoke-RestMethod -Uri "$apiBase/repos/$($repo.owner.login)/$repoName" -Headers $headers -Method Patch -Body $body
        Add-Content -Path $logPath -Value "$timestamp FIXED $repoName set to PRIVATE"
    }
    catch {
        Add-Content -Path $logPath -Value "$timestamp ERROR failed to secure $repoName"
    }
}

# Final seal
$sealLine = "$timestamp SECURITY_RUN_COMPLETE"
Add-Content -Path $logPath -Value $sealLine

Write-Host "GitHub protection run complete."
