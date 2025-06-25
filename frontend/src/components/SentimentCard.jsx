/* src/components/SentimentCard.jsx */
import React from "react";


function SentimentCard({ result }) {
  return (
    <div style={{ border: "1px solid #ccc", padding: "1rem", margin: "0.5rem 0" }}>
      <h3>{result.model}</h3>
      <p><strong>Label:</strong> {result.label}</p>
      <p><strong>Score:</strong> {result.score}</p>
      {result.explanation && result.explanation.length > 0 && (
        <div>
          <strong>Explanation:</strong>
          <ul>
            {result.explanation.map(([word, weight], idx) => (
              <li key={idx}>
                {word}: {weight.toFixed(2)}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default SentimentCard;
