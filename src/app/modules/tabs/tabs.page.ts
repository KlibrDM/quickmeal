import { Location } from "@angular/common";
import { Component } from "@angular/core";
import { App } from "@capacitor/app";
import { Platform } from "@ionic/angular";

@Component({
  selector: "app-tabs",
  templateUrl: "tabs.page.html",
  styleUrls: ["tabs.page.scss"],
})
export class TabsPage {
  constructor(private platform: Platform, private location: Location) {
    this.platform.backButton.subscribeWithPriority(10, (processNextHandler) => {
      if (this.location.isCurrentPathEqualTo("/tabs/home")) {
        App.exitApp();
        processNextHandler();
      } else {
        this.location.back();
      }
    });
  }
}
