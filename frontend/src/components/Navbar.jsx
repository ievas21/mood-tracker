// src/components/Navbar.jsx
import React from "react";
import styled from "styled-components";

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

const Link = styled.a`
  text-decoration: none;
  color: inherit;
  padding: 0.5rem;

  &:hover {
    scale: 1.2;
    background-color:rgb(160, 194, 172);
    border-radius: 12%;
    transition: all 0.3s ease-in-out;
  }

  &:visited {
    color: inherit;
  }

`;

const LinkTitle = styled.a`
  text-decoration: none;
  color: inherit;
  padding: 0.5rem;

  &:visited {
    color: inherit;
  }

`;

function Navbar() {

  return (
    <Nav>
    <Title>
      <LinkTitle href="/">Mood Tracker</LinkTitle>
    </Title>

      <ul style={{ display: "flex", margin: 0, padding: 0, }}>
        <ListItem>
          <Link href="/">Home</Link>
        </ListItem>
        <ListItem>
            <Link href="/">Profile</Link>
        </ListItem>
        <ListItem>
            <Link href="/login">Login</Link>
        </ListItem>
        <ListItem>
            <Link href="/signup">Signup</Link>
        </ListItem>
      </ul>
    </Nav>
  );
}

export default Navbar;