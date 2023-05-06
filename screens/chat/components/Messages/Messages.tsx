import { VStack } from "native-base";
import React from "react";

import { useAppSelector } from "../../../../hooks/useAppSelector";
import { selectMessages } from "../../../../store/messages/messages.selectors";
import { AssistantMessage } from "../AssistantMessage/AssistantMessage";
import { IncomingMessage } from "../IncomingMessage/IncomingMessage";
import { UserMessage } from "../UserMessage/UserMessage";

export const Messages: React.FC = () => {
  const messages = useAppSelector(selectMessages);

  return (
    <VStack alignContent="stretch">
      {messages.map((message, index) => {
        if (message.role === "user") {
          return <UserMessage key={index} content={message.content} />;
        }
        if (message.role === "assistant") {
          return <AssistantMessage key={index} content={message.content} />;
        }
      })}
      <IncomingMessage />
    </VStack>
  );
};
