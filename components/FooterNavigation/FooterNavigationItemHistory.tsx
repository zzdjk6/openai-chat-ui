import { Ionicons } from "@expo/vector-icons";
import React from "react";

import { FooterNavigationContext } from "./FooterNavigation.context";
import { FooterNavigationScreen } from "./FooterNavigation.types";
import { FooterNavigationItem } from "./FooterNavigationItem";

export const FooterNavigationItemHistory: React.FC = () => {
  const { activeScreen, setActiveScreen } = React.useContext(FooterNavigationContext);

  return (
    <FooterNavigationItem
      activeIcon={<Ionicons name="archive" />}
      idleIcon={<Ionicons name="archive-outline" />}
      isActive={activeScreen === FooterNavigationScreen.History}
      label="History"
      onPress={() => setActiveScreen(FooterNavigationScreen.History)}
    />
  );
};
