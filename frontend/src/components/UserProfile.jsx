import React, { useEffect, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { getUserProfile } from '../services/api';

const UserProfile = () => {
  const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();
  const [userProfile, setUserProfile] = useState(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = await getAccessTokenSilently();
        const profile = await getUserProfile(token);
        setUserProfile(profile);
      } catch (error) {
        console.error('Error fetching user profile:', error);
      }
    };

    if (isAuthenticated) {
      fetchUserProfile();
    }
  }, [isAuthenticated, getAccessTokenSilently]);

  if (!isAuthenticated) {
    return <div>Please log in to view your profile.</div>;
  }

  return (
    <div>
      <h2>User Profile</h2>
      <p>Name: {user.name}</p>
      <p>Email: {user.email}</p>
      {userProfile && (
        <div>
          <p>Role: {userProfile.role}</p>
          {/* Aggiungi altri dettagli del profilo qui */}
        </div>
      )}
    </div>
  );
};

export default UserProfile;