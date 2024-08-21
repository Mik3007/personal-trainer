import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';

const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();
  
  const handleLogin = async () => {
    try {
      await loginWithRedirect();
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  return <button onClick={handleLogin}>Log In</button>;
};

export default LoginButton;