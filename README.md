# AI-Powered Profanity Filter
This project is an AI-powered profanity filtering tool for streamers and content creators. It integrates React.js for the front-end, Google Gen AI API for advanced language processing, and a Node.js package to detect and filter profanity in both text and speech.

## Features
- **Real-time Profanity Filtering**: Detect and filter inappropriate words in both text and speech using advanced AI models.
- **Customizable Filters**: Replace offensive language with user-defined alternatives (meme sounds, custom text, etc.).
- **Speech-to-Text Integration**: Automatically process live audio streams for profanity.
- **Google Gen AI API**: Utilize the latest AI language models for more accurate, context-aware content moderation.
- **Cross-Platform**: Works seamlessly across streaming platforms (YouTube, Twitch, etc.).
## Installation

### Prerequisites

- Node.js and npm installed
- A Google Cloud project with access to the Google Gen AI API (see [Google Cloud Setup](https://cloud.google.com/gen-ai) for API key)

### Steps

1. **Clone the repository**:

    ```bash
    git clone https://github.com/username/profanity-filter.git
    cd profanity-filter
    ```

2. **Install dependencies**:

    ```bash
    npm install
    cd client
    npm install
    ```

3. **Set up environment variables**:

   Create a `.env` file in the root directory and add the following:

    ```bash
    REACT_APP_GOOGLE_GENAI_API_KEY=your_google_gen_ai_api_key
    ```

4. **Run the client and server**:

    ```bash
    # In one terminal, start the Node server
    npm run dev

    # In another terminal, start the React frontend
    cd client
    npm start
    ```

The app will be running at `http://localhost:3000`.

## Usage

1. **Live Filtering**: Add the profanity filter widget to your stream by embedding the provided React component.
2. **Settings**: Use the settings page to customize how the profanity filter behaves (e.g., choose between replacing words with meme sounds, beeps, or custom text).
3. **Speech Recognition**: Enable the speech-to-text feature for automatic audio stream moderation.
4. **AI-Powered Moderation**: The backend uses the Google Gen AI API for more accurate filtering by understanding the context in which words are used.

## Profanity Filtering Logic

The profanity filtering is powered by the `bad-words` Node package. Offensive language is identified and replaced or removed based on user preferences. The AI enhances this by understanding nuances like slang, homophones, and tone, ensuring a smoother user experience.

To install `bad-words`, run:

```bash
npm install bad-words
