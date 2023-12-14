import { StateCreator, StoreApi } from "zustand";
import { ApiUrls } from "../../../api/constants";
import jsonRequest from "../../../api/requests";
import { fakeTask, guestSessionUser } from "../../__mocks__";
import { StoreState } from "../../store";
import {
  FEED_ACTION,
  FeedSnapshot,
  LiveSession,
  SESSION_CLIENT_CMD,
  SessionTask,
  SessionUser,
  Task,
} from "../../types";
import { Client } from "./client";

type SessionState = {
  tasks: { [key: string]: SessionTask };
  assignedTask: string | null;
  taskLoading: boolean;
  taskOverdue: boolean;
  connectedUsers: SessionUser[];
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
  taskOverdue: false,
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
  joinSession: (code: string, user: SessionUser | null) => Promise<boolean>;
  joinFakeSession: () => void;
  leaveSession: () => void;
  markTaskOverdue: (status: boolean) => void;
  commands: {
    setGuestIdentity: (guestname: string) => void;
    startSession: () => void;
    stopSession: () => void;
    completeTask: () => void;
    rerollTask: () => void;
    completeBackgroundTask: (taskID: string) => void;
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
    markTaskOverdue: (status: boolean) => set({ taskOverdue: status }),
    resetSessionSlice: () => set(initialState),
    joinSession: async (code: string, user: SessionUser | null) => {
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

      client.connect(`ws://${session?.ip}/ws`, user);
      return true;
    },
    joinFakeSession: () => {
      set({
        clientConnected: true,
        taskLoading: true,
        connectedUsers: [guestSessionUser],
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
              user: guestSessionUser,
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
      get().resetSessionSlice();
    },
    commands: {
      setGuestIdentity: (guestname: string) =>
        client.sendCommandPayload(SESSION_CLIENT_CMD.GuestHandshake, guestname),
      startSession: () => client.sendCommand(SESSION_CLIENT_CMD.SessionStart),
      stopSession: () => client.sendCommand(SESSION_CLIENT_CMD.SessionStop),
      completeTask: () => client.sendCommand(SESSION_CLIENT_CMD.TaskCompleted),
      rerollTask: () => {
        set({ taskLoading: true });
        client.sendCommand(SESSION_CLIENT_CMD.TaskRerolled);
      },
      completeBackgroundTask: (taskID: string) =>
        client.sendCommandPayload(
          SESSION_CLIENT_CMD.TaskBackgroundCompleted,
          taskID
        ),
    },
  };
};
