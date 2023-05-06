import { createSelector } from "@reduxjs/toolkit";

import { RootState } from "../store";

export const selectSettingsState = (state: RootState) => state.settings;

export const selectApiKey = createSelector([selectSettingsState], (state) => {
  return state.apiKey;
});

export const selectChatModel = createSelector([selectSettingsState], (state) => {
  return state.chatModel;
});
