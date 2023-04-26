import React from "react";

import { FooterNavigationScreen } from "./FooterNavigation.types";

export const FooterNavigationContext = React.createContext({
  activeScreen: FooterNavigationScreen.Chat,
  setActiveScreen: (screen: FooterNavigationScreen) => {},
});
