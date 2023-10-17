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
// 2. Live feed floating button
// 3. Handle empty ingredients or kitchenware
// 4. Abstract bubbles (top left)
const TaskScreen = ({
  navigation,
}: {
  navigation: TaskScreenNavigationProp;
}) => {
  // Store
  const task = useStore((state) => state.assignedTask);
  const completed = useStore((state) => state.sessionCompleted);
  const stopConnection = useStore((state) => state.stopConnection);

  React.useEffect(() => {
    return () => stopConnection();
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
