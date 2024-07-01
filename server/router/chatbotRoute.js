import { Groq } from "groq-sdk";
import express from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();
const groq = new Groq(process.env.GROQ_API_KEY);

// In-memory storage for chat histories
const chatHistories = {};

router.post("/chat", authMiddleware, async (req, res) => {
  try {
    const userId = req.userId; // Ensure this is correctly set by authMiddleware
    const userInput = req.body.userInput;
    const systemMessage = `You are a helpful AI therapist answer short and precise.`;

    // Initialize chat history for the user if it doesn't exist
    if (!chatHistories[userId]) {
      chatHistories[userId] = [{ role: "system", content: systemMessage }];
    }

    // Add user input to history
    chatHistories[userId].push({ role: "user", content: userInput });

    // Create the message array for the API request
    const messages = chatHistories[userId];

    const { data: chatCompletion } = await groq.chat.completions
      .create({
        messages: messages,
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

      // Add assistant response to history
      chatHistories[userId].push({ role: "assistant", content: responseText });
      // console.log(chatHistories[userId])

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
      .json({ error: "An error occurred while processing the request"});
  }
});

export default router;
