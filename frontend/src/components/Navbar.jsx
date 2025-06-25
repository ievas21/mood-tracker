// src/components/Navbar.jsx
import React from "react";
import styled from "styled-components";

function Navbar() {
    const Nav = styled.nav`
        display: flex;
        justify-content: space-between;
        align-items: center;
        background-color: #ddeedf;
        padding: 1rem;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        color :rgb(70, 85, 72);
    `;

    const Title = styled.h2`
        font-family: 'Josefin Sans', sans-serif;
        font-size: 1.6rem;
        text-align: left;
        align-self: flex-start;

    `;

    const ListItem = styled.li`
        margin: 0 1rem;
        list-style: none;
        font-size: 1.1rem;
    `;

  return (
    <Nav>
    <Title>Mood Tracker</Title>

      <ul style={{ display: "flex", margin: 0, padding: 0, }}>
        <ListItem>
            Home
        </ListItem>
        <ListItem>
            Profile
        </ListItem>
        <ListItem>
            Login
        </ListItem>
        <ListItem>
            Signup
        </ListItem>
      </ul>
    </Nav>
  );
}

export default Navbar;