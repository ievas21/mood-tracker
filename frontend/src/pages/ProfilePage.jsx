// frontend/src/pages/ProfilePage.jsx

import React, {useEffect, useState} from 'react';
import styled from 'styled-components';

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
    <div>
      <h1>Profile Page</h1>
      {isLoggedIn ? (
        <div>
          <h2>User Information</h2>
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