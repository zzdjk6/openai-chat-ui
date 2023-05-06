import { MaterialIcons } from "@expo/vector-icons";
import { Icon, IconButton } from "native-base";
import React from "react";

import { useAppDispatch } from "../../../../hooks/useAppDispatch";
import { clearMessage } from "../../../../store/messages/messages.actions";

export const ClearChatButton: React.FC = () => {
  const dispatch = useAppDispatch();

  const handlePressDelete = React.useCallback(() => {
    dispatch(clearMessage());
  }, [dispatch]);

  return (
    <IconButton icon={<Icon as={MaterialIcons} name="delete" size="sm" color="white" />} onPress={handlePressDelete} />
  );
};
