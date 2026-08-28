import { WebSocketRealtimeGateway } from "../../infrastructure/realtime/WebsocketRealtimeGateway.js";

const realtimeGateway = new WebSocketRealtimeGateway();

export const createContainer = () => {
    return {
        realtimeGateway,
    };
};
