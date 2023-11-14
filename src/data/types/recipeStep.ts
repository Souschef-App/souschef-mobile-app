export interface RecipeStep {
  ID: number;
  Title: string;
  Description: string;
  Ingredients: string[];
  Kitchenware: string[];
  Duration: number;
  Difficulty: number;
  Dependencies: number[];
}
