import { SERVER_MESSAGE, Task } from "../../types";
import { SessionSetState } from "./sessionSlice";

type CommandHandlerMap = {
  [key in SERVER_MESSAGE]: (set: SessionSetState, payload: any) => void;
};

const handleServerError = (set: SessionSetState, payload: any) => {
  const errorMsg: string = payload;
  console.log(errorMsg);
  set({ socketError: errorMsg });
};

const handleServerTaskCompleted = (set: SessionSetState, payload: any) => {
  const task: Task = payload;
  if (task) {
    console.log("Someone completed:", task.title);
  }
};

const handleServerTaskNew = (set: SessionSetState, payload: any) => {
  const task: Task = payload;
  if (task) {
    console.log("New task:", task.title);
    set({ assignedTask: task });
  }
};

const commandHandlerMap: CommandHandlerMap = {
  [SERVER_MESSAGE.Error]: handleServerError,
  [SERVER_MESSAGE.TaskCompleted]: handleServerTaskCompleted,
  [SERVER_MESSAGE.TaskNew]: handleServerTaskNew,
};

export default commandHandlerMap;
