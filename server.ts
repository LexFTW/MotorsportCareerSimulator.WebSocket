import Fastify from "fastify";
import websocket from "@fastify/websocket";

import { createContainer } from "./container.js";
import { websocketRoutes } from "./src/websocket/routes/WebsocketRoutes.js";

const fastify = Fastify({
    logger: true,
});

await fastify.register(websocket);

const container = createContainer();

await websocketRoutes(
    fastify,
    container.realtimeGateway,
);

fastify.get("/health", async () => {
    return {
        status: "ok",
    };
});

const port = Number(process.env.PORT ?? 3000);

try {
    await fastify.listen({
        port,
        host: "0.0.0.0",
    });
} catch (error) {
    fastify.log.error(error);
    process.exit(1);
}