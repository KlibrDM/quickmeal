import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";

@Component({
  selector: "app-error-card",
  templateUrl: "./error-card.component.html",
  styleUrls: ["./error-card.component.scss"],
})
export class ErrorCardComponent implements OnInit {
  @Input() generalError: boolean = false;
  @Input() internetError: boolean = false;
  @Input() noDataError: boolean = false;
  @Input() noFavoritesError: boolean = false;
  @Input() allowRetry: boolean = false;
  @Output() retry = new EventEmitter<any>();

  constructor() {}

  ngOnInit() {}

  retryClicked() {
    this.retry.emit();
  }
}
