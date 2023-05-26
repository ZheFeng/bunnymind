const {
  ChatCompletionRequestMessageRoleEnum,
  Configuration,
  OpenAIApi,
} = require("openai");

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

module.exports.send = async function (prompt, temperature) {
  if (prompt === null || prompt.trim().length === 0) {
    throw new Error("Empty prompt");
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
  return completion.data;
};
