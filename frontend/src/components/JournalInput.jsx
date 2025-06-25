/* src/components/JournalInput.jsx */

import React, { useState } from "react";
import styled from "styled-components";

const Container = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 2rem;
    padding: 1rem;
`
const JournalText = styled.textarea`
    border-radius: 8px;
    border: 1.5px solid black;
    padding: 0.8rem;
    font-family: 'Josefin Sans', sans-serif;
    font-size: 1rem;

`
const AnalyzeButton = styled.button`
    display: flex;
    margin: 0 auto;
    padding: 0.5rem 1rem;
    border-radius: 8px;
    font-family: 'Josefin Sans', sans-serif;
    font-size: 1rem;

    &:hover {
        background-color: #f0f0f0;
        cursor: pointer;
        scale: 1.05;
    }

`

function JournalInput({ onSubmit }) {
  const [entry, setEntry] = useState("");

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
                rows="15"
                cols="80"
                placeholder="Write your journal entry here..."
                value={entry}
                onChange={(e) => setEntry(e.target.value)}
            />
        </Container>

        <AnalyzeButton onClick={handleSubmit} style={{ marginTop: "1rem", }}>
            Analyze Journal Entry
        </AnalyzeButton>

    </>
  );
}

export default JournalInput;
