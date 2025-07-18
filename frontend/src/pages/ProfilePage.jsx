// frontend/src/pages/ProfilePage.jsx

import React, {useEffect, useState} from 'react';
import styled from 'styled-components';

const ProfileImg = styled.img`
  border-radius: 50%;
  margin-bottom: 1rem;
  width: 150px;
  height: 150px;
`;

const ProfileTitle = styled.h1`
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
  font-size: 2rem;
  text-align: center;
  padding: 1rem;
`;

const ProfileSubtitle = styled.h2`
  font-size: 1.2rem;
  text-align: center;
  font-weight: light;
`;

const ProfileContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: flex-start;
  gap: 4rem;
  width: 100%;
  padding: 2rem;

`;

const JournalEntriesContainer = styled.div`
  flex: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  max-width: 60%;
  background-color: rgba(199, 231, 195, 0.8);
  padding: 1rem;
  border-radius: 8px;
  height: fit-content;

`;

const ProfileInformation = styled.div`
  display: flex,
  flexDirection: column,
  alignItems: center,
  justifyContent: center,
  height: calc(100vh - 120px),
  padding: 2rem 0,
`;

const JournalButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
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

`;

const JournalEntryCard = styled.div`
  margin-bottom: 1.5rem;
  padding: 1rem;
  background-color: white;
  border-radius: 8px; 
  box-shadow: 0 2px 4px rgba(0,0,0,0.3);
  width: 600px;

`;

const PageButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.5rem;
  color: black;
  border-radius: 12px;
  border: none;
  text-decoration: none;
  font-family: 'Josefin Sans', sans-serif;
  font-size: 0.8rem;
  underline: none;
  cursor: pointer;
  background-color:rgb(160, 194, 172);
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

function ProfilePage() {
  const [user, setUser] = useState(null);
  const [error, setError] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const entriesPerPage = 3;

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem('access_token');
      console.log("TOKEN:", token);
      if (!token) {
        setIsLoggedIn(false);
        window.location.href = '/login';
        setError('');
        return;
      }
      setIsLoggedIn(true);
      try {
        const response = await fetch('http://localhost:8000/profile', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch user data');
        }

        const data = await response.json();
        setUser(data);
      } catch (err) {
        console.error(err);
        setError('An error occurred while fetching user');
      }
    };

    fetchUser();
  }, []);

  const formatToEST = (utcString) => {
    const fixedUtcString = utcString.endsWith("Z") ? utcString : utcString + "Z";
    const utcDate = new Date(fixedUtcString);
    return utcDate.toLocaleString("en-US", {
      timeZone: "America/New_York",
      dateStyle: "medium",
      timeStyle: "short"
    });
  };

const paginatedEntries = user?.entries?.slice(
    (currentPage - 1) * entriesPerPage,
    currentPage * entriesPerPage
);
const totalPages = Math.ceil(user?.entries?.length / entriesPerPage);

  if (error) return <div style={{ color: 'red' }}>{error}</div>;

  return (
    <>
    <ProfileTitle>Profile Page</ProfileTitle>
    <ProfileSubtitle>
      {isLoggedIn && user
        ? `Welcome back, ${user.first_name}!`
        : 'Please log in to view your profile.'}
    </ProfileSubtitle>

    <ProfileContainer>
        <ProfileInformation>
          {isLoggedIn ? (
            <div>
              {user ? (
                <div>
                  <ProfileImg
                    src="user_icon.jpg"
                    alt="Profile"
                    style={{ borderRadius: '50%', marginBottom: '1rem' }}>
                  </ProfileImg>
                  <p style={{marginLeft: "2rem"}}>{user.first_name} {user.last_name}</p>
                </div>
              ) : (
                <p>Loading user information...</p>
              )}
            </div>
          ) : (
            <p>Please log in to view your profile.</p>
          )}
        </ProfileInformation>

        <JournalEntriesContainer>
          {user?.entries?.length > 0 ? (
            paginatedEntries.map((entry) => (
              <JournalEntryCard key={entry.id}>
                <h3 style={{ marginBottom: '0.5rem' }}>{entry.title}</h3>
                <p style={{ color: 'gray', fontSize: '0.9rem' }}>
                  Created At: {formatToEST(entry.created_at)}
                </p>
              </JournalEntryCard>
            ))
          ) : (
            <p style={{marginBottom: '1rem'}}>You have no journal entries yet.</p>
          )}
          <div style={{ display: 'flex', alignItems: 'center', textAlign: 'center', justifyContent: 'center', width: '100%' }}>
            <PageButton onClick={() => setCurrentPage(p => Math.max(p - 1, 1))} disabled={currentPage === 1}>
              Previous
            </PageButton>
            <span>Page {currentPage} of {totalPages}</span>
            <PageButton onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))} disabled={currentPage === totalPages}>
              Next
            </PageButton>
          </div>
          <JournalButton style={{marginTop: '1rem'}}>
            <a href="/user_entry">Create New Entry</a>
          </JournalButton>
        </JournalEntriesContainer>
      </ProfileContainer>
    </>
  );
}

export default ProfilePage;