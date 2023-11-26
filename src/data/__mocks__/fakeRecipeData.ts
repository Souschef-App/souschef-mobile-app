import { DIFFICULTY, Recipe } from "../types";

const fakeRecipe: Recipe = {
  id: "recipe-123",
  name: "Chorizo & Mozzarella Gnocchi Bake",
  serves: 8,
  difficulty: DIFFICULTY.Easy,
  ingredients: [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}],
  kitchenware: [],
  tasks: [],
  date: 0,
  duration: 30,
  ownerId: null,
  favorites: 0,
};

export default fakeRecipe;
