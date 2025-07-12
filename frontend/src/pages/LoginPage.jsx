// src/pages/LoginPage.jsx
import React, { useState } from 'react';
import styled from 'styled-components';

const LoginButton = styled.button`
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

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin= async (e) => {
  e.preventDefault();

  const payload = {
    email,
    password,
  };

  try {
    const res = await fetch("http://localhost:8000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const data = await res.json();

    if (res.ok) {
      localStorage.setItem("access_token", data.access_token);
      window.location.href = "/profile";
    } else {
      alert(`Signup failed: ${data.detail}`);
    }
  } catch (err) {
    alert("Error occurred during login.");
    console.error(err);
  }
};

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: 'calc(100vh - 120px)',
        padding: '2rem 0',
      }}
    >

      <h1 style={{ marginBottom: '0.5rem', fontSize: '2rem' }}>Login</h1>
      <br></br>

      <form
        onSubmit={(e) => {e.preventDefault();}}
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem',
          width: '300px',
        }}
      >

        {/* Email */}
        <div>
          <label htmlFor="email" style={{ display: 'block', marginBottom: '0.5rem' }}>
            Email:
          </label>
          <input
            type="text"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{
              width: '100%',
              padding: '0.5rem',
              borderRadius: '4px',
              border: '1px solid #ccc',
            }}
            required
          />
        </div>

        {/* Password */}
        <div>
          <label htmlFor="password" style={{ display: 'block', marginBottom: '0.5rem' }}>
            Password:
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{
              width: '100%',
              padding: '0.5rem',
              borderRadius: '4px',
              border: '1px solid #ccc',
            }}
            required
          />
        </div>

        {/* Submit Button */}
        <LoginButton
          type="submit"
          onClick={handleLogin}
        >
          Log in
        </LoginButton>

        {/* Create Account Button */}
        <LoginButton>
          <a href="/signup">
            Create Account
          </a>
        </LoginButton>
      </form>
    </div>
  );
}

export default LoginPage;
