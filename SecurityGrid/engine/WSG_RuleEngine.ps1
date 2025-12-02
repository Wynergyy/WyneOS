param(
    [string]$RulePath
)

if (-not (Test-Path $RulePath)) {
    Write-Host "Rule file not found." -ForegroundColor Red
    exit 1
}

$rule = Get-Content $RulePath | ConvertFrom-Json
$condition = $rule.condition

try {
    $result = Invoke-Expression $condition
} catch {
    $result = $false
}

$log = "E:\CIC\WyneOS\SecurityGrid\logs\engine.log"
@{
    timestamp = (Get-Date).ToString("u")
    rule      = $rule.name
    severity  = $rule.severity
    result    = $result
} | ConvertTo-Json | Add-Content $log

Write-Host "WSG engine evaluated rule: $($rule.name) => $result"
