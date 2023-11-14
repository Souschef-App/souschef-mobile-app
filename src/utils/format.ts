import { Ingredient, COOKING_UNIT, DIFFICULTY } from "../data/types";
import { unitToString } from "./conversion";

export const formatIngredientQuantity = (ingredient: Ingredient): string => {
  if (ingredient.unit === COOKING_UNIT.None) {
    return `${ingredient.quantity}x`;
  }

  let quantity: string = ingredient.quantity.toString();

  if (isFractionalUnit(ingredient.unit)) {
    quantity = convertToFraction(ingredient.quantity);
  }

  return quantity + ` ${unitToString[ingredient.unit]}`;
};

const gcd = (a: number, b: number): number => {
  return b === 0 ? a : gcd(b, a % b);
};

const convertToFraction = (x: number): string => {
  const wholePart = Math.floor(x);
  const fractionalPart = x - wholePart;

  if (fractionalPart === 0) {
    return wholePart.toString();
  }

  const precision = 100; // Higher precision for accurate calculation
  const commonDivisor = gcd(Math.round(fractionalPart * precision), precision);
  const numerator = Math.round(fractionalPart * precision) / commonDivisor;
  const denominator = precision / commonDivisor;

  if (wholePart === 0) {
    return `${numerator}/${denominator}`;
  }

  return `${wholePart} ${numerator}/${denominator}`;
};

type FRACTIONAL_UNITS =
  | COOKING_UNIT.Cups
  | COOKING_UNIT.Teaspoons
  | COOKING_UNIT.Tablespoons
  | COOKING_UNIT.Pints
  | COOKING_UNIT.Quarts
  | COOKING_UNIT.Gallons;

const isFractionalUnit = (unit: COOKING_UNIT): unit is FRACTIONAL_UNITS => {
  return (unit as FRACTIONAL_UNITS) !== undefined;
};

export const formatDifficultyToString = (value: DIFFICULTY) => {
  switch (value) {
    case DIFFICULTY.Easy:
      return "easy";
    case DIFFICULTY.Medium:
      return "medium";
    case DIFFICULTY.Hard:
      return "hard";
  }
};

export const formatDifficultyToHex = (value: DIFFICULTY) => {
  switch (value) {
    case DIFFICULTY.Easy:
      return "#3ddc84";
    case DIFFICULTY.Medium:
      return "#ffcd3c";
    case DIFFICULTY.Hard:
      return "#fb6a69";
  }
};
