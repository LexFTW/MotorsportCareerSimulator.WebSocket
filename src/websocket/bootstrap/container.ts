import { WebSocketRealtimeGateway } from "../../infrastructure/realtime/WebsocketRealtimeGateway";

const realtimeGateway = new WebSocketRealtimeGateway();

export const createContainer = () => {
    return {
        realtimeGateway,
    };
};
