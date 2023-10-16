export interface RecipeStepDTO {
  Title: string;
  Description: string;
  Ingredients: string[];
  Kitchenware: string[];
  Duration: number;
  Difficulty: number;
  Dependencies: number[];
}
