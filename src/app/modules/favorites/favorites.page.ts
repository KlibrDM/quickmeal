import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Meal } from "src/app/models/meal";
import { Settings } from "src/app/models/settings";
import { FavoritesService } from "src/app/services/favorites.service";
import { SettingsService } from "src/app/services/settings.service";

@Component({
  selector: "app-favorites",
  templateUrl: "favorites.page.html",
  styleUrls: ["favorites.page.scss"],
})
export class FavoritesPage implements OnInit {
  mealList: Meal[] = [];
  settings?: Settings;

  noFavoritesError: boolean = false;

  constructor(
    private favoritesService: FavoritesService,
    private router: Router,
    private settingsService: SettingsService
  ) {}

  ngOnInit(): void {
    this.getSettings();
    this.getData();
  }

  getSettings() {
    this.settingsService.settings.subscribe({
      next: (data) => {
        this.settings = data;
      },
    });
  }

  getData() {
    this.favoritesService.favorites.subscribe({
      next: (data) => {
        this.mealList = data;
        if (this.mealList.length === 0) {
          this.noFavoritesError = true;
        } else {
          this.noFavoritesError = false;
        }
      },
    });
  }

  removeFavorite(event: MouseEvent, index: number) {
    event.stopPropagation();
    const meal = this.mealList[index];
    if (meal) {
      this.favoritesService.removeFavorite(meal);
    }
  }

  seeDetails(index: number) {
    const meal = this.mealList[index];
    if (meal) {
      this.router.navigate(["tabs/meal/" + meal.id], {
        state: {
          meal,
        },
      });
    }
  }
}
