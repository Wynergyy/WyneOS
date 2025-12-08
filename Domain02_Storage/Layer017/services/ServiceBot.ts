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
