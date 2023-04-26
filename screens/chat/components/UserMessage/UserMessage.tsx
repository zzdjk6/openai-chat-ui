import { AntDesign } from "@expo/vector-icons";
import { Circle, Text } from "native-base";
import React from "react";

import { MessageBlock } from "../MessageBlock/MessageBlock";

type UserMessageProps = {
  content: string;
};

export const UserMessage: React.FC<UserMessageProps> = (props) => {
  const { content } = props;

  return (
    <MessageBlock
      icon={
        <Circle bgColor="primary.600" width="24px" height="24px">
          <AntDesign name="user" size={16} color="white" />
        </Circle>
      }
      content={<Text color="white">{content}</Text>}
    />
  );
};
