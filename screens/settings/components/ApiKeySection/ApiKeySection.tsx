import truncate from "lodash/truncate";
import { Box, Button, HStack, Text } from "native-base";
import React from "react";

import { useAppSelector } from "../../../../hooks/useAppSelector";
import { selectApiKey } from "../../../../store/settings/settings.selectors";
import { ApiKeyUpdateDialog } from "../ApiKeyUpdateDialog/ApiKeyUpdateDialog";

export const ApiKeySection: React.FC = () => {
  const apiKey = useAppSelector(selectApiKey);

  const [isDialogOpen, setIsDialogOpen] = React.useState(false);

  const handleDialogClose = React.useCallback(() => {
    setIsDialogOpen(false);
  }, []);

  const handlePressUpdate = React.useCallback(() => {
    setIsDialogOpen(true);
  }, []);

  const displayApiKey = React.useMemo(() => {
    if (!apiKey) {
      return "Not set";
    }
    return `${truncate(apiKey, { length: 10, omission: "" })}******`;
  }, [apiKey]);

  return (
    <>
      <Box width="90%" px={2} py={4} borderRadius="sm" bgColor="gray.800">
        <HStack alignItems="center" justifyContent="space-between">
          <Text color="white">Api Key: {displayApiKey}</Text>
          <Button onPress={handlePressUpdate}>Update</Button>
        </HStack>
      </Box>

      <ApiKeyUpdateDialog isOpen={isDialogOpen} onClose={handleDialogClose} />
    </>
  );
};
