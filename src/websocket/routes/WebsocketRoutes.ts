import type { FastifyInstance } from "fastify";
import type { WebSocket } from "ws";
import type { RealtimeEvent } from "../../domain/entities/RealtimeEvent.js";
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

    app.post("/internal/events", async (request, reply) => {
        if (
            request.headers["x-realtime-secret"] !==
            process.env.REALTIME_SECRET
        ) {
            return reply.status(401).send();
        }

        const event = request.body as RealtimeEvent<unknown>;

        realtimeGateway.broadcast(
            event.channel,
            {
                type: event.type,
                payload: event.payload,
            },
        );

        return reply.status(204).send();
    });
}