import { ComponentFixture, TestBed } from "@angular/core/testing";
import { IonicModule } from "@ionic/angular";

import { CategoriesPage } from "./categories.page";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { SharedModule } from "src/app/shared/shared.module";
import { IonicStorageModule } from "@ionic/storage-angular";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

describe("CategoriesPage", () => {
  let component: CategoriesPage;
  let fixture: ComponentFixture<CategoriesPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CategoriesPage],
      imports: [
        IonicModule.forRoot(),
        IonicStorageModule.forRoot(),
        HttpClientTestingModule,
        SharedModule,
        FormsModule,
        ReactiveFormsModule,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CategoriesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
