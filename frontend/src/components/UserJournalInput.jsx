/* src/components/UserJournalInput.jsx */

import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";

const Container = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    margin: 2rem;
    margin-bottom: 1rem;
    padding: 1rem;
`
const JournalText = styled.textarea`
    border-radius: 8px;
    border: 1.5px solid black;
    padding: 0.8rem;
    font-family: 'Josefin Sans', sans-serif;
    font-size: 1rem;
    margin-bottom: 1rem;

`
const AnalyzeButton = styled.button`
  padding: 0.5rem 1rem;
  color: black;
  border-radius: 4px;
  border: none;
  text-decoration: none;
  font-family: 'Josefin Sans', sans-serif;
  font-size: 1rem;
  underline: none;
  cursor: pointer;
  background-color:rgb(160, 194, 172);
  padding: 0.75rem;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: rgb(207, 223, 212);
  }

  &:visited {
    color: white;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

`

const ResetButton = styled.button`
  padding: 0.5rem 1rem;
  color: black;
  border-radius: 4px;
  border: none;
  text-decoration: none;
  font-family: 'Josefin Sans', sans-serif;
  font-size: 1rem;
  underline: none;
  cursor: pointer;
  background-color:rgb(160, 194, 172);
  padding: 0.75rem;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: rgb(207, 223, 212);
  }

  &:visited {
    color: white;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

`

function UserJournalInput({ onSubmit }) {
  const [entry, setEntry] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [results, setResults] = useState([]);

  const analyzeEntry = async (entry) => {
    try {
      const res = await axios.post("http://localhost:8000/analyze", { entry });
      setResults(res.data.results);
    } catch (err) {
      console.error("Failed to analyze jounral entry:", err);
    }
  };

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem('access_token');
      console.log("TOKEN:", token);
      if (!token) {
        setIsLoggedIn(false);
        return;
      }
      setIsLoggedIn(true);
    
    }
    fetchUser();
  }, []);

  const handleSubmit = () => {
    if (entry.trim()) {
      onSubmit(entry);
      setEntry("");
    }
  };

  return (
    <>
        <Container>
            <JournalText
                rows="1"
                cols="80"
                placeholder="Title your journal entry here..."
            />
            <JournalText
                rows="15"
                cols="80"
                placeholder="Write your journal entry here..."
                value={entry}
                onChange={(e) => setEntry(e.target.value)}
            />
      </Container>

      <div style= {{ textAlign: "center", marginBottom: "2rem" }}>
          <AnalyzeButton onClick={handleSubmit} style={{ marginTop: "1rem" }}>
            Analyze Entry
          </AnalyzeButton>
          <ResetButton onClick={() => setEntry("")} style={{ marginTop: "1rem", marginLeft: "1rem" }}>
            Clear Entry
          </ResetButton>

          {isLoggedIn && (
            <>
              <ResetButton onClick={handleSubmit} style={{ marginTop: "1rem", marginLeft: "1rem" }}>
                Save Entry
              </ResetButton>
            </>
            )}
      </div>
    </>
  );
}

export default UserJournalInput;
