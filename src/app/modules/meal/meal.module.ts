import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { MealPageRoutingModule } from "./meal-routing.module";

import { MealPage } from "./meal.page";
import { SharedModule } from "src/app/shared/shared.module";

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, MealPageRoutingModule, SharedModule],
  declarations: [MealPage],
})
export class MealPageModule {}
