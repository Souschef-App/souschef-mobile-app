import { ServerMessage } from "../../types";
import commandHandlerMap from "./handlers";
import { SessionSetState } from "./sessionSlice";

const initListeners = (set: SessionSetState, socket: WebSocket) => {
  socket.onopen = () => {
    console.log("WebSocket connected");
    set({ socket, sessionLoading: false });
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

export const listeners = {
  init: initListeners,
};
