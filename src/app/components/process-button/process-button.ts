import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-process-button',
  templateUrl: './process-button.html',
})
export class ProcessButton {
  @Input({ required: true }) loading!: boolean;
  @Input() loadingText: string = "Please wait...";
  @Input() buttonClass: string = "btn-portal";
}
