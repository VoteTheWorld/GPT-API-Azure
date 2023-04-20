import { Configuration, OpenAIApi } from "openai";
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";

const config = new Configuration({
  organization: "org-",
  apiKey: "sk-",
});

const openai = new OpenAIApi(config);
const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(cors());

app.post("/", async (req, res) => {
  const { messages } = req.body;

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
  res.json({
    completion: completion.data.choices[0].message,
  });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
