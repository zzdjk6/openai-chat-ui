import AsyncStorage from "@react-native-async-storage/async-storage";
import { createAction, createAsyncThunk } from "@reduxjs/toolkit";
import * as SecureStore from "expo-secure-store";
import { Platform } from "react-native";

import { ChatModel } from "../../services/openai/ChatService.types";

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

export const updateChatModel = createAction<ChatModel>("store/settings/updateChatModel");
