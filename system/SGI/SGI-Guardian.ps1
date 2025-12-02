# SGI Guardian – Wynergy Self-Healing System
Write-Host "SGI Guardian starting..." -ForegroundColor Cyan

$log = "E:\CIC\Shared\telemetry\sgi-guardian.log"
$timestamp = (Get-Date).ToString("yyyy-MM-dd HH:mm:ss")

function Log($msg) {
    "$timestamp $msg" | Out-File $log -Append
}

Log "Guardian run started."

# --- Check GitHub Protection Task ---
$protectionTask = Get-ScheduledTask -TaskName "Wynergy-GitHub-Repo-Protection" -ErrorAction SilentlyContinue

if (-not $protectionTask) {
    Log "PROTECTION_TASK_MISSING – recreating."
    $Action = New-ScheduledTaskAction -Execute "pwsh.exe" -Argument "-File `\"E:\CIC\WyneOS\System\Security\Automation\Protect-GitHubRepos.ps1`\""
    $Trigger = New-ScheduledTaskTrigger -Once -At (Get-Date).AddMinutes(2) -RepetitionInterval (New-TimeSpan -Hours 1)
    Register-ScheduledTask -TaskName "Wynergy-GitHub-Repo-Protection" -Action $Action -Trigger $Trigger
    Log "PROTECTION_TASK_RESTORED"
} else {
    Log "Protection task OK."
}

# --- Check Upgrade Task ---
$upgradeTask = Get-ScheduledTask -TaskName "WyneOS-AutoUpgrade" -ErrorAction SilentlyContinue

if (-not $upgradeTask) {
    Log "UPGRADE_TASK_MISSING – recreating."
    $Action = New-ScheduledTaskAction -Execute "pwsh.exe" -Argument "-File `\"E:\CIC\WyneOS\System\Upgrade\Invoke-WyneOSUpgrade.ps1`\""
    $Trigger = New-ScheduledTaskTrigger -Once -At (Get-Date).AddMinutes(2) -RepetitionInterval (New-TimeSpan -Hours 2)
    Register-ScheduledTask -TaskName "WyneOS-AutoUpgrade" -Action $Action -Trigger $Trigger
    Log "UPGRADE_TASK_RESTORED"
} else {
    Log "Upgrade task OK."
}

Log "Guardian run complete."
Write-Host "SGI Guardian complete." -ForegroundColor Green
