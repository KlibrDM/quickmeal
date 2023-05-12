import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Meal } from "src/app/models/meal";

@Component({
  selector: "app-meal",
  templateUrl: "./meal.page.html",
  styleUrls: ["./meal.page.scss"],
})
export class MealPage implements OnInit {
  meal?: Meal;
  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.queryParams.subscribe((_params) => {
      const navigationExtras = this.router.getCurrentNavigation()?.extras.state;
      if (navigationExtras?.["meal"]) {
        this.meal = navigationExtras?.["meal"];
      } else {
        // TODO: Implement get by id
      }
    });
  }
}
