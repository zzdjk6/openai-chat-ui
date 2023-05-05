import { ChatCompletionRequestMessage } from "openai/api";
import React from "react";

import { useAppDispatch } from "../../../hooks/useAppDispatch";
import { useAppStore } from "../../../hooks/useAppStore";
import { ChatService } from "../../../services/openai/ChatService";
import {
  addMessage,
  appendIncomingMessage,
  clearIncomingMessage,
  removeLastMessage,
  selectIncomingMessage,
} from "../../../store/messages/messages";

export const useChatInStream = () => {
  const dispatch = useAppDispatch();
  const store = useAppStore();

  return React.useCallback(
    async (args: { apiKey: string; inputMessages: ChatCompletionRequestMessage[] }) => {
      const { apiKey, inputMessages } = args;
      const chatService = new ChatService({ apiKey });

      let isChunkArrived = false;

      try {
        dispatch(appendIncomingMessage("..."));
        await chatService.chatInStream({
          messages: inputMessages,
          onChunk: (chunk) => {
            if (!isChunkArrived) {
              isChunkArrived = true;
              dispatch(clearIncomingMessage());
            }
            dispatch(appendIncomingMessage(chunk));
          },
        });
        const incomingMessage = selectIncomingMessage(store.getState());
        dispatch(clearIncomingMessage);
        dispatch(addMessage({ role: "assistant", content: incomingMessage }));
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
    [dispatch, store]
  );
};
