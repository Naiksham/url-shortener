// Ensure all imports are at the top of the file
import React, { useState } from 'react';

const UrlForm = () => {
  // Your component logic
  const [longUrl, setLongUrl] = useState("");
  const [customAlias, setCustomAlias] = useState("");
  const [topic, setTopic] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const token = localStorage.getItem('authToken'); // Retrieve token

    if (!token) {
      console.error('Token is missing');
      alert('Please log in first');
      return;
    }

    const requestBody = {
      longUrl,
      customAlias,
      topic,
    };

    fetch('/api/shorten', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(requestBody),
    })
      .then(response => response.json())
      .then(data => {
        console.log('Shortened URL:', data);
      })
      .catch(error => {
        console.error('Error shortening URL:', error);
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Long URL"
        value={longUrl}
        onChange={(e) => setLongUrl(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Custom Alias (optional)"
        value={customAlias}
        onChange={(e) => setCustomAlias(e.target.value)}
      />
      <input
        type="text"
        placeholder="Topic (optional)"
        value={topic}
        onChange={(e) => setTopic(e.target.value)}
      />
      <button type="submit">Shorten</button>
    </form>
  );
};

// Make sure this export is at the very bottom of your file
export default UrlForm;
