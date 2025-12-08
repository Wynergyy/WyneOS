Write-Host "WyneOS State Monitor running..." -ForegroundColor Green

$statePath = "E:\CIC\WyneOS\System\State\snapshots"
if (-not (Test-Path $statePath)) { New-Item -ItemType Directory -Force $statePath | Out-Null }

# Collect subsystem statuses (lightweight heartbeat checks)
$subsystems = @(
    @{ name = "RepoProtection";   script = "E:\CIC\WyneOS\System\Security\Automation\Protect-GitHubRepos.ps1" }
    @{ name = "UpgradeEngine";    script = "E:\CIC\WyneOS\System\Upgrade\Invoke-WyneOSUpgrade.ps1" }
    @{ name = "SGIGuardian";      script = "E:\CIC\WyneOS\System\SGI\SGI-Guardian.ps1" }
    @{ name = "IntegrityEngine";  script = "E:\CIC\WyneOS\System\SGI\Integrity\SGI-IntegrityScan.ps1" }
    @{ name = "EventBus";         script = "E:\CIC\WyneOS\System\EventBus\WyneOS-EventBus.ps1" }
)

$status = foreach ($s in $subsystems) {
    [pscustomobject]@{
        name      = $s.name
        exists    = Test-Path $s.script
        timestamp = (Get-Date).ToString("s")
    }
}

$snapshot = @{
    generated_at = (Get-Date).ToString("s")
    subsystems   = $status
}

$snapshot | ConvertTo-Json -Depth 5 | Out-File "$statePath\state_$((Get-Date).ToFileTime()).json"

Write-Host "Snapshot written."
