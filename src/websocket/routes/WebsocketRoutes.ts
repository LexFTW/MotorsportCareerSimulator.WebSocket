import type { FastifyInstance } from "fastify";
import type { WebSocket } from "ws";
import "@fastify/websocket";

import type { RealtimeGateway } from "../../domain/patterns/RealtimeGateway.js";

export async function websocketRoutes(
    app: FastifyInstance,
    realtimeGateway: RealtimeGateway,
) {
    app.get(
        "/ws/leagues/:id",
        {
            websocket: true,
        },
        (socket: WebSocket, request: any) => {
            const channel = `league:${request.params.id}`;

            realtimeGateway.subscribe(channel, socket);
        },
    );
}