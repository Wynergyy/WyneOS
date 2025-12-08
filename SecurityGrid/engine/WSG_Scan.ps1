$rules = Get-ChildItem "E:\CIC\WyneOS\SecurityGrid\rules\active" -File

foreach ($rule in $rules) {
    pwsh -File "E:\CIC\WyneOS\SecurityGrid\engine\WSG_RuleEngine.ps1" -RulePath $rule.FullName
}

Write-Host "WSG scan complete."
