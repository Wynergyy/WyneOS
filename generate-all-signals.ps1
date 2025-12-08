$root = "C:\WyneOS"

# Iterate through all domain folders
$domains = Get-ChildItem -Directory $root | Where-Object { $_.Name -like "Domain*" }

foreach ($domain in $domains) {
    $layers = Get-ChildItem -Directory $domain.FullName | Where-Object { $_.Name -like "Layer*" }

    foreach ($layer in $layers) {
        $signalPath = Join-Path $layer.FullName "signals"
        if (-Not (Test-Path $signalPath)) { New-Item -ItemType Directory -Force -Path $signalPath | Out-Null }

        $signalContent = @"
import { IServiceSignal } from '../contracts/IServiceSignal';

export class ServiceSignal implements IServiceSignal {
    private layerId: number;

    constructor(layerId: number) {
        this.layerId = layerId;
    }

    async send(targetLayerId: number, payload: any): Promise<void> {
        // TODO: Implement cross-layer communication
        console.log(\`Signal from layer \${this.layerId} to \${targetLayerId}: \`, payload);
    }

    async receive(): Promise<any> {
        // TODO: Implement signal receiving logic
        return null;
    }
}
"@

        $filePath = Join-Path $signalPath "ServiceSignal.ts"
        Set-Content -Path $filePath -Value $signalContent
    }
}
