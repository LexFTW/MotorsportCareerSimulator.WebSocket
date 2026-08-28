import Fastify from "fastify";
import websocket from "@fastify/websocket";

const fastify = Fastify({
    logger: true,
});

await fastify.register(websocket);

//
// Health check
//
fastify.get("/health", async () => {
    return {
        status: "ok",
    };
});

//
// WebSocket
//
fastify.get("/ws", { websocket: true }, (socket) => {
    console.log("WebSocket connected");

    socket.on("message", (message: any) => {
        console.log("Received:", message.toString());

        socket.send("hi from server");
    });

    socket.on("close", () => {
        console.log("WebSocket disconnected");
    });
});

//
// Server
//
const port = Number(process.env.PORT ?? 3001);

try {
    await fastify.listen({
        port,
        host: "0.0.0.0",
    });
} catch (error) {
    fastify.log.error(error);
    process.exit(1);
}