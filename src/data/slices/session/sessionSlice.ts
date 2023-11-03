import { ApiUrls } from "../../../api/constants";
import jsonRequest from "../../../api/requests";
import { StateCreator, StoreApi } from "zustand";
import { StoreState } from "../../store";
import {
  FeedSnapshot,
  LiveSession,
  SESSION_CLIENT_CMD,
  SessionUser,
  Task,
  User,
} from "../../types";
import client from "./client";

export interface SessionSlice {
  assignedTask: Task | null;
  connectedUsers: User[];
  livefeed: FeedSnapshot[];
  socket: WebSocket | null;
  sessionCompleted: boolean;
  sessionError: string | null;
  sessionLoading: boolean;
  clearSessionError: () => void;
  joinSession: (code: string) => Promise<void>;
  leaveSession: () => void;
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
    assignedTask: null,
    connectedUsers: [],
    livefeed: [],
    socket: null,
    sessionCompleted: false,
    sessionLoading: false,
    sessionError: null,
    clearSessionError: () => set({ sessionError: null }),
    joinSession: async (code: string) => {
      set({ sessionLoading: true, sessionError: null });

      const query = { code: parseInt(code) };
      const [session, error] = await jsonRequest.get<LiveSession>(
        ApiUrls.getLiveSession,
        query
      );

      if (error != null) {
        set({ sessionLoading: false, sessionError: error });
        return;
      }

      const sessionUser = get().user as SessionUser;
      if (sessionUser == null) {
        set({
          sessionLoading: false,
          sessionError:
            "You are not logged in. Please log in to access this feature.",
        });
        return;
      }

      get().leaveSession();
      client.connect(`ws://${session?.ip}/ws`, sessionUser, set);
    },
    leaveSession: () => {
      const socket = get().socket;
      if (socket && socket.OPEN) {
        socket.close();
        set({ socket: null, sessionError: null, sessionCompleted: false });
      }
    },
    commands: {
      startSession: () => sendCommand(SESSION_CLIENT_CMD.SessionStart),
      stopSession: () => sendCommand(SESSION_CLIENT_CMD.SessionStop),
      completeTask: () => sendCommand(SESSION_CLIENT_CMD.TaskComplete),
      rerollTask: () => sendCommand(SESSION_CLIENT_CMD.TaskReroll),
    },
  };
};
