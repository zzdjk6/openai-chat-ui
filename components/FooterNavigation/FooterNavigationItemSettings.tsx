import { Ionicons } from "@expo/vector-icons";
import React from "react";

import { FooterNavigationContext } from "./FooterNavigation.context";
import { FooterNavigationScreen } from "./FooterNavigation.types";
import { FooterNavigationItem } from "./FooterNavigationItem";

export const FooterNavigationItemSettings: React.FC = () => {
  const { activeScreen, setActiveScreen } = React.useContext(FooterNavigationContext);

  return (
    <FooterNavigationItem
      activeIcon={<Ionicons name="md-settings" />}
      idleIcon={<Ionicons name="md-settings-outline" />}
      isActive={activeScreen === FooterNavigationScreen.Settings}
      label="Settings"
      onPress={() => setActiveScreen(FooterNavigationScreen.Settings)}
    />
  );
};
