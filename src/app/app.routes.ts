import { CanActivateFn, Router, Routes } from '@angular/router';
import { inject } from '@angular/core';
import { AuthStore } from '@/store/auth';
import { BodyStore } from '@/store/body';

interface RouteData {
  name: string;
  title: string;
}

interface Route {
  path: string
  data: RouteData
  children?: Route[]
  loadComponent: () => {}
}

const ifNotAuthenticated: CanActivateFn = () => {
  const authStore = inject(AuthStore);
  if (authStore.isUserAuthenticated()) {
    const router = inject(Router);
    return router.createUrlTree(['/']);
  }
  return true;
};

const ifAuthenticated = async (route: Route, state: {
  url: string;
}) => {
  const auth = inject(AuthStore);
  const body = inject(BodyStore);
  const router = inject(Router);

  try {
    await auth.verifyAuth();

    body.removeBodyClassName("page-loading");
    const isAccountProfile = route.data['name'] === 'account-profile';

    if (!isAccountProfile) {
      const isMembershipExpired = auth.isMembershipExpired();
      const isFromEmptyProcessing = state.url === '/' && auth.currentUser().isProcessing;

      if (isMembershipExpired || isFromEmptyProcessing) {
        return router.createUrlTree(['account-profile']);
      }
    }
    return true;
  } catch {
    return router.createUrlTree(['sign-in'], {
      queryParams: { redirect: state.url },
    });
  }
};

export const routes: Routes = [
  {
    path: "",
    loadComponent: () => import("@/layout/main/main").then((m) => m.MainLayoutComponent),
    canActivate: [ ifAuthenticated ],
    children: [
      {
        path: "personal",
        loadComponent: () => import("@/pages/personal/account/account").then(m => m.AccountPageComponent),
        children: [
          {
            path: "account-profile",
            data: {
              title: "Profile",
              name: 'account-profile',
            },
            loadComponent: () => import("@/pages/personal/profile/profile").then(m => m.ProfilePageComponent),
          },
          /*{
            path: "account-referrals",
            loadComponent: () => import("@/pages/personal/account/referrals/referrals"),
            data: {
              name: "account-referrals",
              title: "Referrals",
            },
          },
          {
            path: "payment-details",
            loadComponent: () => import("@/pages/personal/account/payment-details/payment-details"),
            data: {
              name: "account-payment-details",
              title: "Payment Details",
            },
          },*/
        ],
      },
      /*{
        path: "my-clubs",
        alias: "/",
        loadComponent: () => import("@/views/clubs/Clubs.vue"),
        data: {
          name: "my-clubs",
          title: "Clubs",
        },
      },
      {
        path: "all-clubs",
        loadComponent: () => import("@/views/clubs/AllClubs.vue"),
        data: {
          name: "all-clubs",
          title: "Clubs",
        },
      },
      {
        path: "my-clubs/:slug",
        loadComponent: () => import("@/views/clubs/ClubDetails.vue"),
        data: {
          name: "club-details",
          title: "Clubs",
        },
      },
      {
        path: "offers",
        loadComponent: () => import("@/views/offers/Offers.vue"),
        data: {
          name: "offers",
          title: "Offers",
        },
      },
      {
        path: "offers/:id",
        loadComponent: () => import("@/views/offers/OfferDetails.vue"),
        data: {
          name: "offer-details",
          title: "Offers",
        },
      },
      {
        path: "about-membership",
        loadComponent: () => import("@/views/about-membership/AboutMembership.vue"),
        data: {
          name: "about-membership",
          title: "About Membership",
        },
      },
      {
        path: "about-membership/:id",
        loadComponent: () => import("@/views/about-membership/AboutMembershipDetails.vue"),
        data: {
          name: "about-membership-details",
          title: "About Membership",
        },
      },
      {
        path: "contact-us",
        loadComponent: () => import("@/views/pages/ContactUs.vue"),
        data: {
          name: "contact-us",
          title: "Contact Us",
        },
      },*/
    ]
  },
  {
    path: "",
    loadComponent: () => import("@/layout/auth/auth").then(m => m.AuthLayoutComponent),
    canActivate: [ifNotAuthenticated],
    children: [
      {
        path: "sign-in",
        loadComponent: () => import("@/pages/auth/sign-in/sign-in").then(m => m.SignInPageComponent),
        data: {
          name: "sign-in",
          title: "Sign-in",
        },
      },
      /*{
        path: "forgot-password",
        loadComponent: () => import("@/views/auth/ForgotPassword.vue"),
        data: {
          name: "forgot-password",
          title: "Forgot password",
        },
      },
      {
        path: "reset-password",
        loadComponent: () => import("@/views/auth/UpdatePassword.vue"),
        data: {
          name: "reset-password",
        },
      },
      {
        path: "create-password",
        loadComponent: () => import("@/views/auth/UpdatePassword.vue"),
        data: {
          name: "create-password",
        },
      },*/
    ],
  },
  /*{
    path: "authenticate",
    loadComponent: () => import("@/views/auth/AuthenticateToken.vue"),
    data: {
      name: "authenticate-token",
    },
  },
  {
    // the 404 route, when none of the above matches
    path: "404",
    loadComponent: () => import("@/views/errors/Error404.vue"),
    data: {
    name: "404",
    },
  },
  {
    path: "500",
    loadComponent: () => import("@/views/errors/Error500.vue"),
    data: {
    name: "500",
    },
  },
  {
    path: ":pathMatch(.*)*",
    loadComponent: () => import("@/views/errors/Error404.vue"),
  },*/
];
