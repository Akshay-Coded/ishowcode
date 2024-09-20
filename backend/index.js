import express from 'express';
import fs from 'fs';
import cors from 'cors';
import bodyParser from 'body-parser';
import retextEnglish from 'retext-english';
import retextProfanities from 'retext-profanities';
import retextStringify from 'retext-stringify';
import { unified } from 'unified';
import { reporter } from 'vfile-reporter';

const app = express();
const PORT = 5000;

// Enable CORS to allow requests from the frontend
app.use(cors());

// Use bodyParser to parse JSON data from requests
app.use(bodyParser.json());

// Route to handle POST requests from frontend
app.post('/analyze-text', async (req, res) => {
  const { text } = req.body;

  try {
    // Process the text received from the frontend
    const file = await unified()
      .use(retextEnglish)
      .use(retextProfanities)
      .use(retextStringify)
      .process(text);

    // Log the result to the console (optional)
    console.error(reporter(file));

    // Respond back with the processed text and any warnings/errors
    res.json({
      message: 'Text processed successfully',
      result: String(file),
      warnings: file.messages.map((message) => message.message),
    });
  } catch (error) {
    console.error('Error processing text:', error);
    res.status(500).json({ error: 'Failed to process text' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
