import { Ingredient, COOKING_UNIT } from "../data/types";
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

  const commonDivisor = gcd(Math.round(fractionalPart * 100), 100);
  const numerator = Math.round(fractionalPart * 100) / commonDivisor;
  const denominator = 100 / commonDivisor;

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
