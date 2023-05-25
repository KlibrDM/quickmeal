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
  filteredCategoryList: string[] = [];
  mealList: MealThumbnail[] = [];
  filteredMealList: MealThumbnail[] = [];
  settings?: Settings;
  filterText = "";
  isLoading: boolean = false;

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
    this.isLoading = true;
    this.dataService.getCategories(this.selectedFilterCode).subscribe({
      next: (data) => {
        this.categoryList = data;
        this.filteredCategoryList = data;
        this.isLoading = false;
        this.internetError = false;
        this.generalError = false;
      },
      error: (err) => {
        this.categoryList = [];
        this.filteredCategoryList = [];
        this.isLoading = false;
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

    // Reset filters
    this.filterText = "";
    this.filterChanged();

    this.internetError = false;
    this.generalError = false;
  }

  seeMeals(category: string) {
    this.isLoading = true;
    this.dataService.getMealsByCategory(this.selectedFilterCode, category).subscribe({
      next: (data) => {
        this.mealList = data;
        this.filteredMealList = data;

        // Reset filters
        this.filterText = "";
        this.filterChanged();

        this.isLoading = false;
        this.internetError = false;
        this.generalError = false;
        this.showCategoryList = false;
      },
      error: (err) => {
        this.mealList = [];
        this.filteredMealList = [];
        this.showCategoryList = false;
        this.isLoading = false;
        if (err.status === 0) {
          this.internetError = true;
        } else {
          this.generalError = true;
        }
      },
    });
  }

  seeDetails(index: number) {
    const meal = this.filteredMealList[index];
    if (meal) {
      this.router.navigate(["tabs/meal/" + meal.id]);
    }
  }

  filterChanged() {
    this.filteredCategoryList = this.categoryList.filter((category) =>
      category.toLowerCase().includes(this.filterText.toLowerCase())
    );
    this.filteredMealList = this.mealList.filter((meal) =>
      meal.name.toLowerCase().includes(this.filterText.toLowerCase())
    );
  }
}
