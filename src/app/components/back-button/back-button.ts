import { Component, Input } from '@angular/core';
import { routerBack } from "@/core/helpers/router-back";

@Component({
  selector: 'app-back-button',
  templateUrl: './back-button.html',
})
export class BackButton {
  @Input() defaultUrl: string | null = null;

  returnToPreviousPage(): void {
    routerBack(this.defaultUrl ?? '');
  }
}
