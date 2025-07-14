// src/components/SentimentResults.jsx 

import React from "react";
import SentimentCard from "./SentimentCard";
import styled from "styled-components";

const ResultsContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 1rem;

`;

function SentimentResults({ results }) {
  return (
    <ResultsContainer>
      <h2 style={{marginBottom: '0.75rem'}}>Results</h2>
      {results.map((res, idx) => (
        <SentimentCard key={idx} result={res} />
      ))}
    </ResultsContainer>
  );
}

export default SentimentResults;
