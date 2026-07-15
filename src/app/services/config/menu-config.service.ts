import { inject, Injectable } from '@angular/core';
import AuthService from '@/services/auth.service';

interface MenuItem {
  heading: string;
  route: string;
  svgIcon?: string;
  fontIcon?: string;
  sectionTitle?: string;
  sub?: MenuItem[];
}
interface MenuItems {
  [key: string]: MenuItem
}

const menuItems: MenuItems = {
  about_membership: {
    heading: "About My Membership",
    route: "/about-membership",
  },
  clubs: {
    heading: "My Clubs",
    route: "/my-clubs",
  },
  offers: {
    heading: "All offers",
    route: "/offers",
  },
  profile: {
    heading: "Profile",
    route: "/personal/account-profile",
  },
  referrals: {
    heading: "Referrals",
    route: "/personal/account-referrals",
  },
  contact_us: {
    heading: "Contact Us",
    route: "/contact-us",
  },
};

@Injectable({ providedIn: 'root' })
export default class MenuConfigService {
  private authService = inject(AuthService);
  getPages = (menuItem: MenuItems): MenuItem[] => {
    const pages: MenuItem[] = [];

    for (const [access, page] of Object.entries(menuItem)) {
      if (this.authService.hasAccess(access)) {
        pages.push(<MenuItem>page);
      }
    }
    return pages;
  };

  menuConfig = [
    {
      heading: "main",
      route: "",
      pages: this.getPages(menuItems),
    },
  ];
}
