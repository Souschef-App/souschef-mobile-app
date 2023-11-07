import Task from "../task";
import User from "../user";
import { TASK_STATUS } from "./enum";

export interface WelcomeSnapshot {
  users: User[];
  livefeed: FeedSnapshot[];
}

export interface FeedSnapshot {
  user: User;
  task: Task;
  status: TASK_STATUS;
  timestamp: Date;
}
