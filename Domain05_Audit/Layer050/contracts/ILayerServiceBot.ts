export interface ILayerServiceBot {
    run(): Promise<void>;
    reportState(): any;
}
