import { Component, inject } from '@angular/core';
import ConfigService from "@/services/config/config.service";
import { getFullYear } from "@/utils/date.util"

@Component({
  selector: 'app-footer',
  templateUrl: './footer.html',
})
export class Footer {
  private configService = inject(ConfigService);
  footerWidthFluid = this.configService.footerWidthFluid;
  getFullYear = getFullYear;
}
