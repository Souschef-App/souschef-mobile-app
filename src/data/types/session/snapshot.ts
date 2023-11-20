import Task from "../task";
import User from "../user";
import { FEED_ACTION } from "./enum";

export interface WelcomeSnapshot {
  users: User[];
  tasks: { [key: string]: Task };
  livefeed: FeedSnapshot[];
}

export interface FeedSnapshot {
  user: User;
  task: Task;
  action: FEED_ACTION;
  timestamp: Date;
}
