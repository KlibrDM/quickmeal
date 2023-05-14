import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { TabsPage } from "./tabs.page";

const routes: Routes = [
  {
    path: "tabs",
    component: TabsPage,
    children: [
      {
        path: "home",
        loadChildren: () => import("../home/home.module").then((m) => m.HomePageModule),
      },
      {
        path: "search",
        loadChildren: () => import("../search/search.module").then((m) => m.SearchPageModule),
      },
      {
        path: "meal/:id",
        loadChildren: () => import("../meal/meal.module").then((m) => m.MealPageModule),
      },
      {
        path: "categories",
        loadChildren: () => import("../categories/categories.module").then((m) => m.CategoriesPageModule),
      },
      {
        path: "favorites",
        loadChildren: () => import("../favorites/favorites.module").then((m) => m.FavoritesPageModule),
      },
      {
        path: "",
        redirectTo: "/tabs/home",
        pathMatch: "full",
      },
    ],
  },
  {
    path: "",
    redirectTo: "/tabs/home",
    pathMatch: "full",
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule {}
