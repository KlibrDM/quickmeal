import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { MealThumbnail } from "src/app/models/meal";
import { Settings } from "src/app/models/settings";
import { DataService } from "src/app/services/data.service";
import { SettingsService } from "src/app/services/settings.service";

const filters = {
  categories: {
    name: "categories",
    label: "Categories",
    code: "c",
  },
  area: {
    name: "area",
    label: "Area",
    code: "a",
  },
  ingredients: {
    name: "ingredients",
    label: "Ingredients",
    code: "i",
  },
};

@Component({
  selector: "app-categories",
  templateUrl: "categories.page.html",
  styleUrls: ["categories.page.scss"],
})
export class CategoriesPage implements OnInit {
  filters = filters;
  selectedFilterCode = filters.categories.code;
  categoryList: string[] = [];
  mealList: MealThumbnail[] = [];
  settings?: Settings;

  showCategoryList: boolean = true;
  generalError: boolean = false;
  internetError: boolean = false;

  constructor(private dataService: DataService, private router: Router, private settingsService: SettingsService) {}

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
    this.dataService.getCategories(this.selectedFilterCode).subscribe({
      next: (data) => {
        this.categoryList = data;
        this.internetError = false;
        this.generalError = false;
      },
      error: (err) => {
        this.categoryList = [];
        if (err.status === 0) {
          this.internetError = true;
        } else {
          this.generalError = true;
        }
      },
    });
  }

  categoryChanged() {
    this.getData();
  }

  backButton() {
    this.showCategoryList = true;
    this.internetError = false;
    this.generalError = false;
  }

  seeMeals(category: string) {
    this.dataService.getMealsByCategory(this.selectedFilterCode, category).subscribe({
      next: (data) => {
        this.mealList = data;
        this.internetError = false;
        this.generalError = false;
        this.showCategoryList = false;
      },
      error: (err) => {
        this.mealList = [];
        this.showCategoryList = false;
        if (err.status === 0) {
          this.internetError = true;
        } else {
          this.generalError = true;
        }
      },
    });
  }

  seeDetails(index: number) {
    const meal = this.mealList[index];
    if (meal) {
      this.router.navigate(["tabs/meal/" + meal.id]);
    }
  }
}
