$root = "C:\WyneOS"
$phases = 2..10

foreach ($phase in $phases) {
    $domainName = "Domain0$phase"  # Adjust naming if required
    $domainPath = Join-Path $root $domainName
    if (-Not (Test-Path $domainPath)) { New-Item -ItemType Directory -Force -Path $domainPath | Out-Null }

    # Create 10 layers per domain
    for ($layerNum = 1; $layerNum -le 10; $layerNum++) {
        $layerName = "Layer{0:D3}" -f (($phase - 1) * 10 + $layerNum)
        $layerPath = Join-Path $domainPath $layerName
        if (-Not (Test-Path $layerPath)) { New-Item -ItemType Directory -Force -Path $layerPath | Out-Null }

        # ---- ServiceBots ----
        $servicePath = Join-Path $layerPath "services"
        if (-Not (Test-Path $servicePath)) { New-Item -ItemType Directory -Force -Path $servicePath | Out-Null }

        $serviceBotContent = @"
import { ILayerServiceBot } from '../../contracts/ILayerServiceBot';
import { ILayerTelemetry } from '../../contracts/ILayerTelemetry';

export class ServiceBot implements ILayerServiceBot {
    private layerId: number;
    private telemetry: ILayerTelemetry;

    constructor(layerId: number, telemetry: ILayerTelemetry) {
        this.layerId = layerId;
        this.telemetry = telemetry;
    }

    async run(): Promise<void> {
        this.telemetry.lastAction = Date.now();
    }

    reportState(): ILayerTelemetry {
        return this.telemetry;
    }
}
"@
        $serviceFile = Join-Path $servicePath "ServiceBot.ts"
        Set-Content -Path $serviceFile -Value $serviceBotContent

        # ---- GuardianBots ----
        $guardPath = Join-Path $layerPath "guards"
        if (-Not (Test-Path $guardPath)) { New-Item -ItemType Directory -Force -Path $guardPath | Out-Null }

        $guardianBotContent = @"
import { ILayerGuardianBot } from '../../contracts/ILayerGuardianBot';

export class GuardianBot implements ILayerGuardianBot {
    private layerId: number;

    constructor(layerId: number) {
        this.layerId = layerId;
    }

    async validate(): Promise<boolean> {
        return true;
    }

    async enforce(): Promise<void> {
    }
}
"@
        $guardFile = Join-Path $guardPath "GuardianBot.ts"
        Set-Content -Path $guardFile -Value $guardianBotContent

        # ---- Inter-layer Signals ----
        $signalPath = Join-Path $layerPath "signals"
        if (-Not (Test-Path $signalPath)) { New-Item -ItemType Directory -Force -Path $signalPath | Out-Null }

        $signalContent = @"
import { IServiceSignal } from '../../contracts/IServiceSignal';

export class ServiceSignal implements IServiceSignal {
    private layerId: number;

    constructor(layerId: number) {
        this.layerId = layerId;
    }

    async send(targetLayerId: number, payload: any): Promise<void> {
        console.log(\`Signal from layer \${this.layerId} to \${targetLayerId}: \`, payload);
    }

    async receive(): Promise<any> {
        return null;
    }
}
"@
        $signalFile = Join-Path $signalPath "ServiceSignal.ts"
        Set-Content -Path $signalFile -Value $signalContent
    }

    # ---- Create a branch for this phase ----
    cd $root
    git checkout -b "phase$phase"
    git add $domainPath
    git commit -m "Phase $phase: ServiceBots, GuardianBots, and Signals"
    git push origin "phase$phase"
}
