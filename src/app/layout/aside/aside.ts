import { Component, Input } from '@angular/core';
import { AsideMenu } from '@/layout/aside/menu/menu';
import { InlineSvgComponent } from '@/components/UI/inline-svg/inline-svg';

@Component({
  selector: 'app-aside',
  imports: [AsideMenu, InlineSvgComponent],
  templateUrl: './aside.html',
})
export class Aside {
  @Input() darkLogo: string = "";
  @Input() lightLogo: string = "";
}
