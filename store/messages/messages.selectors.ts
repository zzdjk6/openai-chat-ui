import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../store";

export const selectMessagesState = (state: RootState) => state.messages;
export const selectMessages = createSelector([selectMessagesState], (state) => {
  return state.messages;
});
export const selectIncomingMessage = createSelector([selectMessagesState], (state) => {
  return state.incomingMessage;
});
