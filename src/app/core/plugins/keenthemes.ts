import { MenuComponent } from "@/components/UI/menu";
import { ScrollComponent } from "@/components/UI/scroll";
import { StickyComponent } from "@/components/UI/sticky";
import { ToggleComponent } from "@/components/UI/toggle";
import { DrawerComponent } from "@/components/UI/drawer";
import { SwapperComponent } from "@/components/UI/swapper";

/**
 * @description Initialize KeenThemes custom components
 */
const initializeComponents = () => {
  setTimeout(() => {
    ToggleComponent.bootstrap();
    StickyComponent.bootstrap();
    MenuComponent.bootstrap();
    ScrollComponent.bootstrap();
    DrawerComponent.bootstrap();
    SwapperComponent.bootstrap();
  }, 0);
};

/**
 * @description Reinitialize KeenThemes custom components
 */
const reinitializeComponents = () => {
  setTimeout(() => {
    ToggleComponent.reinitialization();
    StickyComponent.reInitialization();
    MenuComponent.reinitialization();
    reinitializeScrollComponent().then(() => {
      ScrollComponent.updateAll();
    });
    DrawerComponent.reinitialization();
    SwapperComponent.reinitialization();
  }, 0);
};

const reinitializeScrollComponent = async () => {
  await ScrollComponent.reinitialization();
};

export { initializeComponents, reinitializeComponents, reinitializeScrollComponent };
