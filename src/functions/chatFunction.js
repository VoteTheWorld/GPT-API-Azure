const { app } = require("@azure/functions");
const { Configuration, OpenAIApi } = require("openai");

const config = new Configuration({
  organization: "org-",
  apiKey: "sk-",
});

const openai = new OpenAIApi(config);

app.http("chatFunction", {
  methods: ["GET", "POST"],
  authLevel: "anonymous",
  handler: async (request, context) => {
    const { messages } = await request.json();

    context.log(messages);

    const completion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content:
            "Your name is Wang Xudong and you are the boyfriend of shen sixian, also you are an helpeful assistant. Answer as concisely as possible. Knowledge cutoff: {year 2022} Current date: {20 April 2023}",
        },
        ...messages,
      ],
    });
    return { jsonBody: { completion: completion.data.choices[0].message } };
  },
});
