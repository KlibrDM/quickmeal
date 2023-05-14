import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Meal } from "src/app/models/meal";
import { DataService } from "src/app/services/data.service";

@Component({
  selector: "app-meal",
  templateUrl: "./meal.page.html",
  styleUrls: ["./meal.page.scss"],
})
export class MealPage implements OnInit {
  meal?: Meal;

  generalError: boolean = false;
  internetError: boolean = false;

  constructor(private dataService: DataService, private router: Router, private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.queryParams.subscribe((_params) => {
      const navigationExtras = this.router.getCurrentNavigation()?.extras.state;
      if (navigationExtras?.["meal"]) {
        this.meal = navigationExtras?.["meal"];
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

  retry() {
    const id = this.route.snapshot.paramMap.get("id");
    if (id) {
      this.getMeal(id);
    }
  }
}
