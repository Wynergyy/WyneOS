$root = "C:\WyneOS"

# Iterate through all domain folders
$domains = Get-ChildItem -Directory $root | Where-Object { $_.Name -like "Domain*" }

foreach ($domain in $domains) {
    $layers = Get-ChildItem -Directory $domain.FullName | Where-Object { $_.Name -like "Layer*" }
    
    foreach ($layer in $layers) {
        $servicePath = Join-Path $layer.FullName "services"
        if (-Not (Test-Path $servicePath)) { New-Item -ItemType Directory -Force -Path $servicePath | Out-Null }

        # TypeScript ServiceBot template using proper here-string
        $serviceBotContent = @"
import { ILayerServiceBot } from '../contracts/ILayerServiceBot';
import { ILayerTelemetry } from '../contracts/ILayerTelemetry';

export class ServiceBot implements ILayerServiceBot {
    private layerId: number;
    private telemetry: ILayerTelemetry;

    constructor(layerId: number, telemetry: ILayerTelemetry) {
        this.layerId = layerId;
        this.telemetry = telemetry;
    }

    async run(): Promise<void> {
        // TODO: Implement layer-specific service logic
        this.telemetry.lastAction = Date.now();
    }

    reportState(): ILayerTelemetry {
        return this.telemetry;
    }
}
"@

        # Write the file
        $filePath = Join-Path $servicePath "ServiceBot.ts"
        Set-Content -Path $filePath -Value $serviceBotContent
    }
}
