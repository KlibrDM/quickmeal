import { Component, OnInit } from "@angular/core";
import { Settings } from "src/app/models/settings";
import { SettingsService } from "src/app/services/settings.service";

@Component({
  selector: "app-settings",
  templateUrl: "./settings.page.html",
  styleUrls: ["./settings.page.scss"],
})
export class SettingsPage implements OnInit {
  settings: Settings = {
    limitedBandwidth: false,
    compactMode: false,
  };

  constructor(private settingsService: SettingsService) {}

  ngOnInit() {
    this.getData();
  }

  getData() {
    this.settingsService.settings.subscribe({
      next: (data) => {
        this.settings = data;
      },
    });
  }

  saveSettings() {
    this.settingsService.saveSettings(this.settings);
  }
}
