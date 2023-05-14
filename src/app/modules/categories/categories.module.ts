import { IonicModule } from "@ionic/angular";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { CategoriesPage } from "./categories.page";

import { CategoriesPageRoutingModule } from "./categories-routing.module";
import { SharedModule } from "src/app/shared/shared.module";

@NgModule({
  imports: [IonicModule, CommonModule, FormsModule, ReactiveFormsModule, CategoriesPageRoutingModule, SharedModule],
  declarations: [CategoriesPage],
})
export class CategoriesPageModule {}
