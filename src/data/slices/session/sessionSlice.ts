import { ApiUrls } from "../../../api/constants";
import { useGet } from "../../../api/useGet";
import { StateCreator, StoreApi } from "zustand";
import { StoreState } from "../../store";
import { Task } from "../../types";
import { listeners } from "./listeners";
import { sessionapi } from "../../../api/sessionapi";

export interface SessionSlice {
  sessionCompleted: boolean;
  assignedTask: Task | null;
  socket: WebSocket | null;
  sessionError: string | null;
  sessionLoading: boolean;
  clearSocketError: () => void;
  joinSession: (ipAddress: string) => Promise<void>;
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
    sessionLoading: false,
    sessionError: null,
    clearSocketError: () => set({ sessionError: null }),
    joinSession: async (ipAddress: string) => {
      // const fiveDigitRegex = /^\d{5}$/;
      // if (!fiveDigitRegex.test(code)) {
      //   set({
      //     sessionError:
      //       "The provided code must be a 5-digit number.\nPlease check and try again.",
      //   });
      //   return;
      // }

      // set({ sessionLoading: true, sessionError: null });
      // const [ipAddress, error] = (await sessionapi.joinMealSession(code)).data
      // set({
      //   sessionLoading: false,
      //   sessionError: error,
      // });
      if (ipAddress) {
        console.log(`ws://${ipAddress}/ws`);
        get().startConnection(`ws://${ipAddress}/ws`);
      }
    },
    startConnection: (url: string) => {
      console.log(url, get())
      const userID = get().user?.id;
      if (!get().socket && userID) {
        set({ sessionLoading: true });
        const socket = new WebSocket(url + `?UserID=${userID}`);
        listeners.init(set, socket);
      }
    },
    stopConnection: () => {
      const socket = get().socket;
      if (socket) {
        socket.close();
        set({ socket: null, sessionError: null, sessionCompleted: false });
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
