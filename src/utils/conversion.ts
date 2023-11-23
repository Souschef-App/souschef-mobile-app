import { COOKING_UNIT } from "../data/types";

export const unitToString: { [key in COOKING_UNIT]: string } = {
  [COOKING_UNIT.None]: "x",
  [COOKING_UNIT.Ounces]: " oz",
  [COOKING_UNIT.Pounds]: " lb",
  [COOKING_UNIT.Grams]: " g",
  [COOKING_UNIT.Kilograms]: " kg",
  [COOKING_UNIT.Teaspoons]: " tsp",
  [COOKING_UNIT.Tablespoons]: " tbsp",
  [COOKING_UNIT.Cups]: " cup",
  [COOKING_UNIT.Pints]: " pt",
  [COOKING_UNIT.Quarts]: " qt",
  [COOKING_UNIT.Gallons]: " gal",
  [COOKING_UNIT.Mililiters]: " mL",
  [COOKING_UNIT.Liters]: " L",
};

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

type ConversionRate<T extends WEIGHT_UNITS | VOLUME_UNITS> = {
  [from in T]: { [to in T]?: number };
};

const weightConversion: ConversionRate<WEIGHT_UNITS> = {
  [COOKING_UNIT.Ounces]: {
    [COOKING_UNIT.Pounds]: 1 / 16,
    [COOKING_UNIT.Grams]: 28.3495,
    [COOKING_UNIT.Kilograms]: 0.0283495,
  },
  [COOKING_UNIT.Pounds]: {
    [COOKING_UNIT.Ounces]: 16,
    [COOKING_UNIT.Grams]: 453.592,
    [COOKING_UNIT.Kilograms]: 0.453592,
  },
  [COOKING_UNIT.Grams]: {
    [COOKING_UNIT.Ounces]: 0.03527396,
    [COOKING_UNIT.Pounds]: 0.00220462,
    [COOKING_UNIT.Kilograms]: 0.001,
  },
  [COOKING_UNIT.Kilograms]: {
    [COOKING_UNIT.Ounces]: 35.274,
    [COOKING_UNIT.Pounds]: 2.20462,
    [COOKING_UNIT.Grams]: 1000,
  },
};

const volumeConversion: ConversionRate<VOLUME_UNITS> = {
  [COOKING_UNIT.Teaspoons]: {
    [COOKING_UNIT.Tablespoons]: 1 / 3,
    [COOKING_UNIT.Cups]: 1 / 48,
    [COOKING_UNIT.Pints]: 1 / 96,
    [COOKING_UNIT.Quarts]: 1 / 192,
    [COOKING_UNIT.Gallons]: 1 / 768,
    [COOKING_UNIT.Mililiters]: 4.92892,
    [COOKING_UNIT.Liters]: 0.00492892,
  },
  [COOKING_UNIT.Tablespoons]: {
    [COOKING_UNIT.Teaspoons]: 3,
    [COOKING_UNIT.Cups]: 1 / 16,
    [COOKING_UNIT.Pints]: 1 / 32,
    [COOKING_UNIT.Quarts]: 1 / 64,
    [COOKING_UNIT.Gallons]: 1 / 256,
    [COOKING_UNIT.Mililiters]: 14.7868,
    [COOKING_UNIT.Liters]: 0.0147868,
  },
  [COOKING_UNIT.Cups]: {
    [COOKING_UNIT.Teaspoons]: 48,
    [COOKING_UNIT.Tablespoons]: 16,
    [COOKING_UNIT.Pints]: 1 / 2,
    [COOKING_UNIT.Quarts]: 1 / 4,
    [COOKING_UNIT.Gallons]: 1,
    [COOKING_UNIT.Mililiters]: 240,
    [COOKING_UNIT.Liters]: 0.24,
  },
  [COOKING_UNIT.Pints]: {
    [COOKING_UNIT.Teaspoons]: 96,
    [COOKING_UNIT.Tablespoons]: 32,
    [COOKING_UNIT.Cups]: 2,
    [COOKING_UNIT.Quarts]: 1 / 2,
    [COOKING_UNIT.Gallons]: 2,
    [COOKING_UNIT.Mililiters]: 480,
    [COOKING_UNIT.Liters]: 0.48,
  },
  [COOKING_UNIT.Quarts]: {
    [COOKING_UNIT.Teaspoons]: 192,
    [COOKING_UNIT.Tablespoons]: 64,
    [COOKING_UNIT.Cups]: 4,
    [COOKING_UNIT.Pints]: 2,
    [COOKING_UNIT.Gallons]: 4,
    [COOKING_UNIT.Mililiters]: 960,
    [COOKING_UNIT.Liters]: 0.96,
  },
  [COOKING_UNIT.Gallons]: {
    [COOKING_UNIT.Teaspoons]: 768,
    [COOKING_UNIT.Tablespoons]: 256,
    [COOKING_UNIT.Cups]: 16,
    [COOKING_UNIT.Pints]: 8,
    [COOKING_UNIT.Quarts]: 4,
    [COOKING_UNIT.Mililiters]: 3840,
    [COOKING_UNIT.Liters]: 3.78541,
  },
  [COOKING_UNIT.Mililiters]: {
    [COOKING_UNIT.Teaspoons]: 0.202884,
    [COOKING_UNIT.Tablespoons]: 0.067628,
    [COOKING_UNIT.Cups]: 0.00416667,
    [COOKING_UNIT.Pints]: 0.00208333,
    [COOKING_UNIT.Quarts]: 0.00104167,
    [COOKING_UNIT.Gallons]: 0.000260417,
    [COOKING_UNIT.Liters]: 0.001,
  },
  [COOKING_UNIT.Liters]: {
    [COOKING_UNIT.Teaspoons]: 202.884,
    [COOKING_UNIT.Tablespoons]: 67.628,
    [COOKING_UNIT.Cups]: 4.16667,
    [COOKING_UNIT.Pints]: 2.08333,
    [COOKING_UNIT.Quarts]: 1.04167,
    [COOKING_UNIT.Gallons]: 0.260417,
    [COOKING_UNIT.Mililiters]: 1000,
  },
};

export const convertWeightUnit = (
  quantity: number,
  from: WEIGHT_UNITS,
  to: WEIGHT_UNITS
): number => {
  return weightConversion[from][to]! * quantity;
};

export const convertVolumeUnit = (
  quantity: number,
  from: VOLUME_UNITS,
  to: VOLUME_UNITS
): number => {
  return volumeConversion[from][to]! * quantity;
};
