import get from "lodash/get";
import trim from "lodash/trim";
import { ChatCompletionRequestMessage } from "openai/api";

export class ChatService {
  private readonly apiKey: string;
  private readonly commonHeaders: Record<string, string>;

  constructor(args: { apiKey: string }) {
    this.apiKey = args.apiKey;
    this.commonHeaders = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${this.apiKey}`,
    };
  }

  /**
   * Chat with GPT in stream
   *
   * @param args
   */
  public async streamChat(args: { messages: ChatCompletionRequestMessage[]; onChunk: (chunk: string) => void }) {
    const { messages, onChunk } = args;

    const extraOptions = {
      reactNative: { textStreaming: true },
    };

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: this.commonHeaders,
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        max_tokens: 2048,
        temperature: 0.7,
        top_p: 1,
        stream: true,
        messages: [{ role: "system", content: "You will always provide response in markdown format" }, ...messages],
      }),
      ...extraOptions,
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }

    await this.readChunks(response, onChunk);
  }

  private async readChunks(response: Response, onChunk: (chunk: string) => void) {
    const reader = response.body?.getReader();
    if (!reader) {
      throw new Error("Error: fail to read data from response");
    }

    while (true) {
      const { done, value } = await reader.read();
      if (done) {
        break;
      }
      const chunk = this.parseChunkData(value);
      onChunk(chunk);
    }
  }

  private parseChunkData(value: Uint8Array) {
    const textDecoder = new TextDecoder("utf-8");
    const chunkData = textDecoder.decode(value);

    const items = chunkData
      .split("\n")
      .map(trim)
      .filter((str) => !!str)
      .map((str) => str.replace("data: ", ""))
      .filter((str) => str !== "[DONE]")
      .map((str) => JSON.parse(str));

    return items.map((item) => get(item, "choices.0.delta.content")).join("");
  }
}
