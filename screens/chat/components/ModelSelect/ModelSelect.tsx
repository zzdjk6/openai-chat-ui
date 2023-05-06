import { CheckIcon, Select } from "native-base";
import React from "react";

import { useAppDispatch } from "../../../../hooks/useAppDispatch";
import { useAppSelector } from "../../../../hooks/useAppSelector";
import { ChatModel } from "../../../../services/openai/ChatService.types";
import { updateChatModel } from "../../../../store/settings/settings.actions";
import { selectChatModel } from "../../../../store/settings/settings.selectors";

export const ModelSelect: React.FC = () => {
  const dispatch = useAppDispatch();

  const chatModel = useAppSelector(selectChatModel);

  const handleValueChange = React.useCallback(
    (itemValue: string) => {
      const newModel = Object.values(ChatModel).find((item) => item === itemValue);
      if (!newModel) {
        return;
      }

      dispatch(updateChatModel(newModel));
    },
    [dispatch]
  );

  return (
    <Select
      selectedValue={chatModel}
      accessibilityLabel="Choose Chat Model"
      placeholder="Choose Chat Model"
      _selectedItem={{
        bg: "primary.600",
        endIcon: <CheckIcon size="5" />,
      }}
      onValueChange={handleValueChange}
      width={120}
    >
      <Select.Item label="GPT3.5" value={ChatModel.GPT3_5} />
      <Select.Item label="GPT4" value={ChatModel.GPT4} />
    </Select>
  );
};
