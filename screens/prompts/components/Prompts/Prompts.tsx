import { FlatList } from "native-base";
import React from "react";
import { ListRenderItem } from "react-native";

import data from "../../../../assets/prompts.json";
import { Prompt } from "../Prompt/Prompt";

type PromptItem = (typeof data)[number];

export const Prompts: React.FC = () => {
  const renderItem: ListRenderItem<PromptItem> = React.useCallback(({ item }) => <Prompt {...item} />, []);

  const keyExtractor = React.useCallback((item: PromptItem) => item.prompt, []);

  return <FlatList data={data} renderItem={renderItem} keyExtractor={keyExtractor} />;
};
