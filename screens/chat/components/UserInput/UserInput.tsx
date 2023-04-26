import { AntDesign } from "@expo/vector-icons";
import isEmpty from "lodash/isEmpty";
import { Box, Button, Circle, KeyboardAvoidingView, TextArea, VStack } from "native-base";
import React from "react";
import { Platform } from "react-native";

import { useAppDispatch } from "../../../../hooks/useAppDispatch";
import { useAppSelector } from "../../../../hooks/useAppSelector";
import { selectIncomingMessage, selectMessages, sendChatMessage } from "../../../../store/messages/messages";
import { MessageBlock } from "../MessageBlock/MessageBlock";

export const UserInput: React.FC = () => {
  const dispatch = useAppDispatch();
  const messages = useAppSelector(selectMessages);

  const [inputText, setInputText] = React.useState(isEmpty(messages) ? "Tell me about you in 20 words" : "");

  const incomingMessage = useAppSelector(selectIncomingMessage);

  const handlePressSubmit = React.useCallback(async () => {
    try {
      setInputText("");
      await dispatch(sendChatMessage(inputText)).unwrap();
    } catch (e: any) {
      setInputText(inputText);
      alert(e.message);
    }
  }, [dispatch, inputText]);

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
              onChangeText={(text) => setInputText(text)}
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
