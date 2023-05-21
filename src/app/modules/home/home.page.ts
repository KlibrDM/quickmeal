import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Meal } from "src/app/models/meal";
import { Settings } from "src/app/models/settings";
import { DataService } from "src/app/services/data.service";
import { SettingsService } from "src/app/services/settings.service";

@Component({
  selector: "app-home",
  templateUrl: "home.page.html",
  styleUrls: ["home.page.scss"],
})
export class HomePage implements OnInit {
  randomMeal?: Meal;
  settings?: Settings;

  generalError: boolean = false;
  internetError: boolean = false;

  constructor(private dataService: DataService, private router: Router, private settingsService: SettingsService) {}

  ngOnInit(): void {
    this.getSettings();
    this.getRandomMeal();
  }

  getSettings() {
    this.settingsService.settings.subscribe({
      next: (data) => {
        this.settings = data;
      },
    });
  }

  getRandomMeal() {
    this.dataService.getRandom().subscribe({
      next: (data) => {
        this.randomMeal = data[0];

        this.generalError = false;
        this.internetError = false;
      },
      error: (err) => {
        if (err.status === 0) {
          this.internetError = true;
        } else {
          this.generalError = true;
        }
      },
    });
  }

  tryAnother(event?: MouseEvent) {
    event?.stopPropagation();
    this.getRandomMeal();
  }

  retry() {
    this.tryAnother();
  }

  seeDetails(event: MouseEvent) {
    event.stopPropagation();
    this.router.navigate(["tabs/meal/" + this.randomMeal!.id], {
      state: {
        meal: this.randomMeal,
      },
    });
  }

  goToSettings() {
    this.router.navigate(["tabs/settings"]);
  }
}
