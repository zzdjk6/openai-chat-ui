import { Box, Center, ScrollView, VStack } from "native-base";
import React from "react";

import { ApiKeySection } from "./components/ApiKeySection/ApiKeySection";
import { ScreenTitle } from "../../components/ScreenTitle/ScreenTitle";

export const SettingsScreen: React.FC = () => {
  return (
    <VStack flexGrow={1}>
      <Box flexGrow={0} flexShrink={0}>
        <ScreenTitle title="Settings" />
      </Box>

      <ScrollView flexGrow={1} flexShrink={1} flexBasis={0}>
        <Center py={4}>
          <ApiKeySection />
        </Center>
      </ScrollView>
    </VStack>
  );
};
