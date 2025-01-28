export interface IDatabase<T = unknown>{
    connect():Promise<void>;
    disconnect():Promise<void>;
    getClient():T;
}