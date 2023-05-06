import { Box, Center, HStack, ScrollView, VStack } from "native-base";
import React from "react";

import { ClearChatButton } from "./components/ClearChatButton/ClearChatButton";
import { Messages } from "./components/Messages/Messages";
import { ModelSelect } from "./components/ModelSelect/ModelSelect";
import { UserInput } from "./components/UserInput/UserInput";
import { ScreenTitle } from "../../components/ScreenTitle/ScreenTitle";
import { useAppSelector } from "../../hooks/useAppSelector";
import { selectApiKey } from "../../store/settings/settings.selectors";

export const ChatScreen: React.FC = () => {
  const apiKey = useAppSelector(selectApiKey);

  return (
    <VStack flexGrow={1}>
      <Box flexGrow={0} flexShrink={0}>
        <ScreenTitle
          title="Chat"
          buttons={
            <HStack space={2}>
              <ModelSelect />
              <ClearChatButton />
            </HStack>
          }
        />
      </Box>

      {!apiKey && <Center py={4}>Please set Api Key before chat</Center>}
      {apiKey && (
        <ScrollView flexGrow={1} flexShrink={1} flexBasis={0}>
          <Messages />
          <UserInput />
        </ScrollView>
      )}
    </VStack>
  );
};
