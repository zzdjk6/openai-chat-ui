import { Box, Pressable, Text, VStack } from "native-base";
import React from "react";

import { FooterNavigationContext } from "../../../../components/FooterNavigation/FooterNavigation.context";
import { FooterNavigationScreen } from "../../../../components/FooterNavigation/FooterNavigation.types";
import { useAppDispatch } from "../../../../hooks/useAppDispatch";
import { clearMessage, updateUserInput } from "../../../../store/messages/messages.actions";
import { UsePromptDialog } from "../UsePromptDialog/UsePromptDialog";

type PromptProps = {
  act: string;
  prompt: string;
};

export const Prompt: React.FC<PromptProps> = ({ act, prompt }) => {
  const dispatch = useAppDispatch();

  const [isDialogOpen, setIsDialogOpen] = React.useState(false);

  const { setActiveScreen } = React.useContext(FooterNavigationContext);

  const handleCloseDialog = React.useCallback(() => {
    setIsDialogOpen(false);
  }, []);

  const handleConfirmUse = React.useCallback(() => {
    setIsDialogOpen(false);
    dispatch(clearMessage());
    dispatch(updateUserInput(prompt));
    setActiveScreen(FooterNavigationScreen.Chat);
  }, [dispatch, prompt, setActiveScreen]);

  const handlePress = React.useCallback(() => {
    setIsDialogOpen(true);
  }, []);

  return (
    <Box px="4" py="2">
      <Pressable backgroundColor="dark.50" py="2" px="4" shadow="4" rounded="md" onPress={handlePress}>
        <VStack>
          <Text bold fontSize="xl">
            {act}
          </Text>
          <Text>{prompt}</Text>
        </VStack>
      </Pressable>

      <UsePromptDialog
        act={act}
        prompt={prompt}
        isOpen={isDialogOpen}
        onClose={handleCloseDialog}
        onConfirm={handleConfirmUse}
      />
    </Box>
  );
};
