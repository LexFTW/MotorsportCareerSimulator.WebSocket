import type { WebSocket } from "ws";
import type { RealtimeGateway } from "../../domain/patterns/RealtimeGateway.js";

export class WebSocketRealtimeGateway implements RealtimeGateway {
    private readonly channels = new Map<string, Set<WebSocket>>();

    subscribe(channel: string, socket: WebSocket): void {
        console.log(`Subscribing socket to channel ${channel}`);

        let sockets = this.channels.get(channel);

        if (!sockets) {
            sockets = new Set<WebSocket>();
            this.channels.set(channel, sockets);
        }

        sockets.add(socket);

        socket.on("close", () => {
            sockets!.delete(socket);

            if (sockets!.size === 0) {
                this.channels.delete(channel);
            }
        });
    }

    broadcast(channel: string, message: unknown): void {
        const sockets = this.channels.get(channel);

        if (!sockets) {
            return;
        }

        const payload = JSON.stringify(message);

        for (const socket of sockets) {
            if (socket.readyState === socket.OPEN) {
                socket.send(payload);
            }
        }
    }
}