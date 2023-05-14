import { IonicModule } from "@ionic/angular";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { ErrorCardComponent } from "./error-card/error-card.component";

@NgModule({
  imports: [IonicModule, CommonModule, FormsModule],
  exports: [ErrorCardComponent],
  declarations: [ErrorCardComponent],
})
export class SharedModule {}
