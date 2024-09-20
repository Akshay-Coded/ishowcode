import React, { useState } from 'react';
import './App.css';

function App() {
  const [text, setText] = useState('');
  const [response, setResponse] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
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

  return (
    <div className="App">
      <header className="App-header">
        <h1>Text Analyzer</h1>
        <form onSubmit={handleSubmit} className="text-form">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Enter your text here..."
            className="text-area"
          />
          <button type="submit" className="submit-button">Analyze Text</button>
        </form>
        {response && (
          <div className="response">
            <h3>Analysis Result:</h3>
            <p><strong>Message:</strong> {response.message}</p>
            <p><strong>Processed Text:</strong> {response.result}</p>
            <p><strong>Warnings:</strong> {response.warnings.length > 0 ? response.warnings.join(', ') : 'None'}</p>
          </div>
        )}
      </header>
    </div>
  );
}

export default App;
