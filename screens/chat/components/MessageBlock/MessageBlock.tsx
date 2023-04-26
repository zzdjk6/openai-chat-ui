import { Box, Flex, HStack } from "native-base";
import React from "react";

type MessageBlockProps = {
  icon: React.ReactElement;
  content: React.ReactElement;
  background?: "normal" | "alt";
};

export const MessageBlock: React.FC<MessageBlockProps> = (props) => {
  const { icon, content, background = "normal" } = props;

  const bgColor = background === "normal" ? "dark.200" : "dark.100";

  return (
    <HStack px={6} py={4} space={4} bgColor={bgColor}>
      <Box flexGrow={0} flexShrink={0}>
        {icon}
      </Box>
      <Flex flexGrow={1} flexShrink={1} flexBasis={0}>
        {content}
      </Flex>
    </HStack>
  );
};
