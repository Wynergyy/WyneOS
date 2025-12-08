$domainPath = "C:\WyneOS\Domain01_Runtime"
$layers = Get-ChildItem -Directory $domainPath

foreach ($layer in $layers) {
    $servicePath = Join-Path $layer.FullName "services"
    if (-Not (Test-Path $servicePath)) { New-Item -ItemType Directory -Force -Path $servicePath | Out-Null }

    $serviceBot = @"
// ServiceBot.ts
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
"
    Set-Content -Path (Join-Path $servicePath "ServiceBot.ts") -Value $serviceBot
}
