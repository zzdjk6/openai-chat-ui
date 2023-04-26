import { createAsyncThunk, createReducer, createSelector } from "@reduxjs/toolkit";
import * as SecureStore from "expo-secure-store";

import type { RootState } from "../store";

type SettingsState = {
  apiKey: string;
};

const initialState: SettingsState = {
  apiKey: "",
};

export const initApiKey = createAsyncThunk("store/settings/initApiKey", async (_, thunkAPI) => {
  const result = await SecureStore.getItemAsync("API_KEY");
  await thunkAPI.dispatch(updateApiKey(result || ""));
});

export const updateApiKey = createAsyncThunk("store/settings/updateApiKey", async (arg: string) => {
  await SecureStore.setItemAsync("API_KEY", arg);
  return arg;
});

export const settingsReducer = createReducer(initialState, (builder) => {
  builder.addCase(updateApiKey.fulfilled, (state, action) => {
    state.apiKey = action.payload;
  });
});

export const selectSettingsState = (state: RootState) => state.settings;

export const selectApiKey = createSelector([selectSettingsState], (state) => {
  return state.apiKey;
});
