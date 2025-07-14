// src/components/SentimentCard.jsx 
import React from "react";
import styled from "styled-components";

const CardContainer = styled.div`
  border: 1px solid black;
  padding: 1rem;
  margin: 0.5rem 0;
  width: 30%;
  border-radius: 12px;
  display: flex;
  flex-direction: row;
`;

const ModelTitle = styled.h3`
  color: rgb(70, 85, 72);
  text-align: center;
  background-color: rgba(210, 222, 211, 1);
  padding: 0.3rem;
  width: 30%;
  border-radius: 12px;
  margin: 0 auto;

`;

const LabelTitle = styled.h3`
  text-align: center;
  padding: 0.3rem;
  width: 30%;
  border-radius: 12px;
  margin: 0 auto;

`;

const ScoreTitle = styled.h3`
  text-align: center;
  padding: 0.3rem;
  width: 30%;
  border-radius: 12px;
  margin: 0 auto;
`;

function SentimentCard({ result }) {

  const getScoreColor = (score) => {
    if (score >= 0.6) {
      return "green";
    }
    if ((score >= 0.4) || (score === 0.00)) {
      return "orange";
    }
    else {
      return "red";
    }
  };

  const getScoreBackgroundColor = (label) => {
    if (typeof label !== "string") {
      return "lightgray";
    }
    const l = label.toLowerCase();

    if (l.includes("positive")) {
      return "lightgreen";
    }
    if (l.includes("neutral")) {
      return "wheat";
    }
    if (l.includes("negative")) {
       return "lightsalmon";
    }
  };

  const getLabelColor = (label) => {
    if (typeof label !== "string") {
      return "gray";
    }
    const l = label.toLowerCase();

    if (l.includes("positive")) {
      return "green";
    }
    if (l.includes("neutral")) {
      return "orange";
    }
    if (l.includes("negative")) {
      return "red";
    }
  };

  return (
    <>
      <CardContainer>
        <ModelTitle>{result.model}:</ModelTitle>
          <LabelTitle>
            <span style={{ color: getLabelColor(result.label) }}>
              <strong>{result.label}</strong>
            </span>
          </LabelTitle>
          <ScoreTitle>
            <span style={{ color: getScoreColor(result.score), 
                          backgroundColor: getScoreBackgroundColor(result.label), 
                          padding: '0.5rem', 
                          borderRadius: '12px' 
                        }}>
               {(result.score * 100).toFixed(1)}%
            </span>
          </ScoreTitle>
      </CardContainer>
    </>
  );
}

export default SentimentCard;
