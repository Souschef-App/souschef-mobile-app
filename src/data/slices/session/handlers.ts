import {
  FeedSnapshot,
  SESSION_SERVER_MSG,
  Task,
  User,
  WelcomeSnapshot,
} from "../../types";
import { SessionSetState } from "./sessionSlice";

type MessageHandlerMap = {
  [key in SESSION_SERVER_MSG]: (set: SessionSetState, payload: any) => void;
};

const handleError = (set: SessionSetState, payload: any) => {
  const str: string = payload;
  const error =
    str.length > 1
      ? str.charAt(0).toUpperCase() + str.slice(1) // Uppercase first letter
      : "Unknown error";
  set({ sessionError: error });
};

const handleHandshake = (set: SessionSetState, payload: WelcomeSnapshot) => {
  if (!payload) return;

  for (let i = 0; i < payload.livefeed.length; i++) {
    payload.livefeed[i].timestamp = new Date(payload.livefeed[i].timestamp);
  }

  set({ connectedUsers: payload.users, livefeed: payload.livefeed });
};

const handleClientConnected = (set: SessionSetState, payload: User) => {
  if (!payload) return;
  set((state) => ({ connectedUsers: [...state.connectedUsers, payload] }));
};

const handleClientDisconnected = (set: SessionSetState, payload: User) => {
  if (!payload) return;
  set((state) => ({
    connectedUsers: state.connectedUsers.filter((u) => u.id !== payload.id),
  }));
};

const handleMealCompleted = (set: SessionSetState, _: any) => {
  set({ assignedTask: null, sessionCompleted: true });
};

const handleTaskNew = (set: SessionSetState, payload: Task) => {
  set({ assignedTask: payload, taskLoading: false });
};

const handleFeedSnapshot = (set: SessionSetState, payload: FeedSnapshot) => {
  if (!payload) {
    // Force re-render
    set((state) => ({ livefeed: [...state.livefeed] }));
  } else {
    payload.timestamp = new Date(payload.timestamp);
    set((state) => ({ livefeed: [payload, ...state.livefeed] }));
  }
};

const messageHandlerMap: MessageHandlerMap = {
  [SESSION_SERVER_MSG.Error]: handleError,
  [SESSION_SERVER_MSG.Handshake]: handleHandshake,
  [SESSION_SERVER_MSG.ClientConnected]: handleClientConnected,
  [SESSION_SERVER_MSG.ClientDisconnected]: handleClientDisconnected,
  [SESSION_SERVER_MSG.MealCompleted]: handleMealCompleted,
  [SESSION_SERVER_MSG.TaskNew]: handleTaskNew,
  [SESSION_SERVER_MSG.FeedSnapshot]: handleFeedSnapshot,
};

export default messageHandlerMap;
