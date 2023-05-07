import { Modal, Button, Box, Text, Spacer, VStack } from "native-base";
import React from "react";

type UsePromptDialogProps = {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  act: string;
  prompt: string;
};

export const UsePromptDialog: React.FC<UsePromptDialogProps> = ({ isOpen, onClose, onConfirm, act, prompt }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <Modal.Content maxWidth="400px">
        <Modal.CloseButton />
        <Modal.Header>Use prompt?</Modal.Header>
        <Modal.Body>
          <VStack space="2">
            <Box>
              <Text bold>WARN: Use a prompt will wipe your current chat!</Text>
            </Box>
            <Box>
              <Text bold>Act:</Text>
              <Text>{act}</Text>
            </Box>
            <Box>
              <Text bold>Prompt:</Text>
              <Text>{prompt}</Text>
            </Box>
          </VStack>
        </Modal.Body>
        <Modal.Footer>
          <Button.Group space={2}>
            <Button variant="ghost" onPress={onClose}>
              Cancel
            </Button>
            <Button onPress={onConfirm}>Use</Button>
          </Button.Group>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  );
};
