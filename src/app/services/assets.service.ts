import ConfigService from "@/services/config/config.service";
import { inject, Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export default class AssetsService {
  private configService = inject(ConfigService);

  getIllustrationsPath = (illustrationName: string): string => {
    return `media/illustrations/${this.configService.illustrationsSet()}/${illustrationName}`;
  };
}
