import { ApiUrls } from "../../../api/constants";
import jsonRequest from "../../../api/requests";
import { StateCreator, StoreApi } from "zustand";
import { StoreState } from "../../store";
import {
  FeedSnapshot,
  SESSION_CLIENT_CMD,
  Task,
  User,
  LiveSession,
  TASK_STATUS,
  SessionUser,
} from "../../types";
import { Client } from "./client";
import { fakeTask, fakeUser } from "../../__mocks__";

type SessionState = {
  assignedTask: Task | null;
  connectedUsers: User[];
  livefeed: FeedSnapshot[];
  session: LiveSession | null;
  sessionCompleted: boolean;
  sessionError: string | null;
  sessionLoading: boolean;
  clientConnected: boolean;
};

const initialState: SessionState = {
  assignedTask: null,
  connectedUsers: [],
  livefeed: [],
  session: null,
  sessionCompleted: false,
  sessionLoading: false,
  sessionError: null,
  clientConnected: false,
};

type SessionActions = {
  resetSessionSlice: () => void;
  joinSession: (code: number) => Promise<boolean>;
  joinFakeSession: () => void;
  leaveSession: () => void;
  commands: {
    startSession: () => void;
    stopSession: () => void;
    completeTask: () => void;
    rerollTask: () => void;
  };
};

export type SessionSlice = SessionState & SessionActions;
export type SessionSetState = StoreApi<SessionSlice>["setState"];

export const createSessionSlice: StateCreator<
  StoreState,
  [],
  [],
  SessionSlice
> = (set, get) => {
  const client = new Client(set);

  return {
    ...initialState,
    resetSessionSlice: () => set(initialState),
    joinSession: async (code: number) => {
      set({ sessionLoading: true, sessionError: null });

      const query = { code };
      const [session, error] = await jsonRequest.get<LiveSession>(
        ApiUrls.getLiveSession,
        query
      );

      if (error) {
        set({ sessionLoading: false, sessionError: error });
        return false;
      }

      const sessionUser: SessionUser | null = get().user;
      if (!sessionUser) {
        set({
          sessionLoading: false,
          sessionError:
            "You are not logged in. Please log in to access this feature.",
        });
        return false;
      }

      set({ session });
      client.connect(`ws://${session?.ip}/ws`, sessionUser);
      return true;
    },
    joinFakeSession: () =>
      set({
        clientConnected: true,
        assignedTask: fakeTask,
        connectedUsers: [fakeUser],
        session: {
          code: 12345,
          ip: "localhost",
        },
        livefeed: [
          {
            user: fakeUser,
            task: fakeTask,
            status: TASK_STATUS.Assigned,
            timestamp: new Date(),
          },
        ],
      }),
    leaveSession: () => {
      client.leave();
      set({
        session: null,
        sessionError: null,
        sessionCompleted: false,
      });
    },
    commands: {
      startSession: () => client.sendCommand(SESSION_CLIENT_CMD.SessionStart),
      stopSession: () => client.sendCommand(SESSION_CLIENT_CMD.SessionStop),
      completeTask: () => client.sendCommand(SESSION_CLIENT_CMD.TaskComplete),
      rerollTask: () => client.sendCommand(SESSION_CLIENT_CMD.TaskReroll),
    },
  };
};
