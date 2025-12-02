# =====================================================================
#  Wynergy Systems – Automated GitHub Repo Security
#  Protect-GitHubRepos.ps1
#  Checks all repos and forces private visibility.
#  Logs actions, issues hash seals, triggers SGI telemetry.
# =====================================================================

param(
    [string]$GitHubUser = "Wynergyy",
    [string]$Token = $env:WYNERGY_GITHUB_TOKEN
)

# ----------------------------
# Validate token
# ----------------------------
if ([string]::IsNullOrWhiteSpace($Token)) {
    Write-Host "ERROR: GitHub token not found. Ensure WYNERGY_GITHUB_TOKEN is set." -ForegroundColor Red
    exit 1
}

$Headers = @{
    "Authorization" = "Bearer $Token"
    "User-Agent"    = "WynergySystems-Automation"
    "Accept"        = "application/vnd.github+json"
}

$ApiBase = "https://api.github.com"

# ----------------------------
# Logging setup
# ----------------------------
$LogRoot = "E:\CIC\Shared\telemetry\github-security"
$LogFile = Join-Path $LogRoot "sec-audit-$(Get-Date -Format yyyy-MM-dd).log"
New-Item -ItemType Directory -Path $LogRoot -Force | Out-Null

function Write-Log {
    param([string]$Message)
    $Line = "$(Get-Date -Format u) | $Message"
    Add-Content -Path $LogFile -Value $Line
}

Write-Log "Starting GitHub security audit..."

# ----------------------------
# Fetch all repositories
# ----------------------------
$Repos = Invoke-RestMethod -Uri "$ApiBase/users/$GitHubUser/repos?per_page=200" -Headers $Headers

foreach ($Repo in $Repos) {

    $Name = $Repo.name
    $IsPrivate = $Repo.private

    if ($IsPrivate -eq $true) {
        Write-Log "OK: $Name is private."
        continue
    }

    # ----------------------------
    # Force repo to private
    # ----------------------------
    Write-Log "WARNING: $Name is PUBLIC – forcing to private."

    $Body = '{"private": true}'

    try {
        Invoke-RestMethod `
            -Uri "$ApiBase/repos/$GitHubUser/$Name" `
            -Headers $Headers `
            -Method Patch `
            -Body $Body | Out-Null

        Write-Log "ACTION: $Name set to private."
    }
    catch {
        Write-Log "ERROR: Could not update $Name – $($_.Exception.Message)"
        continue
    }
}

Write-Log "GitHub security audit complete."

# ----------------------------
# Integrity Seal
# ----------------------------
$SealPath = "$LogFile.sha256"
Get-FileHash -Algorithm SHA256 -Path $LogFile | Select-Object -ExpandProperty Hash |
    Out-File -FilePath $SealPath -Encoding ascii

Write-Log "Integrity seal generated: $SealPath"

# ----------------------------
# SGI Telemetry Trigger
# ----------------------------
$Event = "GitHubSecurityCheckCompleted"
$TelemetryFolder = "E:\CIC\Shared\telemetry\events"
New-Item -ItemType Directory -Path $TelemetryFolder -Force | Out-Null

"$($Event) | $(Get-Date -Format u)" |
    Out-File -FilePath (Join-Path $TelemetryFolder "github.security.event") -Encoding utf8

Write-Log "Telemetry event written."
