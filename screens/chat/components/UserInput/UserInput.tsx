import { AntDesign } from "@expo/vector-icons";
import { Box, Button, Circle, KeyboardAvoidingView, TextArea, VStack } from "native-base";
import React from "react";
import { Platform } from "react-native";

import { useAppDispatch } from "../../../../hooks/useAppDispatch";
import { useAppSelector } from "../../../../hooks/useAppSelector";
import { useAppStore } from "../../../../hooks/useAppStore";
import { updateUserInput } from "../../../../store/messages/messages.actions";
import { selectIncomingMessage, selectUserInput } from "../../../../store/messages/messages.selectors";
import { useSendChatMessage } from "../../hooks/useSendChatMessage";
import { MessageBlock } from "../MessageBlock/MessageBlock";

export const UserInput: React.FC = () => {
  const dispatch = useAppDispatch();
  const store = useAppStore();

  const incomingMessage = useAppSelector(selectIncomingMessage);
  const sendChatMessage = useSendChatMessage();
  const inputText = useAppSelector(selectUserInput);

  const handlePressSubmit = React.useCallback(async () => {
    const bufferedInputText = selectUserInput(store.getState());
    try {
      dispatch(updateUserInput(""));
      await sendChatMessage(bufferedInputText);
    } catch (e: any) {
      dispatch(updateUserInput(bufferedInputText));
      alert(e.message);
    }
  }, [dispatch, sendChatMessage, store]);

  const handleChangeText = React.useCallback((text: string) => dispatch(updateUserInput(text)), [dispatch]);

  return (
    <KeyboardAvoidingView
      h={{
        base: "400px",
        lg: "auto",
      }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <MessageBlock
        icon={
          <Box pt={1}>
            <Circle bgColor="primary.600" width="24px" height="24px">
              <AntDesign name="user" size={16} color="white" />
            </Circle>
          </Box>
        }
        content={
          <VStack space="2">
            <TextArea
              borderColor="primary.600"
              autoCompleteType="off"
              placeholder="Tell me about you in 20 words"
              value={inputText}
              onChangeText={handleChangeText}
            />
            <Button onPress={handlePressSubmit} isDisabled={!!incomingMessage || !inputText}>
              Submit
            </Button>
          </VStack>
        }
      />
    </KeyboardAvoidingView>
  );
};
