import type { WebSocket } from "ws";

export interface RealtimeGateway {
    subscribe(channel: string, socket: WebSocket): void;
    broadcast(channel: string, message: unknown): void;
}