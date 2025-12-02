param()

\ = 'E:\CIC\WyneOS\appstore\manifests\appstore_integrity_seal.txt'

if (-not (Test-Path \)) {
    Write-Output '{""error"":""seal missing""}'
    exit
}

\D8E6F71E3ADC1CA6DC49DAC6B9A2A6E10DD59D4A85DF86EA5833E733BB661606 = Get-Content \ -Raw

Write-Output ('{""seal"":""' + \D8E6F71E3ADC1CA6DC49DAC6B9A2A6E10DD59D4A85DF86EA5833E733BB661606 + '""}')
