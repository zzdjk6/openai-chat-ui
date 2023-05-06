import { configureStore } from "@reduxjs/toolkit";

import { messagesReducer } from "./messages/messages.reducer";
import { settingsReducer } from "./settings/settings.reducer";

export const store = configureStore({
  reducer: {
    settings: settingsReducer,
    messages: messagesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export type AppStore = typeof store;
