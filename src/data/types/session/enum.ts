export enum SESSION_CLIENT_CMD {
  Handshake = "client_handshake",
  SessionStart = "session_start",
  SessionStop = "session_stop",
  TaskComplete = "task_completed",
  TaskReroll = "task_reroll",
}

export enum SESSION_SERVER_MSG {
  Error = "error",
  Handshake = "server_handshake",
  ClientConnected = "client_connected",
  ClientDisconnected = "client_disconnected",
  MealCompleted = "meal_completed",
  TaskNew = "task_new",
  FeedSnapshot = "feed_snapshot",
}

export enum TASK_STATUS {
  Assigned,
  Completed,
  Rerolled,
}
