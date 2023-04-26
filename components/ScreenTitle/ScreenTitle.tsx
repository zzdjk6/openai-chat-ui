import { HStack, Text } from "native-base";
import React from "react";

type ScreenTitleProps = {
  title: string;
  buttons?: React.ReactElement;
};

export const ScreenTitle: React.FC<ScreenTitleProps> = (props) => {
  const { title, buttons } = props;

  return (
    <HStack bg="dark.50" px="4" py="4" justifyContent="space-between" alignItems="center" w="100%">
      <HStack alignItems="center">
        <Text color="white" fontSize="20" fontWeight="bold">
          {title}
        </Text>
      </HStack>
      <HStack>{buttons}</HStack>
    </HStack>
  );
};
