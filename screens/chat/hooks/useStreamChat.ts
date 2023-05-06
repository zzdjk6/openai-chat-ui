import { ChatCompletionRequestMessage } from "openai/api";
import React from "react";

import { useAppDispatch } from "../../../hooks/useAppDispatch";
import { useAppStore } from "../../../hooks/useAppStore";
import { ChatService } from "../../../services/openai/ChatService";
import { ChatConfig, ChatModel } from "../../../services/openai/ChatService.types";
import {
  addMessage,
  appendIncomingMessage,
  clearIncomingMessage,
  removeLastMessage,
} from "../../../store/messages/messages.actions";
import { selectIncomingMessage } from "../../../store/messages/messages.selectors";
import { selectChatModel } from "../../../store/settings/settings.selectors";

export const useStreamChat = () => {
  const dispatch = useAppDispatch();
  const store = useAppStore();

  return React.useCallback(
    async (args: { apiKey: string; inputMessages: ChatCompletionRequestMessage[] }) => {
      const { apiKey, inputMessages } = args;
      const chatService = new ChatService({ apiKey });

      let isChunkArrived = false;

      // TODO: Allow configure system message
      const systemMessage: ChatCompletionRequestMessage = {
        role: "system",
        content: "You will always provide response in markdown format",
      };

      // TODO: Allow configure chat config
      const config: ChatConfig = {
        model: selectChatModel(store.getState()),
        top_p: 1,
        max_tokens: 2048,
        temperature: 0.7,
      };

      try {
        dispatch(appendIncomingMessage("..."));
        await chatService.streamChat({
          messages: [systemMessage, ...inputMessages],
          config,
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
