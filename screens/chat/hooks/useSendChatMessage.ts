import { ChatCompletionRequestMessage } from "openai/api";
import React from "react";

import { useStreamChat } from "./useStreamChat";
import { useAppDispatch } from "../../../hooks/useAppDispatch";
import { useAppStore } from "../../../hooks/useAppStore";
import { addMessage } from "../../../store/messages/messages.actions";
import { selectMessages } from "../../../store/messages/messages.selectors";
import { selectApiKey } from "../../../store/settings/settings.selectors";

export const useSendChatMessage = () => {
  const store = useAppStore();
  const dispatch = useAppDispatch();

  const streamChat = useStreamChat();

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

      await streamChat({ apiKey, inputMessages });
    },
    [streamChat, dispatch, store]
  );

  return sendChatMessage;
};
