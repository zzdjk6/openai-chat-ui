import { createAction, createAsyncThunk, createReducer, createSelector } from "@reduxjs/toolkit";
import { ChatCompletionRequestMessage } from "openai/api";

import { ChatService } from "../../services/openai/ChatService";
import { selectApiKey } from "../settings/settings";
import type { RootState } from "../store";

type MessagesState = {
  messages: ChatCompletionRequestMessage[];
  incomingMessage: string;
};

const initialState: MessagesState = {
  messages: [],
  incomingMessage: "",
};

export const addMessage = createAction<ChatCompletionRequestMessage>("store/messages/addMessage");
export const clearMessage = createAction("store/messages/clearMessage");
export const removeLastMessage = createAction("store/messages/removeLastMessage");

export const appendIncomingMessage = createAction<string>("store/messages/appendIncomingMessage");
export const clearIncomingMessage = createAction("store/messages/clearIncomingMessage");

export const sendChatMessage = createAsyncThunk(
  "store/messages/sendChatMessage",
  async (inputText: string, thunkAPI) => {
    const apiKey = selectApiKey(thunkAPI.getState() as RootState);
    if (!apiKey) {
      throw new Error("Please provide API Key");
    }

    const newUserMessage: ChatCompletionRequestMessage = {
      role: "user",
      content: inputText.trim(),
    };
    thunkAPI.dispatch(addMessage(newUserMessage));
    thunkAPI.dispatch(appendIncomingMessage("..."));

    const chatService = new ChatService({ apiKey });
    const messages = selectMessages(thunkAPI.getState() as RootState);
    const inputMessages = [...messages, newUserMessage];

    try {
      const responseMessage = await chatService.chat({ messages: inputMessages });
      thunkAPI.dispatch(addMessage({ role: "assistant", content: responseMessage.content }));
    } catch (e: any) {
      thunkAPI.dispatch(removeLastMessage());

      if (Object.hasOwn(e, "message")) {
        throw new Error(e.message);
      } else {
        throw new Error("Error happens");
      }
    } finally {
      thunkAPI.dispatch(clearIncomingMessage());
    }
  }
);

export const messagesReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(addMessage, (state, action) => {
      state.messages.push(action.payload);
    })
    .addCase(clearMessage, (state) => {
      state.messages = [];
    })
    .addCase(removeLastMessage, (state) => {
      state.messages = state.messages.slice(0, -1);
    })
    .addCase(appendIncomingMessage, (state, action) => {
      state.incomingMessage = state.incomingMessage.concat(action.payload);
    })
    .addCase(clearIncomingMessage, (state) => {
      state.incomingMessage = "";
    });
});

export const selectMessagesState = (state: RootState) => state.messages;

export const selectMessages = createSelector([selectMessagesState], (state) => {
  return state.messages;
});

export const selectIncomingMessage = createSelector([selectMessagesState], (state) => {
  return state.incomingMessage;
});
