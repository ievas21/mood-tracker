/* src/components/UserJournalInput.jsx */

import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import CustomToolTip from "./CustomTooltip";

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
  const [title, setTitle] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [results, setResults] = useState([]);

  const analyzeEntry = async (entry) => {
    try {
      const res = await axios.post("http://localhost:8000/analyze", { entry });
      setResults(res.data.results);
    } catch (err) {
      console.error("Failed to analyze journal entry:", err);
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

  const handleSubmit = async () => {
    if (entry.trim()) {
      await analyzeEntry(entry);
      onSubmit(entry); 
    }
  };

  const handleSave = async () => {
  const token = localStorage.getItem("access_token");

  if (!results.length) {
    alert("Please analyze the entry before saving!");
    return;
  }

  const primaryResult = results[2];
  const moodScore = primaryResult.score;
  const moodLabel = primaryResult.label;

  try {
    const response = await fetch("http://localhost:8000/user_entry", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        title: title,
        content: entry,
        mood_score: `${moodLabel} (${(moodScore * 100).toFixed(1)}%)`
      })
    });

    if (!response.ok) throw new Error("Failed to save entry.");
    const data = await response.json();
    console.log("Saved entry:", data);
    setEntry("");
    setTitle("");
    setResults([]);
    window.location.href = "/profile";
  } catch (err) {
    console.error(err);
  }
};

  const handleReset = () => {
    setEntry("")
    setTitle("")
    setResults([])
  }

  return (
    <>
        <Container>
            <JournalText
                rows="1"
                cols="80"
                placeholder="Title your journal entry here..."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
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
          <ResetButton onClick={handleReset} style={{ marginTop: "1rem", marginLeft: "1rem" }}>
            Clear Entry
          </ResetButton>

          {isLoggedIn && (
            <>
              <ResetButton onClick={handleSave} disabled={!results.length} style={{ marginTop: "1rem", marginLeft: "1rem", cursor: results.length ? "pointer" : "not-allowed", opacity: results.length ? 1 : 0.5 }}>
                Save Entry
              </ResetButton>
            </>
            )}
            <CustomToolTip></CustomToolTip>
      </div>
    </>
  );
}

export default UserJournalInput;
