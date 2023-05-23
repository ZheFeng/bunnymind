import { NextResponse } from "next/server";
import {
  ChatCompletionRequestMessageRoleEnum,
  Configuration,
  OpenAIApi,
} from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export async function GET(request: Request) {
  if (!configuration.apiKey) {
    return NextResponse.error();
  }

  const { searchParams } = new URL(request.url);
  const prompt = searchParams.get("prompt");
  const temperature = searchParams.get("temperature");
  if (prompt === null || prompt.trim().length === 0) {
    return NextResponse.error();
  }

  const completion = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: ChatCompletionRequestMessageRoleEnum.User,
        content: prompt,
      },
    ],
    temperature: parseFloat(temperature ?? "0.6"),
  });
  return NextResponse.json({ result: completion.data });
}
