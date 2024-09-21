import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [text, setText] = useState('');
  const [response, setResponse] = useState(null);
  const [voices, setVoices] = useState([]);
  const [selectedVoiceIndex, setSelectedVoiceIndex] = useState(0);

  useEffect(() => {
    const loadVoices = () => {
      let availableVoices = window.speechSynthesis.getVoices();
      if (availableVoices.length > 0) {
        setVoices(availableVoices);
      }
    };

    // Add event listener for voiceschanged and load voices
    window.speechSynthesis.onvoiceschanged = loadVoices;

    // Load voices immediately in case onvoiceschanged doesn't trigger
    loadVoices();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!text.trim()) {
      alert('Please enter a message before submitting.');
      return;
    }

    try {
      const res = await fetch('http://localhost:5000/analyze-text', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text }),
      });
      const data = await res.json();
      setResponse(data);
    } catch (error) {
      console.error('Error sending text:', error);
      alert('There was an error processing the text.');
    }
  };

  // Function to handle the "Listen" button
  const handleListen = () => {
    let speech = new SpeechSynthesisUtterance();
    speech.text = text;

    // Set the selected voice
    speech.voice = voices[selectedVoiceIndex];

    window.speechSynthesis.speak(speech);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Profane Checker</h1>
        <form onSubmit={handleSubmit} className="text-form">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Enter your message here..."
            className="text-area"
          />

          <div className="row">
            <button type="submit" className="submit-button">Send Message</button>

            {/* Dropdown for selecting voice */}
            <select
              value={selectedVoiceIndex}
              onChange={(e) => setSelectedVoiceIndex(e.target.value)}
            >
              {voices.length > 0 ? (
                voices.map((voice, index) => (
                  <option key={index} value={index}>
                    {voice.name} ({voice.lang})
                  </option>
                ))
              ) : (
                <option value="default">Loading voices...</option>
              )}
            </select>

            {/* The "Listen" button - note that its type is 'button' */}
            <button type="button" className="submit-button" onClick={handleListen}>Listen</button>
          </div>
        </form>

        {response && (
          <div className="response">
            <h3>Analysis Result:</h3>
            <p><strong>Message:</strong> {response.message}</p>
            <p><strong>Processed Text:</strong> {response.result}</p>
            <p><strong>Warnings:</strong> {response.warnings.length > 0 ? response.warnings.join(', ') : 'None'}</p>
            <p><strong>Suggestions:</strong> {response.suggestions}</p>
          </div>
        )}
      </header>
    </div>
  );
}

export default App;
