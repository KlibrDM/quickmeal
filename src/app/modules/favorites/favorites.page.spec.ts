import { ComponentFixture, TestBed } from "@angular/core/testing";
import { IonicModule } from "@ionic/angular";
import { IonicStorageModule } from "@ionic/storage-angular";

import { FavoritesPage } from "./favorites.page";
import { SharedModule } from "src/app/shared/shared.module";

describe("FavoritesPage", () => {
  let component: FavoritesPage;
  let fixture: ComponentFixture<FavoritesPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FavoritesPage],
      imports: [IonicModule.forRoot(), IonicStorageModule.forRoot(), SharedModule],
    }).compileComponents();

    fixture = TestBed.createComponent(FavoritesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
