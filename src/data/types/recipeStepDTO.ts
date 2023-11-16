export interface RecipeStepDTO {
  title: string;
  description: string;
  ingredients: string[];
  kitchenware: string[];
  duration: number;
  difficulty: number;
  dependencies: string[];
  priority: number;
}
