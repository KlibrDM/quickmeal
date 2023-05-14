import { IonicModule } from "@ionic/angular";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { FavoritesPage } from "./favorites.page";

import { FavoritesPageRoutingModule } from "./favorites-routing.module";
import { SharedModule } from "src/app/shared/shared.module";

@NgModule({
  imports: [IonicModule, CommonModule, FormsModule, FavoritesPageRoutingModule, SharedModule],
  declarations: [FavoritesPage],
})
export class FavoritesPageModule {}
