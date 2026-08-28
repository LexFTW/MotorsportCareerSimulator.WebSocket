export interface RealtimeEvent<T = unknown> {
    type: string;
    channel: string;
    payload: T;
}