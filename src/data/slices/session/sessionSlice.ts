import { StateCreator, StoreApi } from "zustand";
import { StoreState } from "../../store";
import { Task } from "../../types";
import { listeners } from "./listeners";

export interface SessionSlice {
  sessionCompleted: boolean;
  assignedTask: Task | null;
  socket: WebSocket | null;
  socketError: string | null;
  socketLoading: boolean;
  clearSocketError: () => void;
  startConnection: (url: string) => void;
  stopConnection: () => void;
  commands: {
    startSession: () => void;
    stopSession: () => void;
    completeTask: () => void;
    rerollTask: () => void;
  };
}

export type SessionSetState = StoreApi<SessionSlice>["setState"];

export const createSessionSlice: StateCreator<
  StoreState,
  [],
  [],
  SessionSlice
> = (set, get) => {
  const sendCommand = (commandType: string) => {
    const socket = get().socket;
    if (socket && socket.OPEN) {
      const command = { type: commandType };
      socket.send(JSON.stringify(command));
    }
  };

  return {
    sessionCompleted: false,
    assignedTask: null,
    socket: null,
    socketLoading: false,
    socketError: null,
    clearSocketError: () => set({ socketError: null }),
    startConnection: (url: string) => {
      const userID = get().user?.id;
      console.log("USERID:", get().user);
      if (!get().socket && userID) {
        set({ socketLoading: true });
        const socket = new WebSocket(url + `?UserID=${userID}`);
        listeners.init(set, socket);
      }
    },
    stopConnection: () => {
      const socket = get().socket;
      if (socket) {
        socket.close();
        set({ socket: null, socketError: null, sessionCompleted: false });
      }
    },
    commands: {
      startSession: () => sendCommand("session_start"),
      stopSession: () => sendCommand("session_stop"),
      completeTask: () => sendCommand("task_completed"),
      rerollTask: () => sendCommand("task_reroll"),
    },
  };
};

// const defaultTask: Task = {
//   id: "",
//   title: "Chop Carrots",
//   description: "Chop the carrots into thin slices",
//   duration: 10,
//   difficulty: DIFFICULTY.Medium,
//   priority: -1,
//   dependencies: [],
//   ingredients: [
//     { id: "", name: "Carrot", quantity: 2, unit: COOKING_UNIT.None },
//   ],
//   kitchenware: [
//     { id: "", name: "Knife", quantity: 1 },
//     { id: "", name: "Cutting board", quantity: 1 },
//   ],
// };
