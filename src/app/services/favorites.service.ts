import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { Meal } from "../models/meal";
import { StorageService } from "./storage.service";

@Injectable({
  providedIn: "root",
})
export class FavoritesService {
  favorites: BehaviorSubject<Meal[]> = new BehaviorSubject<Meal[]>([]);

  constructor(private storageService: StorageService) {
    this.init();
  }

  async init() {
    const favorites = await this.storageService.get("favorites");
    this.favorites.next(favorites);
  }

  async addFavorite(meal: Meal) {
    const favorites = await this.storageService.get("favorites");
    favorites.push(meal);
    this.storageService.set("favorites", favorites);
    this.favorites.next(favorites);
  }

  async removeFavorite(meal: Meal) {
    const favorites = await this.storageService.get("favorites");
    const index = favorites.findIndex((f: Meal) => f.id === meal.id);
    if (index !== -1) {
      favorites.splice(index, 1);
      this.storageService.set("favorites", favorites);
      this.favorites.next(favorites);
    }
  }

  async isFavorite(mealId: string): Promise<boolean> {
    const favorites = await this.storageService.get("favorites");
    return favorites.findIndex((f: Meal) => f.id === mealId) !== -1;
  }
}
