import React from "react";
import styled from "styled-components";

const LogoutButton = styled.button`
  color: black;
  border-radius: 4px;
  border: none;
  display: inline-block;
  text-decoration: none;
  font-family: 'Josefin Sans', sans-serif;
  font-size: 1rem;
  underline: none;
  cursor: pointer;
  background-color:rgb(160, 194, 172);
  padding: 0.75rem;
  transition: background-color 0.3s ease;
  margin: 0.5rem;

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

`;

const LogoutPageContainer = styled.div`
    display: flex;
    justify-content: center;
    text-align: center;
    align-items: center;
    flex-direction: column;
    height: calc(100vh - 120px);
    padding: 2rem 0;
    margin: 0 auto;
`;

const LogoutPageTitle = styled.h2`
    margin: 2rem;

`;

function LogoutPage() {

    const handleLogout = () => {
        localStorage.removeItem("access_token");
        window.location.href = "/home";
    };

    const handleReturn = () => {
        window.location.href = "/profile";
    };

  return (
    <LogoutPageContainer>
        <LogoutPageTitle>Are you sure you want to logout?</LogoutPageTitle>
        <LogoutButton onClick={handleLogout}>
            Logout
        </LogoutButton>
        <LogoutButton onClick={handleReturn}>
            Return to Profile
        </LogoutButton>
    </LogoutPageContainer>
  );
}

export default LogoutPage;