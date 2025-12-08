$ruleDir = "E:\CIC\WyneOS\SecurityGrid\rules\active"
$eventLog = "E:\CIC\WyneOS\SecurityGrid\events\WSG_EventLog.ps1"

foreach ($ruleFile in Get-ChildItem $ruleDir -File) {
    $rule = Get-Content $ruleFile.FullName | ConvertFrom-Json

    $result = Invoke-Expression $rule.condition

    if ($result -eq $true) {
        & $eventLog -Event $rule.name -Severity $rule.severity -Source "WSG-RuleEngine" -Details @{
            rule = $rule.name
            desc = $rule.description
        }
    }
}

Write-Host "WSG Rule Engine complete."
