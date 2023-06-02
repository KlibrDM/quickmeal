import { inject } from "@angular/core/testing";
import { ImgFallbackDirective } from "./img-fallback.directive";
import { ElementRef } from "@angular/core";

describe("ImgFallbackDirective", () => {
  it("should create an instance", inject([], (elementRef: ElementRef) => {
    const directive = new ImgFallbackDirective(elementRef);
    expect(directive).toBeTruthy();
  }));
});
