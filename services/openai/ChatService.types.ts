export enum ChatModel {
  GPT3_5 = "gpt-3.5-turbo",
  GPT4 = "gpt-4",
}

export type ChatConfig = {
  model: ChatModel;

  /**
   * The maximum number of tokens to generate in the chat completion.
   *
   * The total length of input tokens and generated tokens is limited by the model's context length.
   */
  max_tokens: number;

  /**
   * What sampling temperature to use, between 0 and 2. Higher values like 0.8 will make the output more random, while lower values like 0.2 will make it more focused and deterministic.
   *
   * We generally recommend altering this or top_p but not both.
   */
  temperature: number;

  /**
   * An alternative to sampling with temperature, called nucleus sampling, where the model considers the results of the tokens with top_p probability mass. So 0.1 means only the tokens comprising the top 10% probability mass are considered.
   *
   * We generally recommend altering this or temperature but not both.
   */
  top_p: number;
};
