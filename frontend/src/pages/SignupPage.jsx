// src/pages/SignupPage.jsx
import React, { useState } from 'react';
import styled from 'styled-components';

const SignButton = styled.button`
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

function SignupPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  const handleSignup = async (e) => {
  e.preventDefault();

  const payload = {
    email,
    firstName,
    lastName,
    password,
    confirmPassword,
  };

  try {
    const res = await fetch("http://localhost:8000/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const data = await res.json();

    if (res.ok) {
      alert("Signup successful!");
      // Redirect or reset form here
    } else {
      alert(`Signup failed: ${data.detail}`);
    }
  } catch (err) {
    alert("Error occurred during signup.");
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
        height: '100%',
        padding: '2rem 0',
      }}
    >
    <br></br>
      <h1 style={{ marginBottom: '2rem', fontSize: '2rem' }}>Create an Account</h1>

      <form
        onSubmit={(e) => {e.preventDefault();}}
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem',
          width: '300px',
        }}
      >

        {/* Email Field */}
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
        {/* First Name FIeld */}
        <div>
          <label htmlFor="firstName" style={{ display: 'block', marginBottom: '0.5rem' }}>
            First Name:
          </label>
          <input
            type="text"
            id="firstName"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            style={{
              width: '100%',
              padding: '0.5rem',
              borderRadius: '4px',
              border: '1px solid #ccc',
            }}
            required
          />
        </div>


        {/* Last Name Field */}
        <div>
          <label htmlFor="lastName" style={{ display: 'block', marginBottom: '0.5rem' }}>
            Last Name:
          </label>
          <input
            type="text"
            id="lastName"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            style={{
              width: '100%',
              padding: '0.5rem',
              borderRadius: '4px',
              border: '1px solid #ccc',
            }}
            required
          />
        </div>

        {/* Password Field */}
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

        {/* Re-Type Password Field */}
        <div>
          <label htmlFor="confirmPassword" style={{ display: 'block', marginBottom: '0.5rem' }}>
            Re-Type Password:
          </label>
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            style={{
              width: '100%',
              padding: '0.5rem',
              borderRadius: '4px',
              border: '1px solid #ccc',
            }}
            required
          />
        </div>

        {/* Sign Up Button */}
        <SignButton
          type="submit"
          onClick={handleSignup}
        >
          Sign Up
        </SignButton>
      </form>
    </div>
  );
}

export default SignupPage;

