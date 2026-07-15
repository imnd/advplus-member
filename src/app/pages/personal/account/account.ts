import { Component } from '@angular/core';
import { RenewalBlock } from '@/components/renewal-block/renewal-block';
import { ProcessingBlock } from '@/components/processing-block/processing-block';
import { AccountMenu } from '@/components/account/account-menu/account-menu';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-account',
  imports: [
    RenewalBlock,
    ProcessingBlock,
    AccountMenu,
    RouterOutlet
  ],
  templateUrl: './account.html',
})
export class AccountPageComponent {}
