import { SESSION_CLIENT_CMD, ServerMessage, SessionUser } from "../../types";
import commandHandlerMap from "./handlers";
import { SessionSetState } from "./sessionSlice";

const connect = (url: string, identity: SessionUser, set: SessionSetState) => {
  set({ sessionLoading: true, sessionError: null });

  const socket = new WebSocket(url);

  socket.onopen = () => {
    set({ socket, sessionLoading: false });

    const msg = { type: SESSION_CLIENT_CMD.Handshake, payload: identity };
    socket.send(JSON.stringify(msg));
  };

  socket.onmessage = (e) => {
    const message: ServerMessage = JSON.parse(e.data);
    if (message) {
      const handler = commandHandlerMap[message.type];
      handler(set, message.payload);
    }
  };

  socket.onerror = (e) => {
    console.log("WebSocket error", e);
    set({
      sessionLoading: false,
      sessionError: "Failed to join session: Please try again",
    });
  };

  socket.onclose = (e) => {
    if (e.code === 1000) {
      console.log("WebSocket closed cleanly");
    } else {
      console.log("WebSocket connection closed:", e);
    }
    set({ socket: null });
  };
};

const client = {
  connect,
};

export default client;
