import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { StorageService } from "./storage.service";
import { Settings } from "../models/settings";

@Injectable({
  providedIn: "root",
})
export class SettingsService {
  settings: BehaviorSubject<Settings> = new BehaviorSubject<Settings>({
    limitedBandwidth: false,
    compactMode: false,
  });

  constructor(private storageService: StorageService) {
    this.init();
  }

  async init() {
    const settings = await this.storageService.get("settings");
    if (settings) {
      this.settings.next(settings);
    }
  }

  async saveSettings(settings: Settings) {
    this.storageService.set("settings", settings);
    this.settings.next(settings);
  }
}
