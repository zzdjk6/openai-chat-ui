import { createReducer } from "@reduxjs/toolkit";

import { updateApiKey, updateChatModel } from "./settings.actions";
import { ChatModel } from "../../services/openai/ChatService.types";

type SettingsState = {
  apiKey: string;
  chatModel: ChatModel;
};

const initialState: SettingsState = {
  apiKey: "",
  chatModel: ChatModel.GPT3_5,
};

export const settingsReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(updateApiKey.fulfilled, (state, action) => {
      state.apiKey = action.payload;
    })
    .addCase(updateChatModel, (state, action) => {
      state.chatModel = action.payload;
    });
});
