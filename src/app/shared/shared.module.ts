import { IonicModule } from "@ionic/angular";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { ErrorCardComponent } from "./error-card/error-card.component";
import { ImgFallbackDirective } from "../directives/img-fallback.directive";

@NgModule({
  imports: [IonicModule, CommonModule, FormsModule],
  exports: [ErrorCardComponent, ImgFallbackDirective],
  declarations: [ErrorCardComponent, ImgFallbackDirective],
})
export class SharedModule {}
