import React from "react";

import { useAppSelector } from "../../../../hooks/useAppSelector";
import { selectIncomingMessage } from "../../../../store/messages/messages";
import { AssistantMessage } from "../AssistantMessage/AssistantMessage";

export const IncomingMessage: React.FC = () => {
  const incomingMessage = useAppSelector(selectIncomingMessage);

  if (!incomingMessage) {
    return null;
  }

  return <AssistantMessage content={incomingMessage} />;
};
