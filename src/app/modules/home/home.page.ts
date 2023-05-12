import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Meal } from "src/app/models/meal";
import { DataService } from "src/app/services/data.service";

@Component({
  selector: "app-home",
  templateUrl: "home.page.html",
  styleUrls: ["home.page.scss"],
})
export class HomePage implements OnInit {
  randomMeal?: Meal;
  constructor(private dataService: DataService, private router: Router) {}

  ngOnInit(): void {
    this.dataService.getRandom().subscribe((data) => {
      this.randomMeal = data[0];
    });
  }

  tryAnother(event: MouseEvent) {
    event.stopPropagation();
    this.dataService.getRandom().subscribe((data) => {
      this.randomMeal = data[0];
    });
  }

  seeDetails(event: MouseEvent) {
    event.stopPropagation();
    this.router.navigate(["tabs/meal/" + this.randomMeal!.id], {
      state: {
        meal: this.randomMeal,
      },
    });
  }
}
