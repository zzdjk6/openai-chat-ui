import { Box, VStack } from "native-base";
import React from "react";

import { ScreenTitle } from "../../components/ScreenTitle/ScreenTitle";

export const PromptsScreen: React.FC = () => {
  return (
    <VStack flexGrow={1}>
      <Box flexGrow={0} flexShrink={0}>
        <ScreenTitle title="Prompts" />
      </Box>
    </VStack>
  );
};
