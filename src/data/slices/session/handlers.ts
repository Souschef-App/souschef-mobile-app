import { SERVER_MESSAGE, Task } from "../../types";
import { SessionSetState } from "./sessionSlice";

type CommandHandlerMap = {
  [key in SERVER_MESSAGE]: (set: SessionSetState, payload: any) => void;
};

const handleServerError = (set: SessionSetState, payload: any) => {
  const str: string = payload;
  const error = str.charAt(0).toUpperCase() + str.slice(1);
  set({ sessionError: error });
};

const handleServerTaskCompleted = (set: SessionSetState, payload: any) => {
  const task: Task = payload;
  if (task) {
    console.log("Someone completed:", task.title);
  }
};

const handleServerTaskNew = (set: SessionSetState, payload: any) => {
  const task: Task | null = payload;
  set({ assignedTask: task });
};

const handleServerMealCompleted = (set: SessionSetState, _: any) => {
  set({ assignedTask: null, sessionCompleted: true });
};

const commandHandlerMap: CommandHandlerMap = {
  [SERVER_MESSAGE.Error]: handleServerError,
  [SERVER_MESSAGE.TaskCompleted]: handleServerTaskCompleted,
  [SERVER_MESSAGE.TaskNew]: handleServerTaskNew,
  [SERVER_MESSAGE.MealCompleted]: handleServerMealCompleted,
};

export default commandHandlerMap;
