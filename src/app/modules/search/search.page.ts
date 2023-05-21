import { OnInit, AfterViewInit, Component, ElementRef, ViewChild } from "@angular/core";
import { Router } from "@angular/router";
import { debounceTime, distinctUntilChanged, fromEvent, map } from "rxjs";
import { Meal } from "src/app/models/meal";
import { Settings } from "src/app/models/settings";
import { DataService } from "src/app/services/data.service";
import { SettingsService } from "src/app/services/settings.service";

@Component({
  selector: "app-search",
  templateUrl: "search.page.html",
  styleUrls: ["search.page.scss"],
})
export class SearchPage implements OnInit, AfterViewInit {
  @ViewChild("searchInput", { read: ElementRef }) searchInput!: ElementRef;
  mealList: Meal[] = [];
  settings?: Settings;
  isSearching: boolean = false;

  generalError: boolean = false;
  internetError: boolean = false;
  noDataError: boolean = false;

  constructor(private dataService: DataService, private router: Router, private settingsService: SettingsService) {}

  ngOnInit(): void {
    this.getSettings();
  }

  getSettings() {
    this.settingsService.settings.subscribe({
      next: (data) => {
        this.settings = data;
      },
    });
  }

  ngAfterViewInit(): void {
    fromEvent(this.searchInput.nativeElement, "input")
      .pipe(map((event: any) => event.target.value))
      .pipe(
        map((e) => {
          this.isSearching = true;
          return e;
        })
      )
      .pipe(debounceTime(1500))
      .pipe(distinctUntilChanged())
      .subscribe((searchTerm) => {
        if (searchTerm === "") {
          this.mealList = [];
          this.noDataError = false;
          this.isSearching = false;
          return;
        }

        this.dataService.getSearch(searchTerm).subscribe({
          next: (data) => {
            this.mealList = data;
            this.isSearching = false;
            this.internetError = false;
            this.generalError = false;
            if (this.mealList.length === 0) {
              this.noDataError = true;
            } else {
              this.noDataError = false;
            }
          },
          error: (err) => {
            this.mealList = [];
            this.isSearching = false;
            if (err.status === 0) {
              this.internetError = true;
            } else {
              this.generalError = true;
            }
          },
        });
      });
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
