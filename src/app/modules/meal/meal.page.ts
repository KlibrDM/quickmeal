import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Meal } from "src/app/models/meal";
import { DataService } from "src/app/services/data.service";
import { FavoritesService } from "src/app/services/favorites.service";

@Component({
  selector: "app-meal",
  templateUrl: "./meal.page.html",
  styleUrls: ["./meal.page.scss"],
})
export class MealPage implements OnInit {
  meal?: Meal;
  isFavorite: boolean = false;

  generalError: boolean = false;
  internetError: boolean = false;

  constructor(
    private dataService: DataService,
    private favoritesService: FavoritesService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe((_params) => {
      const navigationExtras = this.router.getCurrentNavigation()?.extras.state;
      if (navigationExtras?.["meal"]) {
        this.meal = navigationExtras?.["meal"];
        this.checkIfFavorite(this.meal!.id);
      } else {
        const id = this.route.snapshot.paramMap.get("id");
        if (id) {
          this.getMeal(id);
        }
      }
    });
  }

  getMeal(id: string) {
    this.dataService.getMealById(id).subscribe({
      next: (data) => {
        this.meal = data[0];
        this.checkIfFavorite(this.meal.id);

        this.generalError = false;
        this.internetError = false;
      },
      error: (err) => {
        this.meal = undefined;
        if (err.status === 0) {
          this.internetError = true;
        } else {
          this.generalError = true;
        }
      },
    });
  }

  checkIfFavorite(mealId: string) {
    this.favoritesService.isFavorite(mealId).then((isFavorite) => {
      this.isFavorite = isFavorite;
    });
  }

  favoriteClicked() {
    if (!this.isFavorite) {
      this.favoritesService.addFavorite(this.meal!);
    } else {
      this.favoritesService.removeFavorite(this.meal!);
    }
    this.isFavorite = !this.isFavorite;
  }

  retry() {
    const id = this.route.snapshot.paramMap.get("id");
    if (id) {
      this.getMeal(id);
    }
  }
}
