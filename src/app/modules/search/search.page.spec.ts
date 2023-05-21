import { ComponentFixture, TestBed } from "@angular/core/testing";
import { IonicModule } from "@ionic/angular";

import { SearchPage } from "./search.page";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { SharedModule } from "src/app/shared/shared.module";
import { IonicStorageModule } from "@ionic/storage-angular";

describe("SearchPage", () => {
  let component: SearchPage;
  let fixture: ComponentFixture<SearchPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SearchPage],
      imports: [IonicModule.forRoot(), IonicStorageModule.forRoot(), HttpClientTestingModule, SharedModule],
    }).compileComponents();

    fixture = TestBed.createComponent(SearchPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
