import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { Meal, MealIngredient, MealThumbnail } from "../models/meal";
import { Observable, map } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class DataService {
  servicePath = environment.endpointGateway;

  constructor(private http: HttpClient) {}

  getSearch(searchTerm: string): Observable<Meal[]> {
    return this.http
      .get(this.servicePath + "/search.php?s=" + searchTerm)
      .pipe(map((res: any) => this.mapMeals(res.meals)));
  }

  getMealById(id: string): Observable<Meal[]> {
    return this.http.get(this.servicePath + "/lookup.php?i=" + id).pipe(map((res: any) => this.mapMeals(res.meals)));
  }

  getCategories(code: string): Observable<string[]> {
    return this.http
      .get(this.servicePath + "/list.php?" + code + "=list")
      .pipe(map((res: any) => res.meals.map((cat: any) => cat.strCategory || cat.strArea || cat.strIngredient)));
  }

  getMealsByCategory(code: string, category: string): Observable<MealThumbnail[]> {
    return this.http
      .get(this.servicePath + "/filter.php?" + code + "=" + category)
      .pipe(map((res: any) => this.mapMealThumbnails(res.meals)));
  }

  getRandom(): Observable<Meal[]> {
    return this.http.get(this.servicePath + "/random.php").pipe(map((res: any) => this.mapMeals(res.meals)));
  }

  mapMealThumbnails(meals: any[]): MealThumbnail[] {
    if (!meals) return [];
    return meals.map((meal) => ({
      id: meal.idMeal,
      name: meal.strMeal,
      image: meal.strMealThumb,
    }));
  }

  mapMeals(meals: any[]): Meal[] {
    if (!meals) return [];
    return meals.map((meal) => ({
      id: meal.idMeal,
      name: meal.strMeal,
      image: meal.strMealThumb,
      area: meal.strArea,
      category: meal.strCategory,
      creativeCommonsConfirmed: meal.strCreativeCommonsConfirmed,
      drinkAlternate: meal.strDrinkAlternate,
      imageSource: meal.strImageSource,
      instructions: meal.strInstructions,
      source: meal.strSource,
      tags: meal.strTags,
      youtube: meal.strYoutube,
      ingredients: this.mapIngredients(meal),
    }));
  }

  mapIngredients(meal: any): MealIngredient[] {
    let ingredients: MealIngredient[] = [];
    for (let i = 1; i <= 20; i++) {
      if (meal["strIngredient" + i]) {
        ingredients.push({
          name: meal["strIngredient" + i],
          measure: meal["strMeasure" + i],
        });
      }
    }
    return ingredients;
  }
}
