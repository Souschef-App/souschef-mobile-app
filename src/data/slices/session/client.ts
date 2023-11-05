import { SESSION_CLIENT_CMD, ServerMessage, SessionUser } from "../../types";
import messageHandlerMap from "./handlers";
import { SessionSetState } from "./sessionSlice";

abstract class ZustandStoreAccess {
  protected set: SessionSetState;

  constructor(set: SessionSetState) {
    this.set = set;
  }
}

export class Client extends ZustandStoreAccess {
  private socket: WebSocket | null;

  constructor(set: SessionSetState) {
    super(set);
    this.socket = null;
  }

  connect(url: string, identity: SessionUser) {
    this.leave(); // Severe any ongoing connection
    this.set({ sessionLoading: true, sessionError: null });
    this.socket = new WebSocket(url);
    this.configureSocket(this.socket, identity);
  }

  leave() {
    if (this.socket && !this.socket.CLOSED) {
      this.socket.close();
      this.socket = null;
    }
  }

  sendCommand(commandType: string) {
    if (this.socket?.OPEN) {
      const command = { type: commandType };
      this.socket.send(JSON.stringify(command));
    }
  }

  private configureSocket(socket: WebSocket, identity: SessionUser) {
    socket.onopen = () => {
      this.set({ clientConnected: true, sessionLoading: false });
      const handshakeMessage = {
        type: SESSION_CLIENT_CMD.Handshake,
        payload: identity,
      };
      socket.send(JSON.stringify(handshakeMessage));
    };

    socket.onmessage = (e) => {
      const message: ServerMessage = JSON.parse(e.data);
      if (message) {
        const handler = messageHandlerMap[message.type];
        handler(this.set, message.payload);
      }
    };

    socket.onerror = (e) => {
      console.log("WebSocket error", e);
      this.set({
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
      this.set({ clientConnected: false });
    };
  }
}
