import { createReducer } from "@reduxjs/toolkit";
import { ChatCompletionRequestMessage } from "openai/api";

import {
  addMessage,
  appendIncomingMessage,
  clearIncomingMessage,
  clearMessage,
  removeLastMessage,
  updateUserInput,
} from "./messages.actions";

type MessagesState = {
  messages: ChatCompletionRequestMessage[];
  incomingMessage: string;
  userInput: string;
};

const initialState: MessagesState = {
  messages: [],
  incomingMessage: "",
  userInput: "",
};

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
    })
    .addCase(updateUserInput, (state, action) => {
      state.userInput = action.payload;
    });
});
