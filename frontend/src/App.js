// App.js

import React, { useState } from "react";
import axios from "axios";
import JournalInput from "./components/JournalInput";
import SentimentResults from "./components/SentimentResults";
import { GlobalStyles } from "./styles/GlobalStyles";
import Navbar from "./components/Navbar";
import styled from "styled-components";

const TitleStyle = styled.h1`
  margin-top: 2rem;
  font-family: 'Josefin Sans', sans-serif;
  font-size: 2rem;
  color:rgb(0, 0, 0);

`

function App() {
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
    <GlobalStyles />
    <Navbar/>
    <div style={{ textAlign: "center", margin: "1rem" }}>
      <TitleStyle>Journal Sentiment Analyzer</TitleStyle>
    </div>

      <div>
        <JournalInput onSubmit={analyzeEntry} />
        {results.length > 0 && <SentimentResults results={results} />}
      </div>
    </>
  );
}

export default App;
