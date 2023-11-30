import { Ingredient, COOKING_UNIT, DIFFICULTY, Fraction } from "../data/types";
import { unitToString } from "./conversion";

export const formatIngredientQuantity = (ingredient: Ingredient): string => {
  const { whole, numerator, denominator } = ingredient.quantity;

  const wholePart = whole !== 0 ? `${whole}` : "";
  const fractionPart =
    denominator !== 0 ? ` ${numerator} / ${denominator}` : "";

  return `${wholePart}${fractionPart}${unitToString[ingredient.unit]}`;
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

export const formatRelativeTime = (timestamp?: Date): string => {
  if (!timestamp) return "";

  const now = new Date();
  const timeDifference = now.getTime() - timestamp!.getTime();
  const seconds = Math.floor(timeDifference / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (days > 0) {
    return `${days} day${days > 1 ? "s" : ""} ago`;
  } else if (hours > 0) {
    return `${hours} hour${hours > 1 ? "s" : ""} ago`;
  } else if (minutes > 0) {
    return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
  } else {
    return "just now";
  }
};
