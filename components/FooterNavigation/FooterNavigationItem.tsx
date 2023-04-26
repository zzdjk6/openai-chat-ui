import { Center, Icon, Pressable, Text } from "native-base";
import React from "react";

type FooterNavigationItemProps = {
  label: string;
  activeIcon: React.ReactElement;
  idleIcon: React.ReactElement;
  isActive: boolean;
  onPress: () => void;
};

export const FooterNavigationItem: React.FC<FooterNavigationItemProps> = (props) => {
  const { label, activeIcon, idleIcon, isActive, onPress } = props;

  return (
    <Pressable opacity={isActive ? 1 : 0.5} py="3" flex={1} onPress={onPress}>
      <Center>
        <Icon mb="1" as={isActive ? activeIcon : idleIcon} color="white" size="sm" />
        <Text color="white" fontSize="12">
          {label}
        </Text>
      </Center>
    </Pressable>
  );
};
