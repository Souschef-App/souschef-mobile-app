// https://www.thespruceeats.com/weight-conversions-chart-1328758
// https://www.thespruceeats.com/volume-conversions-chart-1328757
export enum COOKING_UNIT {
  None,
  Ounces, // Start of weight units
  Pounds,
  Grams,
  Kilograms, // End of weight units
  Teaspoons, // Start of volume units
  Tablespoons,
  Cups,
  Pints,
  Quarts,
  Gallons,
  Mililiters,
  Liters, // End of volume units
}

export enum SKILL_LEVEL {
  Beginner,
  Intermediate,
  Expert,
}

export enum DIFFICULTY {
  Easy,
  Medium,
  Hard,
}

export enum OCCASION_TYPE {
  Home,
  Professional,
  Educational,
}

export enum CLIENT_COMMANDS {
  SessionStart = "session_start",
  SessionStop = "session_stop",
  TaskComplete = "task_completed",
  TaskReroll = "task_reroll",
}

export enum SERVER_MESSAGE {
  Error = "error",
  TaskNew = "task_new",
  TaskCompleted = "task_completed",
}
