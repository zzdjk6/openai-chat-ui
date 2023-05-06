import get from "lodash/get";
import trim from "lodash/trim";
import { ChatCompletionRequestMessage } from "openai/api";

import { ChatConfig } from "./ChatService.types";

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
  public async streamChat(args: {
    messages: ChatCompletionRequestMessage[];
    config: ChatConfig;
    onChunk: (chunk: string) => void;
  }) {
    const { messages, config, onChunk } = args;

    // This is required when running on native device
    const extraOptions = {
      reactNative: { textStreaming: true },
    };

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: this.commonHeaders,
      body: JSON.stringify({
        ...config,
        stream: true,
        messages,
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
