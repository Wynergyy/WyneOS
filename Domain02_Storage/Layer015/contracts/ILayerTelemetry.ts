export interface ILayerTelemetry {
    health: string;
    errors: string[];
    metrics: Record<string, number>;
    lastAction: number;
}
