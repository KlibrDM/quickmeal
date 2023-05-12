import { IonicModule } from "@ionic/angular";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { SearchPage } from "./search.page";

import { SearchPageRoutingModule } from "./search-routing.module";

@NgModule({
  imports: [IonicModule, CommonModule, FormsModule, SearchPageRoutingModule],
  declarations: [SearchPage],
})
export class SearchPageModule {}
