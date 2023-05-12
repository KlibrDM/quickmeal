export interface MealIngredient {
  name: string;
  measure: string;
}

export interface Meal {
  id: string;
  name: string;
  image: string;
  area: string;
  category: string;
  creativeCommonsConfirmed?: string;
  drinkAlternate?: string;
  imageSource?: string;
  instructions: string;
  source: string;
  tags?: string;
  youtube: string;
  ingredients: MealIngredient[];
}
