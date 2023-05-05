import AsyncStorage from "@react-native-async-storage/async-storage";
import { createAsyncThunk, createReducer, createSelector } from "@reduxjs/toolkit";
import * as SecureStore from "expo-secure-store";
import { Platform } from "react-native";

import type { RootState } from "../store";

type SettingsState = {
  apiKey: string;
};

const initialState: SettingsState = {
  apiKey: "",
};

export const initApiKey = createAsyncThunk("store/settings/initApiKey", async (_, thunkAPI) => {
  let result: string | null;
  if (Platform.OS === "web") {
    result = await AsyncStorage.getItem("API_KEY");
  } else {
    result = await SecureStore.getItemAsync("API_KEY");
  }

  await thunkAPI.dispatch(updateApiKey(result || ""));
});

export const updateApiKey = createAsyncThunk("store/settings/updateApiKey", async (apiKey: string) => {
  if (Platform.OS === "web") {
    await AsyncStorage.setItem("API_KEY", apiKey);
  } else {
    await SecureStore.setItemAsync("API_KEY", apiKey);
  }

  return apiKey;
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
