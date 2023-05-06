import { Button, FormControl, Input, Modal } from "native-base";
import React from "react";

import { useAppDispatch } from "../../../../hooks/useAppDispatch";
import { useAppStore } from "../../../../hooks/useAppStore";
import { updateApiKey } from "../../../../store/settings/settings.actions";
import { selectApiKey } from "../../../../store/settings/settings.selectors";

type ApiKeyUpdateDialogProps = {
  isOpen: boolean;
  onClose: () => void;
};

export const ApiKeyUpdateDialog: React.FC<ApiKeyUpdateDialogProps> = (props) => {
  const { isOpen, onClose } = props;
  const dispatch = useAppDispatch();
  const store = useAppStore();

  const [apiKey, setApiKey] = React.useState("");

  const handleClickSave = React.useCallback(async () => {
    dispatch(updateApiKey(apiKey));
    onClose();
  }, [apiKey, dispatch, onClose]);

  React.useEffect(() => {
    if (!isOpen) {
      return;
    }

    const existingApiKey = selectApiKey(store.getState());
    setApiKey(existingApiKey);
  }, [isOpen, store]);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <Modal.Content maxWidth="80%">
        <Modal.CloseButton />
        <Modal.Header>Update Api Key</Modal.Header>
        <Modal.Body>
          <FormControl>
            <FormControl.Label>Api Key</FormControl.Label>
            <Input value={apiKey} onChangeText={setApiKey} />
          </FormControl>
        </Modal.Body>
        <Modal.Footer>
          <Button.Group space={2}>
            <Button variant="ghost" colorScheme="blueGray" onPress={onClose}>
              Cancel
            </Button>
            <Button onPress={handleClickSave}>Save</Button>
          </Button.Group>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  );
};
