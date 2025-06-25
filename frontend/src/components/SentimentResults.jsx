/* src/components/SentimentResults.jsx */
import React from "react";
import SentimentCard from "./SentimentCard";

function SentimentResults({ results }) {
  return (
    <div>
      <h2>Sentiment Results:</h2>
      {results.map((res, idx) => (
        <SentimentCard key={idx} result={res} />
      ))}
    </div>
  );
}

export default SentimentResults;
