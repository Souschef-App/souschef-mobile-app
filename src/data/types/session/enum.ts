export enum SESSION_CLIENT_CMD {
  Handshake = "client_handshake",
  SessionStart = "session_start",
  SessionStop = "session_stop",
  TaskCompleted = "task_completed",
  TaskRerolled = "task_rerolled",
  TaskBackgroundCompleted = "task_background_completed",
}

export enum SESSION_SERVER_MSG {
  Error = "error",
  Handshake = "server_handshake",
  ClientConnected = "client_connected",
  ClientDisconnected = "client_disconnected",
  MealCompleted = "meal_completed",
  TaskNew = "task_new",
  FeedSnapshot = "feed_snapshot",
  TimestampUpdate = "timestamp_update",
}

export enum FEED_ACTION {
  Assignment,
  Completion,
  Deferred,
  Reroll,
}
