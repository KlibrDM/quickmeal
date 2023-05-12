import { AfterViewInit, Component, ElementRef, ViewChild } from "@angular/core";
import { Router } from "@angular/router";
import { debounceTime, distinctUntilChanged, fromEvent, map } from "rxjs";
import { Meal } from "src/app/models/meal";
import { DataService } from "src/app/services/data.service";

@Component({
  selector: "app-search",
  templateUrl: "search.page.html",
  styleUrls: ["search.page.scss"],
})
export class SearchPage implements AfterViewInit {
  @ViewChild("searchInput", { read: ElementRef }) searchInput!: ElementRef;
  mealList: Meal[] = [];

  constructor(private dataService: DataService, private router: Router) {}

  ngAfterViewInit(): void {
    fromEvent(this.searchInput.nativeElement, "input")
      .pipe(map((event: any) => event.target.value))
      .pipe(debounceTime(1500))
      .pipe(distinctUntilChanged())
      .subscribe((searchTerm) => {
        this.dataService.getSearch(searchTerm).subscribe((data) => {
          this.mealList = data;
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
