import { TASK_STATUS } from "../enum";
import Task from "../task";

interface SessionTask extends Task {
  status: TASK_STATUS;
  timestamp?: Date;
}

export default SessionTask;
