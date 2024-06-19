import { Groq } from "groq-sdk";
import express from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();
const groq = new Groq(process.env.GROQ_API_KEY);

router.post("/chat", authMiddleware, async (req, res) => {
  try {
    const userInput = req.body.userInput;
    const systemMessage = `You are a helpful AI therapist.`;

    const { data: chatCompletion } = await groq.chat.completions
      .create({
        messages: [
          { role: "system", content: systemMessage },
          { role: "user", content: userInput },
        ],
        model: "llama3-8b-8192",
        temperature: 0.7,
        max_tokens: 500,
      })
      .withResponse();

    if (
      chatCompletion &&
      chatCompletion.choices &&
      chatCompletion.choices.length > 0
    ) {
      const responseText = chatCompletion.choices[0].message.content;
      res.json({ message: responseText });
    } else {
      console.error("Unexpected API response:", chatCompletion);
      res
        .status(500)
        .json({ error: "An error occurred while processing the request" });
    }
  } catch (error) {
    console.error("Error:", error);
    res
      .status(500)
      .json({ error: "An error occurred while processing the request" });
  }
});

export default router;
