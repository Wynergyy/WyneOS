param(
    [string]$PolicyPath,
    [string]$Action,
    [string]$Component
)

$policy = Get-Content $PolicyPath -Raw | ConvertFrom-Json

if ($policy.deniedActions -contains $Action) {
    Write-Output "DENIED"
    exit 1
}

if (($policy.allowedActions.Count -gt 0) -and -not ($policy.allowedActions -contains $Action)) {
    Write-Output "UNAUTHORISED"
    exit 1
}

Write-Output "ALLOWED"
exit 0
