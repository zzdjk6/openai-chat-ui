import { Box, ScrollView, VStack } from "native-base";
import React from "react";

import { Prompts } from "./components/Prompts/Prompts";
import { ScreenTitle } from "../../components/ScreenTitle/ScreenTitle";

export const PromptsScreen: React.FC = () => {
  return (
    <VStack flexGrow={1}>
      <Box flexGrow={0} flexShrink={0}>
        <ScreenTitle title="Prompts" />
      </Box>
      <ScrollView flexGrow={1} flexShrink={1} flexBasis={0}>
        <Prompts />
      </ScrollView>
    </VStack>
  );
};
