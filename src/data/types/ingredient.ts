import { COOKING_UNIT } from "./enum";

export interface Fraction {
  whole: number;
  numerator: number;
  denominator: number;
}

export interface Ingredient {
  id: string;
  name: string;
  quantity: Fraction;
  unit: COOKING_UNIT;
}
