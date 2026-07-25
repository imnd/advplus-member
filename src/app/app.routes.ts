import { CanActivateFn, Router, Routes } from "@angular/router";
import { inject } from "@angular/core";
import { AuthStore } from "@/store/auth";
import { BodyStore } from "@/store/body";

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
    return router.createUrlTree(["/my-clubs"]);
  }
  return true;
};

const ifAuthenticated = async (route: Route, state: { url: string; }) => {
  const auth = inject(AuthStore);
  const body = inject(BodyStore);
  const router = inject(Router);

  try {
    await auth.verifyAuth();

    body.removeBodyClassName("page-loading");
    const isAccountProfile = route.data["name"] === "account-profile";

    if (!isAccountProfile) {
      if (auth.isMembershipExpired()) {
        return router.createUrlTree(["personal/account-profile"]);
      }
    }
    return true;
  } catch (e) {
    return router.createUrlTree(["sign-in"], {
      queryParams: { redirect: state.url },
    });
  }
};

export const routes: Routes = [
  {
    path: "",
    loadComponent: () => import("@/layout/main/main").then((m) => m.MainLayout),
    canActivate: [ ifAuthenticated ],
    children: [
      {
        path: "",
        redirectTo: "my-clubs",
        pathMatch: "full",
      },
      {
        path: "personal",
        loadComponent: () => import("@/pages/personal/account/account").then(m => m.AccountPage),
        children: [
          {
            path: "account-profile",
            data: {
              title: "Profile",
              name: "account-profile",
            },
            loadComponent: () => import("@/pages/personal/profile/profile").then(m => m.ProfilePage),
          },
          {
            path: "account-referrals",
            loadComponent: () => import("@/pages/personal/account/referrals/referrals").then(m => m.ReferralsPage),
            data: {
              name: "account-referrals",
              title: "Referrals",
            },
          },
          {
            path: "payment-details",
            loadComponent: () => import("@/pages/personal/account/payment-details/payment-details").then(m => m.PaymentDetailsPage),
            data: {
              name: "account-payment-details",
              title: "Payment Details",
            },
          },
        ],
      },
      {
        path: "my-clubs",
        loadComponent: () => import("@/pages/clubs/my-clubs/my-clubs").then(m => m.MyClubsPage),
        data: {
          alias: "/",
          name: "my-clubs",
          title: "Clubs",
        },
      },
      {
        path: "all-clubs",
        loadComponent: () => import("@/pages/clubs/all-clubs/all-clubs").then(m => m.AllClubsPage),
        data: {
          name: "all-clubs",
          title: "Clubs",
        },
      },
      {
        path: "my-clubs/:slug",
        loadComponent: () => import("@/pages/clubs/club-details/club-details").then(m => m.ClubDetailsPage),
        data: {
          name: "club-details",
          title: "Clubs",
        },
      },
      {
        path: "offers",
        loadComponent: () => import("@/pages/offers/offers/offers").then(m => m.OffersPage),
        data: {
          name: "offers",
          title: "Offers",
        },
      },
      {
        path: "offers/:id",
        loadComponent: () => import("@/pages/offers/offer-details/offer-details").then(m => m.OfferDetailsPage),
        data: {
          name: "offer-details",
          title: "Offers",
        },
      },
      {
        path: "about-membership",
        loadComponent: () => import("@/pages/about-membership/about/about").then(m => m.AboutPage),
        data: {
          name: "about-membership",
          title: "About Membership",
        },
      },
      {
        path: "about-membership/:id",
        loadComponent: () => import("@/pages/about-membership/details/details").then(m => m.DetailsPage),
        data: {
          name: "about-membership-details",
          title: "About Membership",
        },
      },
      {
        path: "contact-us",
        loadComponent: () => import("@/pages/contact-us/contact-us").then(m => m.ContactUsPage),
        data: {
          name: "contact-us",
          title: "Contact Us",
        },
      },
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
      {
        path: "forgot-password",
        loadComponent: () => import("@/pages/auth/forgot-password/forgot-password").then(m => m.ForgotPasswordPage),
        data: {
          name: "forgot-password",
          title: "Forgot password",
        },
      },
      {
        path: "reset-password",
        loadComponent: () => import("@/pages/auth/update-password/update-password").then(m => m.UpdatePasswordPage),
        data: {
          name: "reset-password",
        },
      },
      {
        path: "create-password",
        loadComponent: () => import("@/pages/auth/update-password/update-password").then(m => m.UpdatePasswordPage),
        data: {
          name: "create-password",
        },
      },
    ],
  },
  {
    path: "authenticate",
    loadComponent: () => import("@/pages/auth/authenticate-token/authenticate-token").then(m => m.AuthenticateTokenPage),
    data: {
      name: "authenticate-token",
    },
  },
  {
    path: "404",
    loadComponent: () => import("@/pages/errors/error-404/error-404").then(m => m.Error404Page),
    data: {
      name: "404",
    },
  },
  {
    path: "500",
    loadComponent: () => import("@/pages/errors/error-500/error-500").then(m => m.Error500Page),
    data: {
      name: "500",
    },
  },
  {
    path: ":pathMatch(.*)*",
    loadComponent: () => import("@/pages/errors/error-404/error-404").then(m => m.Error404Page),
  },
];
