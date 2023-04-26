import { Ionicons } from "@expo/vector-icons";
import React from "react";

import { FooterNavigationContext } from "./FooterNavigation.context";
import { FooterNavigationScreen } from "./FooterNavigation.types";
import { FooterNavigationItem } from "./FooterNavigationItem";

export const FooterNavigationItemChat: React.FC = () => {
  const { activeScreen, setActiveScreen } = React.useContext(FooterNavigationContext);

  return (
    <FooterNavigationItem
      activeIcon={<Ionicons name="chatbox" />}
      idleIcon={<Ionicons name="chatbox-outline" />}
      isActive={activeScreen === FooterNavigationScreen.Chat}
      label="Chat"
      onPress={() => setActiveScreen(FooterNavigationScreen.Chat)}
    />
  );
};
