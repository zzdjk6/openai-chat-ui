import { createAction } from "@reduxjs/toolkit";
import { ChatCompletionRequestMessage } from "openai/api";

export const addMessage = createAction<ChatCompletionRequestMessage>("store/messages/addMessage");
export const clearMessage = createAction("store/messages/clearMessage");
export const removeLastMessage = createAction("store/messages/removeLastMessage");
export const appendIncomingMessage = createAction<string>("store/messages/appendIncomingMessage");
export const clearIncomingMessage = createAction("store/messages/clearIncomingMessage");
