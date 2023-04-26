import { Ionicons } from "@expo/vector-icons";
import React from "react";

import { FooterNavigationContext } from "./FooterNavigation.context";
import { FooterNavigationScreen } from "./FooterNavigation.types";
import { FooterNavigationItem } from "./FooterNavigationItem";

export const FooterNavigationItemPrompts: React.FC = () => {
  const { activeScreen, setActiveScreen } = React.useContext(FooterNavigationContext);

  return (
    <FooterNavigationItem
      activeIcon={<Ionicons name="md-list" />}
      idleIcon={<Ionicons name="md-list-outline" />}
      isActive={activeScreen === FooterNavigationScreen.Prompts}
      label="Prompts"
      onPress={() => setActiveScreen(FooterNavigationScreen.Prompts)}
    />
  );
};
