const express = require("express");
const router = express.Router();
const axios = require("axios");
require("dotenv").config();

const HUGGING_FACE_API_URL =
  "https://api-inference.huggingface.co/models/deepseek-ai/DeepSeek-R1-Distill-Qwen-32B";
const API_KEY = process.env.HUGGING_FACE_API_KEY;

// Function to remove markdown and specific HTML-like tags using regex
function removeMarkdown(text) {
  // Remove markdown links [text](url)
  text = text.replace(/\[([^\]]+)\]\([^)]+\)/g, "$1");
  // Remove bold markdown **text**
  text = text.replace(/\*\*(.*?)\*\*/g, "$1");
  // Remove italic markdown *text*
  text = text.replace(/\*(.*?)\*/g, "$1");
  // Remove any HTML tags (this also removes tags like <think> or </think>)
  text = text.replace(/<\/?[^>]+(>|$)/g, "");
  return text;
}

router.post("/chat", async (req, res) => {
  const { message } = req.body;

  if (!message) {
    return res.status(400).json({ error: "Message is required" });
  }

  try {
    console.log("Sending request to Hugging Face with message:", message);

    const response = await axios.post(
      HUGGING_FACE_API_URL,
      {
        inputs: message,
      },
      {
        headers: {
          Authorization: `Bearer ${API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    console.log("Received response from Hugging Face:", response.data);

    let aiReply =
      response.data[0]?.generated_text || "Sorry, no response from AI.";

    // Clean the reply by removing markdown and HTML-like tags
    aiReply = removeMarkdown(aiReply);

    res.json({ reply: aiReply });
  } catch (error) {
    console.error("Detailed error:", error.response?.data || error.message);
    res.status(500).json({
      error: "Error communicating with Hugging Face AI",
      details: error.response?.data || error.message,
    });
  }
});

module.exports = router;
