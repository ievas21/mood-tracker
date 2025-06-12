import React, { useState } from "react";
import axios from "axios";

function App() {
  const [entry, setEntry] = useState("");
  const [results, setResults] = useState([]);

  const handleSubmit = async () => {
    const res = await axios.post("http://localhost:8000/analyze", { entry });
    setResults(res.data.results);
  };

  return (
    <div>
      <h1>Journal Mood Tracker</h1>
      <textarea
        rows="6"
        cols="60"
        value={entry}
        onChange={(e) => setEntry(e.target.value)}
      />
      <br />
      <button onClick={handleSubmit}>Analyze</button>
      <ul>
        {results.map((r, idx) => (
          <li key={idx}>
            <b>{r.model}</b>: {r.score}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
