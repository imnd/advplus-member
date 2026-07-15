import LayoutConfigTypes from "./layout-config-types";

const config: LayoutConfigTypes = {
  themeName: "Adv+ Advantage",
  themeVersion: "2.0.0",
  main: {
    type: "default",
    primaryColor: "#009EF7",
    logo: {
      dark: "/media/logos/logo.svg",
      light: "/media/logos/logo.svg",
    },
  },
  illustrations: {
    set: "sketchy-1",
  },
  loader: {
    logo: "media/logos/logo.svg",
    display: true,
    type: "spinner-message",
  },
  scrollTop: {
    display: true,
  },
  header: {
    display: true,
    menuIcon: "font",
    width: "fixed",
    fixed: {
      desktop: true,
      tabletAndMobile: true,
    },
  },
  toolbar: {
    display: true,
    width: "fixed",
    fixed: {
      desktop: true,
      tabletAndMobile: true,
    },
  },
  aside: {
    display: false,
    theme: "dark",
    fixed: true,
    menuIcon: "svg",
    minimized: false,
    minimize: true,
    hoverable: true,
  },
  content: {
    width: "fixed",
  },
  footer: {
    width: "fixed",
  },
};

export default config;
