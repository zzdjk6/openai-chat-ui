import { MaterialIcons } from "@expo/vector-icons";
import { Box, Center, Icon, IconButton, ScrollView, VStack } from "native-base";
import React from "react";

import { Messages } from "./components/Messages/Messages";
import { UserInput } from "./components/UserInput/UserInput";
import { ScreenTitle } from "../../components/ScreenTitle/ScreenTitle";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { useAppSelector } from "../../hooks/useAppSelector";
import { clearMessage } from "../../store/messages/messages";
import { selectApiKey } from "../../store/settings/settings";

export const ChatScreen: React.FC = () => {
  const dispatch = useAppDispatch();

  const apiKey = useAppSelector(selectApiKey);

  const handlePressDelete = React.useCallback(() => {
    dispatch(clearMessage());
  }, [dispatch]);

  return (
    <VStack flexGrow={1}>
      <Box flexGrow={0} flexShrink={0}>
        <ScreenTitle
          title="Chat"
          buttons={
            <>
              <IconButton
                icon={<Icon as={MaterialIcons} name="delete" size="sm" color="white" />}
                onPress={handlePressDelete}
              />
            </>
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
