import { ChatCompletionRequestMessage } from "openai/api";
import React from "react";
import { Platform } from "react-native";

import { useChat } from "./useChat";
import { useChatInStream } from "./useChatInStream";
import { useAppDispatch } from "../../../hooks/useAppDispatch";
import { useAppStore } from "../../../hooks/useAppStore";
import { addMessage, selectMessages } from "../../../store/messages/messages";
import { selectApiKey } from "../../../store/settings/settings";

export const useSendChatMessage = () => {
  const store = useAppStore();
  const dispatch = useAppDispatch();

  const chat = useChat();
  const chatInStream = useChatInStream();

  const sendChatMessage = React.useCallback(
    async (inputText: string) => {
      const apiKey = selectApiKey(store.getState());
      if (!apiKey) {
        throw new Error("Please provide API Key");
      }

      const newUserMessage: ChatCompletionRequestMessage = {
        role: "user",
        content: inputText.trim(),
      };
      dispatch(addMessage(newUserMessage));

      const messages = selectMessages(store.getState());
      const inputMessages = [...messages, newUserMessage];

      if (Platform.OS === "web") {
        await chatInStream({ apiKey, inputMessages });
      } else {
        await chat({ apiKey, inputMessages });
      }
    },
    [chat, chatInStream, dispatch, store]
  );

  return sendChatMessage;
};
