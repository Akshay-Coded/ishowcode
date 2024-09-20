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

app.use(cors());

app.use(bodyParser.json());

app.post('/analyze-text', async (req, res) => {
  const { text } = req.body;

  try {
    fs.writeFileSync('text.txt', text);
    const fileContent = fs.readFileSync('text.txt', 'utf8');
    const file = await unified()
      .use(retextEnglish)
      .use(retextProfanities)
      .use(retextStringify)
      .process(fileContent);

    console.error(reporter(file));

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

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
