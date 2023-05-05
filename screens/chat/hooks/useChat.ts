import { ChatCompletionRequestMessage } from "openai/api";
import React from "react";

import { useAppDispatch } from "../../../hooks/useAppDispatch";
import { ChatService } from "../../../services/openai/ChatService";
import {
  addMessage,
  appendIncomingMessage,
  clearIncomingMessage,
  removeLastMessage,
} from "../../../store/messages/messages";

export const useChat = () => {
  const dispatch = useAppDispatch();

  return React.useCallback(
    async (args: { apiKey: string; inputMessages: ChatCompletionRequestMessage[] }) => {
      const { apiKey, inputMessages } = args;
      const chatService = new ChatService({ apiKey });

      try {
        dispatch(appendIncomingMessage("..."));
        const responseMessage = await chatService.chat({ messages: inputMessages });
        dispatch(addMessage({ role: "assistant", content: responseMessage.content }));
      } catch (e: any) {
        dispatch(removeLastMessage());

        if (Object.hasOwn(e, "message")) {
          throw new Error(e.message);
        } else {
          throw new Error("Error happens");
        }
      } finally {
        dispatch(clearIncomingMessage());
      }
    },
    [dispatch]
  );
};
