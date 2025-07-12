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
  margin-bottom: 0.5rem;
  font-size: 2rem;
  text-align: center;
  position: sticky;
  top: 0;
  padding: 1rem;
  z-index: 1000;

`;

const ProfileSubtitle = styled.h2`
  font-size: 1.5rem;
  text-align: center;
  margin-bottom: 1rem;
`;

function ProfilePage() {
  const [user, setUser] = useState(null);
  const [error, setError] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

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

  if (error) return <div style={{ color: 'red' }}>{error}</div>;

  return (
    <div       
    style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: 'calc(100vh - 120px)',
        padding: '2rem 0',
      }}>

      <ProfileTitle style={{ marginBottom: '0.5rem', fontSize: '2rem' }}>Profile Page</ProfileTitle>
      <ProfileSubtitle>
        {isLoggedIn ? `Welcome back, ${user.first_name}!` : 'Please log in to view your profile.'}
      </ProfileSubtitle>

      {isLoggedIn ? (
        <div>
          <ProfileImg
            src="user_icon.jpg"
            alt="Profile"
            style={{ borderRadius: '50%', marginBottom: '1rem' }}>

          </ProfileImg>
          {user ? (
            <div>
              <p>Email: {user.email}</p>
              <p>First Name: {user.first_name}</p>
              <p>Last Name: {user.last_name}</p>
            </div>
          ) : (
            <p>Loading user information...</p>
          )}
        </div>
      ) : (
        <p>Please log in to view your profile.</p>
      )}
    </div>
  );
}

export default ProfilePage;