import { COOKING_UNIT } from "./enum";

interface Ingredient {
  id: string;
  name: string;
  quantity: number;
  unit: COOKING_UNIT;
}

export default Ingredient;
