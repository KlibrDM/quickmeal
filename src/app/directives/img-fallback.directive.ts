import { Directive, ElementRef, HostListener, Input } from "@angular/core";

@Directive({
  selector: "img[appImgFallback]",
})
export class ImgFallbackDirective {
  @Input() appImgFallback?: string;
  errorCount = 0;

  constructor(private eRef: ElementRef) {}

  @HostListener("error")
  loadFallbackOnError() {
    const element: HTMLImageElement = this.eRef.nativeElement;
    if (this.appImgFallback) {
      if (!this.errorCount) {
        element.src = this.appImgFallback;
      } else {
        element.src = "/assets/img-fallback.png";
      }
    } else {
      element.src = "/assets/img-fallback.png";
    }
    this.errorCount++;
  }
}
