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

export const COOKING_UNIT_TO_STR = [
  "",
  "ounce",
  "pound",
  "gram",
  "kilogram",
  "teapsoon",
  "tablespoon",
  "cup",
  "pint",
  "quart",
  "gallon",
  "mililiter",
  "liter",
];

export type WEIGHT_UNITS =
  | COOKING_UNIT.Ounces
  | COOKING_UNIT.Pounds
  | COOKING_UNIT.Grams
  | COOKING_UNIT.Kilograms;

export type VOLUME_UNITS =
  | COOKING_UNIT.Teaspoons
  | COOKING_UNIT.Tablespoons
  | COOKING_UNIT.Cups
  | COOKING_UNIT.Pints
  | COOKING_UNIT.Quarts
  | COOKING_UNIT.Gallons
  | COOKING_UNIT.Mililiters
  | COOKING_UNIT.Liters;

export interface User {
  id: string;
  name: string;
  email: string;
  skillLevel: SKILL_LEVEL;
}

export interface MealPlan {
  id: string;
  name: string;
  date: number;
  occasionType: OCCASION_TYPE;
  recipes: Recipe[];
  guests: User[];
  host: User;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  ingredients: Ingredient[]; // Change to list of ingredients
  kitchenware: Kitchenware[]; // Change to list of kitchenware
  duration: number;
  difficulty: DIFFICULTY;
  order: number;
  dependencies: number[];
  points: number;
  finished: boolean;
  assignee: string; // Change to User
}

export const defaultTask: Task = {
  id: "",
  title: "Default Task",
  description: "Something went wrong",
  ingredients: [], // Change to list of ingredients
  kitchenware: [], // Change to list of kitchenware
  duration: 0,
  difficulty: DIFFICULTY.Easy,
  order: -1,
  dependencies: [],
  points: 0,
  finished: false,
  assignee: "", // Change to User
};

export interface Recipe {
  id: string;
  name: string;
  date: number;
  duration: number;
  difficulty: DIFFICULTY;
  serves: number;
  ownerId: string | null;
  favorites: number;
  tasks: Task[]; // Change to list of task
  ingredients: Ingredient[]; // Change to list of ingredients
  kitchenware: Kitchenware[]; // Change to list of kitchenware
}

export const defaultRecipe: Recipe = {
  id: "",
  name: "Default Recipe",
  date: 0,
  duration: 0,
  difficulty: DIFFICULTY.Easy,
  serves: 0,
  ownerId: null,
  favorites: 0,
  tasks: [], // Change to list of task
  ingredients: [], // Change to list of ingredients
  kitchenware: [], // Change to list of kitchenware
};

export interface Ingredient {
  id: string;
  name: string;
  quantity: number;
  unit: COOKING_UNIT;
}

export interface Kitchenware {
  id: string;
  name: string;
  quantity: number;
}

// class WeightMeasurement {
//   value: number;
//   unit: WEIGHT_UNITS;
//   constructor(value: number, unit: WEIGHT_UNITS) {
//     this.value = value;
//     this.unit = unit;
//   }

//   convertToOunces() {
//     switch (this.unit) {
//       case WEIGHT_UNITS.Pounds:
//         this.value *= 0.0625;
//       case WEIGHT_UNITS.Grams:
//         this.value *= 28.3495;
//       case WEIGHT_UNITS.Kilograms:
//         this.value *= 0.0283495;
//     }
//   }

//   convertToPounds() {
//     switch (this.unit) {
//       case WEIGHT_UNITS.Ounces:
//         this.value *= 16.0;
//       case WEIGHT_UNITS.Grams:
//         this.value *= 453.592;
//       case WEIGHT_UNITS.Kilograms:
//         this.value *= 0.453592;
//     }
//   }

//   convertToGrams() {
//     switch (this.unit) {
//       case WEIGHT_UNITS.Ounces:
//         this.value *= 0.035274;
//       case WEIGHT_UNITS.Pounds:
//         this.value *= 0.00220462;
//       case WEIGHT_UNITS.Kilograms:
//         this.value *= 0.001;
//     }
//   }

//   convertToKilograms() {
//     switch (this.unit) {
//       case WEIGHT_UNITS.Ounces:
//         this.value *= 35.274;
//       case WEIGHT_UNITS.Pounds:
//         this.value *= 2.20462;
//       case WEIGHT_UNITS.Grams:
//         this.value *= 1000;
//     }
//   }

//   static conversion(
//     value: number,
//     sourceUnit: WEIGHT_UNITS,
//     targetUnit: WEIGHT_UNITS,
//   ): number {
//     if (sourceUnit == WEIGHT_UNITS.Ounces) {
//       switch (targetUnit) {
//         case WEIGHT_UNITS.Pounds:
//           return value * 0.0625;
//         case WEIGHT_UNITS.Grams:
//           return value * 28.3495;
//         case WEIGHT_UNITS.Kilograms:
//           return value * 0.0283495;
//         default:
//           return value;
//       }
//     } else if (sourceUnit == WEIGHT_UNITS.Pounds) {
//       switch (targetUnit) {
//         case WEIGHT_UNITS.Ounces:
//           return value * 16.0;
//         case WEIGHT_UNITS.Grams:
//           return value * 453.592;
//         case WEIGHT_UNITS.Kilograms:
//           return value * 0.453592;
//         default:
//           return value;
//       }
//     } else if (sourceUnit == WEIGHT_UNITS.Grams) {
//       switch (targetUnit) {
//         case WEIGHT_UNITS.Ounces:
//           return value * 0.035274;
//         case WEIGHT_UNITS.Pounds:
//           return value * 0.00220462;
//         case WEIGHT_UNITS.Kilograms:
//           return value * 0.001;
//         default:
//           return value;
//       }
//     } else {
//       switch (targetUnit) {
//         case WEIGHT_UNITS.Ounces:
//           return value * 35.274;
//         case WEIGHT_UNITS.Pounds:
//           return value * 2.20462;
//         case WEIGHT_UNITS.Grams:
//           return value * 1000;
//         default:
//           return value;
//       }
//     }
//   }
// }
