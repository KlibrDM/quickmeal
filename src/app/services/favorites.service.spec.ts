import { TestBed } from "@angular/core/testing";

import { FavoritesService } from "./favorites.service";
import { IonicStorageModule } from "@ionic/storage-angular";

describe("FavoritesService", () => {
  let service: FavoritesService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [IonicStorageModule.forRoot()],
    });
    service = TestBed.inject(FavoritesService);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });
});
