import express from 'express';
import fs from 'fs';
import cors from 'cors';
import bodyParser from 'body-parser';
import retextEnglish from 'retext-english';
import retextProfanities from 'retext-profanities';
import retextStringify from 'retext-stringify';
import { unified } from 'unified';
import { reporter } from 'vfile-reporter';
import { Gen_suggestions } from './gen.js'; // Import the Gen_suggestions function

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

app.post('/analyze-text', async (req, res) => {
  const { text } = req.body;

  try {
    // Write the text to a file (optional)
    fs.writeFileSync('text.txt', text);
    
    // Read from the text file (you can use `text` directly)
    const fileContent = fs.readFileSync('text.txt', 'utf8');

    // Process the text using retext (profanity check)
    const file = await unified()
      .use(retextEnglish)
      .use(retextProfanities)
      .use(retextStringify)
      .process(fileContent);

    // Get warnings from retext
    const warnings = file.messages.map((message) => message.message);

    let suggestions = [];

      suggestions = await Gen_suggestions(fileContent);

    // Send back the response with both warnings and suggestions
    res.json({
      message: 'Text processed successfully',
      result: String(file), // Raw result from retext
      warnings: warnings, // Warnings from retext-profanities
      suggestions: suggestions
    });
  } catch (error) {
    console.error('Error processing text:', error);
    res.status(500).json({ error: 'Failed to process text' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
