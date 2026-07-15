import { Component, inject } from '@angular/core';
import { UserMenu } from "@/layout/header/user-menu/user-menu";
import { AuthStore } from '@/store/auth';

@Component({
  selector: 'app-topbar',
  imports: [ UserMenu ],
  templateUrl: './topbar.html',
})
export class Topbar {
  private auth = inject(AuthStore);

  avatar = this.auth.userAvatar;
}
