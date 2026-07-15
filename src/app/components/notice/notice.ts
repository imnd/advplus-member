import { Component, Input } from '@angular/core';
import { InlineSvgComponent } from '@/components/UI/inline-svg/inline-svg';

@Component({
  selector: 'app-notice',
  imports: [ InlineSvgComponent ],
  templateUrl: './notice.html',
})
export class Notice {
  @Input({ required: true }) classes!: string;
  @Input({ required: true }) icon!: string;
  @Input({ required: true }) title!: string;
  @Input({ required: true }) body!: string;
  @Input({ required: true }) button!: string;
  @Input({ required: true }) buttonModalId!: string;
  @Input() buttonLabel: string = "Button";
  @Input() buttonUrl: string = "#";
  @Input() color: string = "primary";
  @Input() padding: string = "p-6";
}
