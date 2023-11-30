import { FEED_ACTION } from "./enum";
import SessionTask from "./task";
import { SessionUser } from "./user";

export interface WelcomeSnapshot {
  users: SessionUser[];
  tasks: { [key: string]: SessionTask };
  livefeed: FeedSnapshot[];
}

export interface FeedSnapshot {
  user: SessionUser;
  task: SessionTask;
  action: FEED_ACTION;
  timestamp: Date;
}
