import React from "react";
import useStore from "../../data/store";
import { TaskScreenNavigationProp } from "../../navigation/types";
import {
  MealCompleted,
  TaskAvailable,
  TaskUnavailable,
} from "./task-components";

// TODO:
// 1. Prevent dropdowns from moving other components
// 3. Handle empty ingredients or kitchenware
const TaskScreen = ({
  navigation,
}: {
  navigation: TaskScreenNavigationProp;
}) => {
  // Store
  const task = useStore((state) => state.assignedTask);
  const completed = useStore((state) => state.sessionCompleted);
  const leaveSession = useStore((state) => state.leaveSession);

  React.useEffect(() => {
    return () => leaveSession();
  }, []);

  if (completed) {
    return <MealCompleted />;
  }

  if (task) {
    return <TaskAvailable task={task} />;
  }

  return <TaskUnavailable />;
};

export default TaskScreen;
