import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Box, Circle } from "native-base";
import React from "react";
import { StyleSheet } from "react-native";
import Markdown from "react-native-markdown-display";

import { MessageBlock } from "../MessageBlock/MessageBlock";

type AssistantMessageProps = {
  content: string;
};

export const AssistantMessage: React.FC<AssistantMessageProps> = (props) => {
  const { content } = props;

  return (
    <MessageBlock
      icon={
        <Box pt={1}>
          <Circle bgColor="dark.50" width="24px" height="24px">
            <MaterialCommunityIcons name="robot" size={16} color="white" />
          </Circle>
        </Box>
      }
      content={
        // @ts-ignore
        <Markdown mergeStyle style={markdownStyles}>
          {content}
        </Markdown>
      }
      background="alt"
    />
  );
};

const markdownStyles = StyleSheet.create({
  body: {
    color: "#FFF",
  },
  blockquote: {
    backgroundColor: "#222",
  },
  code_inline: {
    backgroundColor: "#222",
  },
  code_block: {
    backgroundColor: "#222",
  },
  fence: {
    backgroundColor: "#222",
  },
});
