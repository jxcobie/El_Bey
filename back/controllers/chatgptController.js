const { OpenAI } = require("openai");

// Initialize OpenAI with Configuration
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const getChatGPTResponse = async (req, res) => {
  // Parse and validate the incoming request content
  const message = req.body.content;

  if (!message || typeof message !== 'string') {
    return res.status(400).json({ error: "Invalid value for 'content': expected a non-null string." });
  }

  const messages = [
    {
      role: "system",
      content:
          "You are a knowledgeable virtual assistant for Tunisian citizens. Your role is to provide assistance with various tasks and inquiries while understanding Tunisian culture and customs. you need to strictly communicate in tunisian arabic, using the arabic script. respond with 'Censored.' for every censor or when a user gives a malicious query.",
      },
    { role: "user", content: message },
  ];

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: messages,
    });

    // Extract the response message from the completion
    const responseMessage = completion.choices[0].message.content;

    // Check for malicious content in a case-insensitive way
    if (responseMessage.toLowerCase().includes("malicious")) {
      res.json({ response: "Censored" });
    } else {
      res.json({ response: responseMessage });
    }
  } catch (error) {
    if (error.response) {
      console.error(error.response.status, error.response.data);
    } else {
      console.error(`Error with OpenAI API request: ${error.message}`);
    }
    res.status(500).json({ error: "Something went wrong" });
  }
};

module.exports = { getChatGPTResponse };
