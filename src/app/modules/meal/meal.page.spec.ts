import { ComponentFixture, TestBed } from "@angular/core/testing";
import { MealPage } from "./meal.page";
import { IonicModule } from "@ionic/angular";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { RouterTestingModule } from "@angular/router/testing";

describe("MealPage", () => {
  let component: MealPage;
  let fixture: ComponentFixture<MealPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MealPage],
      imports: [IonicModule.forRoot(), HttpClientTestingModule, RouterTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(MealPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
