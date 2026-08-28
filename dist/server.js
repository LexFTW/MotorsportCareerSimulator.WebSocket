import Fastify from "fastify";
import websocket from "@fastify/websocket";
const fastify = Fastify({ logger: true });
await fastify.register(websocket);
fastify.get("/", { websocket: true }, (socket, req) => {
    socket.on("message", (message) => {
        console.log("Received:", message.toString());
        socket.send("hi from server");
    });
});
try {
    await fastify.listen({
        port: 3001,
        host: "0.0.0.0",
    });
}
catch (error) {
    fastify.log.error(error);
    process.exit(1);
}
//# sourceMappingURL=server.js.map