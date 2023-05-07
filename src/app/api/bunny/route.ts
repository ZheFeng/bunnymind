import { NextResponse } from "next/server";
import { Configuration, OpenAIApi } from "openai";

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
  if (prompt === null || prompt.trim().length === 0) {
    return NextResponse.error();
  }

  const completion = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: prompt,
    temperature: 0.6,
  });
  return NextResponse.json({ result: completion.data });
}
