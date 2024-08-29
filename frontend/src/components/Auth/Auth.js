import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';

function Auth() {
  const { loginWithRedirect } = useAuth0();

  return (
    <div>
      <h2>Login or Register</h2>
      <button onClick={() => loginWithRedirect()}>Log In</button>
      <button onClick={() => loginWithRedirect({ screen_hint: 'signup' })}>
        Sign Up
      </button>
    </div>
  );
}

export default Auth;