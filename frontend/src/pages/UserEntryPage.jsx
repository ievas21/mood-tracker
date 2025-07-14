// src/pages/UserJournalPage.jsx

import React, { useState } from "react";
import axios from "axios";
import UserJournalInput from "../components/UserJournalInput";
import SentimentResults from "../components/SentimentResults";
import styled from "styled-components";

const TitleStyle = styled.h1`
  margin-top: 2rem;
  margin-bottom: 0;
  font-family: 'Josefin Sans', sans-serif;
  font-size: 2rem;
  color:rgb(0, 0, 0);

`;

function UserEntryPage() {
  const [results, setResults] = useState([]);

  const analyzeEntry = async (entry) => {
    try {
      const res = await axios.post("http://localhost:8000/analyze", { entry });
      setResults(res.data.results);
    } catch (err) {
      console.error("Failed to analyze jounral entry:", err);
    }
  };

  return (
    <>
    <div style={{ textAlign: "center" }}>
      <TitleStyle>Journal Sentiment Analyzer</TitleStyle>
    </div>

      <div>
        <UserJournalInput onSubmit={analyzeEntry} />
        {results.length > 0 && <SentimentResults results={results} />}
      </div>
    </>
  );
}

export default UserEntryPage;