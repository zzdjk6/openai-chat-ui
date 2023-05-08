import { Box, HStack, useColorMode, VStack } from "native-base";
import React from "react";

import { FooterNavigationContext } from "./FooterNavigation.context";
import { FooterNavigationScreen } from "./FooterNavigation.types";
import { FooterNavigationItemChat } from "./FooterNavigationItemChat";
import { FooterNavigationItemHistory } from "./FooterNavigationItemHistory";
import { FooterNavigationItemPrompts } from "./FooterNavigationItemPrompts";
import { FooterNavigationItemSettings } from "./FooterNavigationItemSettings";
import { ChatScreen } from "../../screens/chat/ChatScreen";
import { HistoryScreen } from "../../screens/history/HistoryScreen";
import { PromptsScreen } from "../../screens/prompts/PromptsScreen";
import { SettingsScreen } from "../../screens/settings/SettingsScreen";

export const FooterNavigation: React.FC = () => {
  const [activeScreen, setActiveScreen] = React.useState(FooterNavigationScreen.Chat);

  const { colorMode, setColorMode } = useColorMode();

  React.useEffect(() => {
    if (colorMode !== "dark") {
      setColorMode("dark");
    }
  }, [colorMode, setColorMode]);

  return (
    <FooterNavigationContext.Provider value={{ activeScreen, setActiveScreen }}>
      <VStack height="100%" width="100%" bgColor="dark.200" safeArea>
        <VStack alignItems="stretch" flexGrow={1}>
          {activeScreen === FooterNavigationScreen.Chat && <ChatScreen />}
          {activeScreen === FooterNavigationScreen.History && <HistoryScreen />}
          {activeScreen === FooterNavigationScreen.Prompts && <PromptsScreen />}
          {activeScreen === FooterNavigationScreen.Settings && <SettingsScreen />}
        </VStack>

        <HStack bg="primary.600" alignItems="center" shadow={6} flexGrow={0} flexShrink={0}>
          <FooterNavigationItemChat />
          <FooterNavigationItemHistory />
          <FooterNavigationItemPrompts />
          <FooterNavigationItemSettings />
        </HStack>
      </VStack>
    </FooterNavigationContext.Provider>
  );
};
