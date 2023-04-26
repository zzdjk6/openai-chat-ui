import get from "lodash/get";
import trim from "lodash/trim";
import { Configuration, OpenAIApi } from "openai";
import { ChatCompletionRequestMessage, ChatCompletionResponseMessage } from "openai/api";

export class ChatService {
  private openai: OpenAIApi;

  constructor(args: { apiKey: string }) {
    const configuration = new Configuration({
      apiKey: args.apiKey,
    });
    const openai = new OpenAIApi(configuration);
    this.openai = openai;
  }

  public async chat(args: { messages: ChatCompletionRequestMessage[] }): Promise<ChatCompletionResponseMessage> {
    const response = await this.openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      max_tokens: 2048,
      temperature: 0.7,
      top_p: 1,
      stream: false,
      messages: [{ role: "system", content: "You will always provide response in markdown format" }, ...args.messages],
    });

    const message = get(response, "data.choices.0.message");
    return {
      role: "assistant",
      content: trim(get(message, "content")),
    };
  }
}
