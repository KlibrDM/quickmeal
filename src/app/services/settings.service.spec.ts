import { TestBed } from "@angular/core/testing";

import { SettingsService } from "./settings.service";
import { IonicStorageModule } from "@ionic/storage-angular";

describe("SettingsService", () => {
  let service: SettingsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [IonicStorageModule.forRoot()],
    });
    service = TestBed.inject(SettingsService);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });
});
