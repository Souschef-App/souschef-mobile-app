import { StateCreator, StoreApi } from "zustand";
import { ApiUrls } from "../../../api/constants";
import jsonRequest from "../../../api/requests";
import { fakeTask, guestUser } from "../../__mocks__";
import { StoreState } from "../../store";
import {
  FEED_ACTION,
  FeedSnapshot,
  LiveSession,
  SESSION_CLIENT_CMD,
  SessionUser,
  Task,
  User,
} from "../../types";
import { Client } from "./client";

type SessionState = {
  tasks: { [key: string]: Task };
  assignedTask: string | null;
  taskLoading: boolean;
  connectedUsers: User[];
  livefeed: FeedSnapshot[];
  session: LiveSession | null;
  sessionCompleted: boolean;
  sessionError: string | null;
  sessionLoading: boolean;
  clientConnected: boolean;
};

const initialState: SessionState = {
  tasks: {},
  assignedTask: null,
  taskLoading: true,
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
  joinSession: (code: string, user: SessionUser) => Promise<boolean>;
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
    joinSession: async (code: string, user: SessionUser) => {
      set({ sessionLoading: true, sessionError: null });

      const query = { code }; // TODO: Convert API to string
      const [session, error] = await jsonRequest.get<LiveSession>(
        ApiUrls.getLiveSession,
        query
      );

      if (error) {
        set({ sessionLoading: false, sessionError: error });
        return false;
      }

      set({ session });
      client.connect(`ws://192.168.0.244:8080/ws`, user);
      // client.connect(`ws://${session?.ip}/ws`, user);
      return true;
    },
    joinFakeSession: () => {
      set({
        clientConnected: true,
        taskLoading: true,
        connectedUsers: [guestUser],
        session: {
          code: 12345,
          ip: "localhost",
        },
      });
      setTimeout(() => {
        set({
          tasks: {},
          assignedTask: null,
          taskLoading: false,
          livefeed: [
            {
              user: guestUser,
              task: fakeTask,
              action: FEED_ACTION.Assignment,
              timestamp: new Date(),
            },
          ],
        });
      }, 500);
    },
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
      rerollTask: () => {
        set({ taskLoading: true });
        client.sendCommand(SESSION_CLIENT_CMD.TaskReroll);
      },
    },
  };
};
